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

    super.open();
  }
}