import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
};

const cardListEl = document.querySelector(".cards__list");

// Functions for modals
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

function closeModalByEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleImageClick(name, link) {
  const photoModal = document.querySelector("#photo-modal");
  const photoModalImg = document.querySelector(".photo-modal__image");
  const photoModalTitle = document.querySelector(".photo-modal__title");

  photoModalImg.src = link;
  photoModalImg.alt = name;
  photoModalTitle.textContent = name;
  openModal(photoModal);
}

// Adding initial cards
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.createCard();
  cardListEl.prepend(cardElement);
});

// Form validation setup
const profileFormValidator = new FormValidator(
  validationSettings,
  document.querySelector(".modal__form-edit")
);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(
  validationSettings,
  document.querySelector(".modal__form-add")
);
cardFormValidator.enableValidation();

// Event listeners for modals
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const profileModal = document.querySelector("#profile-edit-modal");
  openModal(profileModal);
});

document.querySelector(".modal__close-edit").addEventListener("click", () => {
  const profileModal = document.querySelector("#profile-edit-modal");
  closeModal(profileModal);
});

document.querySelector(".modal__close-add").addEventListener("click", () => {
  const addCardModal = document.querySelector("#card-add-modal");
  closeModal(addCardModal);
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  const addCardModal = document.querySelector("#card-add-modal");
  openModal(addCardModal);
});

document.querySelectorAll(".modal__close").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

// Handle form submissions
document.querySelector(".modal__form-edit").addEventListener("submit", (e) => {
  e.preventDefault();
  closeModal(document.querySelector("#profile-edit-modal"));
});

document.querySelector(".modal__form-add").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#card-title-input").value;
  const link = document.querySelector("#card-url-input").value;
  const newCard = new Card({ name, link }, "#card-template", handleImageClick);
  const newCardElement = newCard.createCard();
  cardListEl.prepend(newCardElement);
  closeModal(document.querySelector("#card-add-modal"));
});
