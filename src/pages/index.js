import './index.css';
import {
  validationParameters,
  profileUser,
  buttonOpenPopupProfile,
  formElementProfile,
  nameInput,
  jobInput,
  formAddAvatar,
  avatar,
  buttonOpenAddNewCard,
  formElementCard,
  apiParameters
} from '../utils/contstants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

const editProfileFormValidator = new FormValidator (validationParameters, formElementProfile);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator (validationParameters, formElementCard);
addCardFormValidator.enableValidation();
const addAvatarFormValidator = new FormValidator (validationParameters, formAddAvatar);
addAvatarFormValidator.enableValidation();

const userProfile = new UserInfo(profileUser);
const popupEditProfile = new PopupWithForm('.popup_type_edit', formSubmitProfile);
const popupOpenImage = new PopupWithImage('.popup_type_image');
const popupAddCard = new PopupWithForm('.popup_type_card', formSubmitCard);
const popupAddAvatar = new PopupWithForm('.popup_type_avatar', formSubmitAvatar);
const popupDeleteCard = new PopupWithConfirm('.popup_type_confirm');
const api = new Api(apiParameters);

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([data, items]) => {
    userProfile.setUserInfo(data);
    userProfile.setUserAvatar(data);
    cardsGalegy.renderItems(items);
  })
  .catch ((err) => {
    console.log (err);
  })

function createCard(cardData) {
  cardData.currentUser = userProfile.getUserInfo();
  const card = new Card(cardData, '#card', {
    onClick: handleCardClick,

    onLike: (currentCardData, likeCallback) => {
      if (card.isLike()) {
        api
          .deleteLike(currentCardData._id)
          .then((updatedCard) => likeCallback(updatedCard.likes))
          .catch((err) => {
            console.log('Ошибка', err);
          })
      } else {
        api
          .setLike(currentCardData._id)
          .then((updatedCard) => likeCallback(updatedCard.likes))
          .catch((err) => {
            console.log('Ошибка', err);
          })
      }
    },

    onDelete: (currentCardData, deleteCallback) => {
      popupDeleteCard.open();
      popupDeleteCard.setConfirmAction(() => {
        api
        .deleteCard(currentCardData._id)

        .then(() => {
          popupDeleteCard.close();
          deleteCallback()
        })
        .catch((err) => {
          console.log('ERROR', err);
        })
      });
    }
  });

  const cardElement = card.generateCard();
  return cardElement;
}

const cardsGalegy = new Section({
  renderer: (cardData) => {
    cardsGalegy.addItem(createCard(cardData));
  },
}, '.photo__list');

function handleCardClick(name, link) {
  popupOpenImage.open(name, link);
};

function handleProfile() {
  const userData = userProfile.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
};

function formSubmitProfile({ name, about }) {
  popupEditProfile.setSavingMode();
  api.updateUserInfo({ name: name, about: about })
    .then((data) => {
      userProfile.setUserInfo(data)
    })
    .catch((err) => {
      console.log('ERROR', err);
    })
    .finally(() => popupEditProfile.removeSavingMode())
};

function formSubmitAvatar({ avatar }) {
  popupAddAvatar.setSavingMode();
  api.updateUserAvatar({ avatar: avatar })
    .then((data) => {
      userProfile.setUserAvatar(data)
    })
    .catch((err) => {
      console.log('ERROR', err);
    })
    .finally(() => popupAddAvatar.removeSavingMode())
}

function formSubmitCard(data) {
  popupAddCard.setSavingMode();
  api.addNewCard({ name: data.name, link: data.link })
    .then((res) => {
      cardsGalegy.addItem(createCard(res));
    })
    .catch((err) => {
      console.log('ERROR', err);
    })
    .finally(() => popupAddCard.removeSavingMode())
};

popupDeleteCard.setEventListeners();
popupEditProfile.setEventListeners();
popupAddAvatar.setEventListeners();
popupAddCard.setEventListeners();

buttonOpenPopupProfile.addEventListener('click', () => {
  editProfileFormValidator.toggleButtonState();
  popupEditProfile.open();
  handleProfile();
});

buttonOpenAddNewCard.addEventListener('click', () => {
  popupAddCard.open();
  addCardFormValidator.clearValidation();
})

avatar.addEventListener('click', () => {
  popupAddAvatar.open();
  addAvatarFormValidator.clearValidation();
})
