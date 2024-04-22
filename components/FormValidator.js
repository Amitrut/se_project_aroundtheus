export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add("modal__error_visible");
    } else {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      errorElement.textContent = "";
      errorElement.classList.remove("modal__error_visible");
    }
  }

  _toggleButtonState() {
    const isFormValid = this._inputList.every(
      (inputElement) => inputElement.validity.valid
    );
    this._buttonElement.disabled = !isFormValid;
    this._buttonElement.classList.toggle(
      this._settings.inactiveButtonClass,
      !isFormValid
    );
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._toggleButtonState();
    this._setEventListeners();
  }
}
