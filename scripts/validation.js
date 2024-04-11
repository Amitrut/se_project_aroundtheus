function showInputError(
  formEl,
  inputEl,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  if (inputEl && errorElement) {
    inputEl.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  if (inputEl && errorElement) {
    inputEl.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
  }
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  const isInvalid = inputEls.some((inputEl) => !inputEl.validity.valid);

  if (isInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  const inputEls = Array.from(formEl.querySelectorAll(options.inputSelector));
  const submitButton = formEl.querySelector(options.submitButtonSelector);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });

  toggleButtonState(inputEls, submitButton, options);
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
