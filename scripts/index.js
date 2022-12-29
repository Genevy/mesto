const profileButton = document.querySelector('.profile__button');
const popupProfile = document.querySelector('.popup-profile');
const formProfile = document.forms.addProfile;
const nameInputProfile = formProfile.elements.addName;
const jobInputProfile = formProfile.elements.addJob;
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupProfileCloseButton = document.querySelector('.popup-profile__close');
const buttonAddCard = document.querySelector('.profile__addButton');
const popupAddСard = document.querySelector('.popup-addcard');
const popupAddСardCloseButton = document.querySelector('.popup-addcard__close');
const popupFoto = document.querySelector('.popup-foto');
const popupFotoCloseButton = document.querySelector('.popup-foto__close');
const formAddCard = document.forms.addCard;
const namePlace = formAddCard.elements.namePlace;
const linkPlace = formAddCard.elements.linkPlace;
const photoGrids = document.querySelector('.photo-grids');
const templateCard = document.querySelector('.template-card').content.querySelector('.photo-grids__card');

function createCard(item) {
  const userCards = templateCard.cloneNode(true);
  const userCardsFoto = userCards.querySelector('.photo-grids__foto');
  const userCardsText = userCards.querySelector('.photo-grids__text');
  const fotoName = `Фотография ${item.name}`;
  const fotoNo = `${item.name} - фото не загружено`;
  userCardsFoto.src = item.link;
  userCardsFoto.title = fotoName;
  userCardsFoto.alt = fotoName;
  userCardsText.textContent = item.name;
  userCardsText.title = item.name;
  userCardsFoto.onerror = function () {
    userCardsFoto.src = './images/noFoto.jpg';
    item.link = './images/noFoto.jpg';
    userCardsText.textContent = fotoNo;
    userCardsText.title = fotoNo;
    userCardsFoto.title = fotoName;
    userCardsFoto.alt = fotoName;
  };

  userCards.querySelector('.photo-grids__cart').addEventListener('click', function () {
    userCards.remove();
  });

  userCardsFoto.addEventListener('click', function () {
    const popupFotoFoto = popupFoto.querySelector('.popup-foto__foto');
    popupFotoFoto.src = item.link;
    popupFotoFoto.title = fotoName;
    popupFotoFoto.alt = fotoName;
    popupFoto.querySelector('.popup-foto__caption').textContent = item.name;
    openPopup(popupFoto);
  });

  userCards.querySelector('.photo-grids__button').addEventListener('click', function () {
    userCards.querySelector('.photo-grids__button').classList.toggle('photo-grids__button_active');
  });
  return userCards
}

function prependCard(item) {
  photoGrids.prepend(createCard(item));
}

function renderStartCards() {
  initialCards.reverse().forEach(item => {
    prependCard(item);
  });
};

renderStartCards();

function addCardSubmit(event) {
  event.preventDefault();
  prependCard({
    name: namePlace.value,
    link: linkPlace.value
  });
  closePopup(popupAddСard);
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputProfile.value;
  profileProfession.textContent = jobInputProfile.value;
  closePopup(popupProfile);
}

function openPopup(popups) {
  popups.classList.add('popup_opened');
};

function closePopup(popups) {
  popups.classList.remove('popup_opened');
};

formProfile.addEventListener('submit', handleFormProfileSubmit);

popupProfileCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

profileButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileProfession.textContent;
});

buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddСard);
  formAddCard.reset();
});

popupAddСardCloseButton.addEventListener('click', function () {
  closePopup(popupAddСard);
});

formAddCard.addEventListener('submit', addCardSubmit);

popupFotoCloseButton.addEventListener('click', function () {
  closePopup(popupFoto);
});
