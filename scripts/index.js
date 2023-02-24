import { Card } from './Card.js';
import { initialCards } from './constants.js';
import { FormValidator } from './FormValidator.js';

const profileEditButton = document.querySelector('.profile__button');
const pictureAddButton = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputAbout = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const titleInput = document.querySelector('.popup__input_type_cards-title');
const linkInput = document.querySelector('.popup__input_type_cards-link');
const popupBigPicture = document.querySelector('.popup_type_picture');
const bigPicture = document.querySelector('.popup__picture');
const bigPictureCaption = document.querySelector('.popup__caption');
const cardsContainer = document.querySelector('.cards');
const popupList = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCards = document.querySelector('.popup_type_card');
const newItemForm = document.forms['newItemForm'];
const editProfileForm = document.forms['editProfileForm'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
const newItemFormValidator = new FormValidator(validationConfig, newItemForm);

editProfileFormValidator.enableValidation();
newItemFormValidator.enableValidation();

editProfileFormValidator.resetValidation()
newItemFormValidator.resetValidation()


function createCard(item) {
  const card = new Card(item, '#cardsTemplate', function () {
    handleCardClick(item)
  });
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard({ name, link }) {
  cardsContainer.prepend(createCard({ name, link }));
}

initialCards.forEach(renderCard);

const handleCardClick = ({ name, link }) => {
  bigPicture.src = link;
  bigPictureCaption.textContent = name;
  bigPicture.alt = `${name}`;
  openPopup(popupBigPicture);
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc)
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc)
}

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
});

profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  editProfileFormValidator.resetValidation()
});

popupEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEditProfile);
})

pictureAddButton.addEventListener('click', () => {
  newItemForm.reset();
  newItemFormValidator.resetValidation()
  openPopup(popupAddCards);
});

popupAddCards.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const link = linkInput.value;
  const name = titleInput.value;
  renderCard({ name, link });
  closePopup(popupAddCards);
})
