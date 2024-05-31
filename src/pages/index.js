// Import necessary classes
import "../pages/index.css";
import { initialCards, validationSettings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import logoSrc from "../images/AroundtheUSLogo.svg";
import avatarSrc from "../images/jacques-cousteau.jpg";

const logoImage = document.querySelector(".header__logo");
if (logoImage) logoImage.src = logoSrc;

const avatarImage = document.querySelector(".profile__image");
if (avatarImage) avatarImage.src = avatarSrc;

// Create a renderer function for cards
const renderCard = (cardData) => {
  console.log("Rendering card with data:", cardData);
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.createCard();
  console.log("Created card element:", cardElement);
  return cardElement;
};

// Initialize the Section for cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

console.log("Card section initialized with items:", initialCards);

// Render all initial cards
cardSection.renderItems();

console.log("Initial cards rendered.");

// Validator for the profile form
const profileFormValidator = new FormValidator(
  validationSettings,
  document.querySelector(".modal__form-edit")
);
profileFormValidator.enableValidation();

// Validator for the card addition form
const cardFormValidator = new FormValidator(
  validationSettings,
  document.querySelector(".modal__form-add")
);
cardFormValidator.enableValidation();

// Create an instance of PopupWithImage
const imagePopup = new PopupWithImage({ popupSelector: "#photo-modal" });
imagePopup.setEventListeners();

// Function to handle image clicks
function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

// Create an instance of UserInfo
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
});

// Profile Edit Popup
const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      job: formData.description,
    });
  },
});

profileEditPopup.setEventListeners();

document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.querySelector("#profile-title-input").value = userData.name;
  document.querySelector("#profile-description-input").value = userData.job;
  profileEditPopup.open();
});

// Card Add Popup
const addCardPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: (formData) => {
    const newCardElement = renderCard(formData);
    cardSection.addItem(newCardElement);
  },
});

addCardPopup.setEventListeners();
addCardPopup.setFormValidator(cardFormValidator); // Link form validator

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});
