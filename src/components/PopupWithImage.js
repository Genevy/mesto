import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
      super(popupSelector);
      this._bigPicture = this._popup.querySelector(".popup__picture");
      this._bigPictureCaption = this._popup.querySelector(".popup__caption");
   }

  open(name, link) {
      super.open();
      this._bigPicture.src = link;
      this._bigPictureCaption.textContent = name;
      this._bigPicture.alt = name;
   };
}
