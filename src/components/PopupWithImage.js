import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image')
    this._popupImageTitle = this._popup.querySelector('.popup__image-caption');
    super.setEventListeners();
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageTitle.textContent = name;

    this._popupImage.onerror = () => {
      this._popupImage.src = 'https://raw.githubusercontent.com/genevy/mesto/main/src/images/placeholder.svg';
      this._popupImage.alt = `${name} - картинка не загружена`;
      this._popupImageTitle.textContent = `${name} - картинка не загружена`;
    }

    super.open();
  }
}