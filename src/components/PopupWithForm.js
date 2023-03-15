import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._formInputList = this._form.querySelectorAll('.form__input');
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._form.querySelector('.form__save-button');
  }

  _getInputValues() {
    this._formValues = {};

    this._formInputList.forEach(input => {
      this._formValues[input.name] = input.value});

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch((err) => console.log(`Error: ${err}`))
        .finally(() => {
          this._submitButton.textContent = initialText;
        });
    })
  }

  close() {
    this._form.reset();
    super.close();
  }
}