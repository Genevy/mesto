export default class Card {
  constructor(item, template, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._template = document.querySelector(template).content;
    this._handleCardClick = handleCardClick;
  }

  generateCard = () => {
      this._element = this._template.querySelector('.cards__item').cloneNode(true);
      this._cardImage = this._element.querySelector('.cards__image');
      this._cardTitle = this._element.querySelector('.cards__title');
      this._likeButton = this._element.querySelector('.cards__like');
      this._elementDeleteBtn = this._element.querySelector('.cards__cart');

      this._cardTitle.textContent = this._name;
      this._cardImg.src = this._link;
      this._cardImg.alt = this._name;

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

    this._cardImg.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link)
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
