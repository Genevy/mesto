export class Card {
  constructor(item, template, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document.querySelector(this._template).content.querySelector('.cards__item').cloneNode(true);
    return card;
  }

  generateCard = () => {
    this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.cards__image');
      this._cardTitle = this._element.querySelector('.cards__title');
      this._likeButton = this._element.querySelector('.cards__like');
      this._elementDeleteBtn = this._element.querySelector('.cards__cart');

      this._cardTitle.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = `${this._name}`;

      const noImage = './images/noimage.jpg';

      this._cardImage.onerror = () => {
      this._cardImage.src = noImage;
      this._link = noImage;
      this._cardImage.alt = `${this._name} - фото не загружено`;
      this._cardTitle.textContent = `${this._name} - фото не загружено`;
    };

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._toggleLike()
    });

    this._elementDeleteBtn.addEventListener("click", () => {
      this._deleteElement()
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick()
    });
  }

  _deleteElement() {
    this._element.remove();
    this._element = null;
  };

  _toggleLike() {
    this._likeButton.classList.toggle('cards__like_active');
  };
}
