import './index.css';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  profileEditButton,
  pictureAddButton,
  newItemForm,
  editProfileForm,
  initialCards,
  validationConfig,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
const newItemFormValidator = new FormValidator(validationConfig, newItemForm);

editProfileFormValidator.enableValidation();
newItemFormValidator.enableValidation();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
});

const popupEditProfile = new PopupWithForm(
  ".popup_type_profile",
  (values) => {
    userInfo.setUserInfo(values);
    popupEditProfile.close();
  }
);

popupEditProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  editProfileFormValidator.toggleButtonState();
  editProfileFormValidator.resetValidation();
});

function createCard({ name, link }) {
  return new Card({ name, link }, '#cardsTemplate', handleCardClick).generateCard();
}

const section = new Section(
  {
    data: initialCards,
    renderer: ({ name, link }) => {
      section.addItem(createCard({ name, link }));
    },
  },
  ".cards"
);

section.renderCard();

pictureAddButton.addEventListener('click', () => {
  popupAddElements.open();
  newItemFormValidator.toggleButtonState();
  newItemFormValidator.resetValidation();
});

const popupAddElements = new PopupWithForm(
  ".popup_type_card",
  (values) => {
    section.addItem(createCard(values));
    popupAddElements.close();
  }
);

popupAddElements.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_type_picture");

popupWithImage.setEventListeners();

function handleCardClick() {
  popupWithImage.open(this._name, this._link);
}
