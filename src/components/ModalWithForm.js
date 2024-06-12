import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this.modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = Array.from(
      this.modalForm.querySelectorAll(".modal__input")
    );
    this._modalSubmitButton = this._modalElement.querySelector(
      ".modal__submit-button"
    );
    this._submitButtonText = this._modalSubmitButton.textContent;
  }

  resetForm() {
    this.modalForm.reset();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputElements.forEach((input) => {
      //insert value by name of the input
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.modalForm.addEventListener("submit", () =>
      this._handleFormSubmit(this._getInputValues())
    );
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._modalSubmitButton.textContent = loadingText;
    } else {
      this._modalSubmitButton.textContent = this._submitButtonText;
    }
  }
}
