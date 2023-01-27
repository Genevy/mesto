const closeButtons = document.querySelectorAll('.popup__close');
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
const cardsTemplate = document.querySelector('#cardsTemplate').content.querySelector('.cards__item');
const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const profileFormInputs = Array.from(popupProfile.querySelectorAll('.popup__input'));
const profileFormSubmitBtn = popupProfile.querySelector('.popup__button_type_profile');
const popupAddCards = document.querySelector('.popup_type_card');
const inputCardForms = Array.from(popupAddCards.querySelectorAll('.popup__input'));
const cardsFormSubmitBtn = popupAddCards.querySelector('.popup__button_type_element');

const createCard = ({ name, link }) => {
  const cardsItem = cardsTemplate.cloneNode(true);
  const cardImage = cardsItem.querySelector('.cards__image');
  const imageTitle = cardsItem.querySelector('.cards__title');
  const elementDeleteBtn = cardsItem.querySelector('.cards__cart');
  const likeButton = cardsItem.querySelector('.cards__like');

  cardImage.src = link;
  imageTitle.textContent = name;
  cardImage.alt = name;

  cardImage.addEventListener('click', () => openBigPicture({ name, link }));
  likeButton.addEventListener('click', () => toggleLike(likeButton));
  elementDeleteBtn.addEventListener('click', deleteElement);

  return cardsItem;
}

function renderCard({ name, link }) {
  cardsContainer.prepend(createCard({ name, link }));
}
initialCards.forEach(renderCard);

function deleteElement(evt) {
  evt.target.closest('.cards__item').remove();
}

function toggleLike(likeButton) {
  likeButton.classList.toggle('cards__like_active');
}

function openBigPicture({ name, link }) {
  bigPicture.src = link;
  bigPictureCaption.textContent = name;
  bigPicture.alt = name;
  openPopup(popupBigPicture)
}

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
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
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
 inputName.value = profileName.textContent;
 inputAbout.value = profileAbout.textContent;
  openPopup(popupProfile);
});

popupProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  evt.target.reset();
  closePopup(popupProfile);
})

pictureAddButton.addEventListener('click', () => {
  openPopup(popupAddCards)
});

popupAddCards.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const link = linkInput.value;
  const name = titleInput.value;
  renderCard({ name, link });
  evt.target.reset();
  closePopup(popupAddCards);
  disableSubmitButton(evt.submitter, validationConfig);
})
