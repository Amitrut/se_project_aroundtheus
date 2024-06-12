export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._closeButton = this._modalElement.querySelector(".modal__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closeModalOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
      //this needs to be an arrow function bc it uses this...
    }
  };

  setEventListeners() {
    this._modalElement.addEventListener("mousedown", (evt) =>
      this._closeModalOverlay(evt)
    );

    this._closeButton.addEventListener("click", () => this.close());
  }
}
