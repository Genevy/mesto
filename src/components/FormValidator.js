export class FormValidator {
    constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
      this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    };

    _checkInputValidity = (inputElement) => {
        inputElement.validity.valid
          ? this._hideInputError(inputElement)
          : this._showInputError(inputElement);
    };

    _showInputError = (inputElement) => {
      this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._config.inputErrorClass);
      this._errorElement.classList.add(this._config.errorClass);
      this._errorElement.textContent = inputElement.validationMessage;
    };

    _hideInputError = (inputElement) => {
      this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._config.inputErrorClass);
      this._errorElement.classList.remove(this._config.errorClass);
      this._errorElement.textContent = '';
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
    };

    toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    _setEventListeners = () => {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement);
              this.toggleButtonState();
            });
        });
    };

    resetValidation() {
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
        this.toggleButtonState();
    };

    enableValidation() {
      this._setEventListeners()
    };
}