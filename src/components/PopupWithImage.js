import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
      super(popupSelector);
      this._bigPicture = this._popup.querySelector(".cards__image");
      this._bigPictureCaption = this._popup.querySelector(".cards__title");
   }

  open(name, link) {
      super.open();
      this._bigPicture.src = link;
      this._bigPictureCaption.textContent = name;
      this._bigPicture.alt = name;
   };
}