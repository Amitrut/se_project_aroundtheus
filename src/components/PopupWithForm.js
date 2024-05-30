import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".modal__form");
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(".modal__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  open() {
    super.open();
    this._formElement.reset();
    this._formValidator.resetValidation(); // Ensure form is reset and validated
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setFormValidator(formValidator) {
    this._formValidator = formValidator;
  }
}
