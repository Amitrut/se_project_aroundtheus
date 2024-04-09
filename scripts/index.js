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

// Elements //
//Edit Profile//
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(".modal__close-edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form-edit");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Add Cards//
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#card-add-modal");
const addCardCloseButton = document.querySelector(".modal__close-add");
const addPhotoModalButton = document.querySelector(".photo-modal__close");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const addPhotoModal = document.querySelector("#photo-modal");

const addCardTitle = addCardFormElement.querySelector("#card-title-input");
const addCardURL = addCardFormElement.querySelector("#card-url-input");

const addCardTitleInput = document.querySelector("#card-title-input");
const addCardURLInput = document.querySelector("#card-url-input");

const addCardEditForm = addCardModal.querySelector(".modal__form-add");

// Functions //
//Edit Profile//

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  // Set card image and title
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__description-item");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener("click", function () {
    const photoModal = document.querySelector("#photo-modal");
    const photoModalImg = document.querySelector(".photo-modal__image");
    const photoModalTitle = document.querySelector(".photo-modal__title");
    photoModalImg.src = cardData.link;
    photoModalImg.alt = cardData.name;
    photoModalTitle.textContent = cardData.name;
    openModal(photoModal);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    this.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// Event Handlers //
//Edit Profile//
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}
//Add Cards//
function handleAddCardSubmit(e) {
  e.preventDefault();

  const name = addCardTitleInput.value;
  const link = addCardURLInput.value;
  renderCard({ name, link }, cardListEl);
  addCardTitleInput.value = "";
  addCardURLInput.value = "";
  closeModal(addCardModal);
}

// Event Listeners //
//Edit Profile//

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//Add Cards//

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

addPhotoModalButton.addEventListener("click", () => closeModal(addPhotoModal));

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("modal_opened");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("modal_opened");
    });
  }
});
