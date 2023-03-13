import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSeletor) {
    super(popupSeletor);
    this._form = this._popup.querySelector('.form');
    this._confirmStep = () => {};
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmStep();
    });

    super.setEventListeners();
  }

  setConfirmAction(action) {
    this._confirmStep = action;
  }
}
