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
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._settings.errorClassVisible); // To show the error message
      inputElement.classList.add(this._settings.inputErrorClass); // Add error class to the input for visual feedback
    } else {
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClassVisible); // Remove visibility from error message
      inputElement.classList.remove(this._settings.inputErrorClass); // Remove error class from the input
    }
  }

  _isFormValid() {
    return this._inputList.every((inputElement) => inputElement.validity.valid);
  }

  toggleButtonState() {
    const isFormValid = this._isFormValid(); // Use the new method here
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
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this.toggleButtonState();
    this._setEventListeners();
  }
}
