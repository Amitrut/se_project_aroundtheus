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
  errorClassVisible: "modal__error_visible",
};

const cardListEl = document.querySelector(".cards__list");

const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.createCard();
};

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

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
});

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

document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const profileModal = document.querySelector("#profile-edit-modal");
  const currentTitle = document.querySelector("#profile-title").textContent;
  const currentDescription = document.querySelector(
    "#profile-description"
  ).textContent;
  document.querySelector("#profile-title-input").value = currentTitle;
  document.querySelector("#profile-description-input").value =
    currentDescription;
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
  const form = addCardModal.querySelector(".modal__form-add");
  form.reset();
  cardFormValidator.toggleButtonState(); // Update button state when modal is opened
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

document.querySelector(".modal__form-edit").addEventListener("submit", (e) => {
  e.preventDefault();
  closeModal(document.querySelector("#profile-edit-modal"));
});

document.querySelector(".modal__form-add").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#card-title-input").value;
  const link = document.querySelector("#card-url-input").value;
  if (!name.trim() || !link.trim()) {
    console.log("Empty fields are not allowed.");
    return; // Prevents submission if fields are empty
  }
  const newCardElement = createCard({ name, link });
  cardListEl.prepend(newCardElement);
  e.target.reset(); // Reset the form fields after submission
  cardFormValidator.toggleButtonState(); // Toggle button state after form reset
  closeModal(document.querySelector("#card-add-modal"));
});
