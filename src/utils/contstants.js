const validationParameters = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inputErrorClass: 'form__input_type_error',
  inputErrorActive: 'form__input-error_active'
};

const profileUser = {
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__about',
  userAvatarSelector: '.profile__image'
}

const popupProfile = document.querySelector('.popup_type_edit');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formElementProfile = popupProfile.querySelector('.form');
const nameInput = popupProfile.querySelector('.form__input_type_user-name');
const jobInput = popupProfile.querySelector('.form__input_type_about');
const popupAddAvatar = document.querySelector('.popup_type_avatar');
const formAddAvatar = popupAddAvatar.querySelector('.form');
const avatar = document.querySelector('.profile__avatar');
const popupAddNewCard = document.querySelector('.popup_type_card');
const buttonOpenAddNewCard = document.querySelector('.profile__add-button');
const formElementCard = popupAddNewCard.querySelector('.form');

const apiParameters = {
  url: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    "Content-Type": "application/json",
    "authorization": "abeb6987-1131-4a8c-8e13-4ece746c8e7b",
  }
};

export {
  validationParameters,
  profileUser,
  popupProfile,
  buttonOpenPopupProfile,
  formElementProfile,
  nameInput,
  jobInput,
  popupAddNewCard,
  formAddAvatar,
  avatar,
  buttonOpenAddNewCard,
  formElementCard,
  apiParameters
};
