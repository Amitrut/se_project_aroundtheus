import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._modalImage = this._modalElement.querySelector(
      ".modal__image-preview"
    );
    this._modalImageSubtitle = this._modalElement.querySelector(
      ".modal__picture-subtitle"
    );
  }
  open(cardData) {
    //accept the name and link of the card as arguments and add an image to the popup and image src attribute and a caption for the image. call this method in the image click handler in index.js
    this._modalImage.src = cardData.link;
    this._modalImage.alt = `Photo of ${cardData.name}`;
    this._modalImageSubtitle.textContent = cardData.name;
    super.open();
  }
}
