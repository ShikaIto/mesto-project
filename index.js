const popupAdd = document.querySelector("#popup-add");
const popupEdit = document.querySelector("#popup-edit");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupImage = document.querySelector("#popup-image");
const popupAvatar = document.querySelector("#popup-avatar");
const buttonAvatar = document.querySelector(".profile__avatar-button");
const popupDelete = document.querySelector("#popup-delete");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const cardsContainer = document.querySelector(".cards__list");
const formAdd = document.forms.add;
const formAvatar = document.forms.avatar;
const formEdit = document.forms.edit;
let deleteElem = "";

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}
function openedPopup(popupName) {
  popupName.classList.add("popup_opened");
}
function formSubmitHandler(evt) {
  evt.preventDefault();
}
function createCard(imageLink, imageName) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".cards__item").cloneNode(true);
  cardElement.querySelector(".cards__image").setAttribute("src", imageLink);
  cardElement.querySelector(".cards__title").textContent = imageName;
  cardElement.querySelector(".cards__image").setAttribute("alt", imageName);
  return cardElement;
}
function addCard(container, element) {
  container.prepend(element);
}

function showImputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_active");
}
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_active");
  errorElement.textContent = "";
}
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showImputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add("popup__submit_disabled");
} else {
  buttonElement.classList.remove("popup__submit_disabled");
} 
}
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__submit");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
}

Array.from(document.forms).forEach((formElement) => {
  setEventListeners(formElement);
});

cardsContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("cards__like-button")) {
    evt.target.classList.toggle("cards__like-button_active");
  } else if (evt.target.classList.contains("cards__delete-button")) {
    deleteElem = evt.target.parentElement;
    openedPopup(popupDelete);
  } else if (evt.target.classList.contains("cards__image")) {
    const image = evt.target.getAttribute("src");
    const name = evt.target.getAttribute("alt");
    openedPopup(popupImage);
    document.querySelector(".popup__image-caption").textContent = name;
    document.querySelector(".popup__image").setAttribute("src", image);
    document.querySelector(".popup__image").setAttribute("alt", name);
  }
});

popupDelete.querySelector(".popup__submit").addEventListener("click", () => {
  deleteElem.remove();
  closePopup(popupDelete);
});

document.querySelector(".profile__avatar-container").addEventListener("mouseover", () => {
  document.querySelector(".profile__avatar-button").style.visibility = "visible";
});

document.querySelector(".profile__avatar-container").addEventListener("mouseout", () => {
  document.querySelector(".profile__avatar-button").style.visibility = "hidden";
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
});

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
});

Array.from(document.querySelectorAll(".popup__close-button")).forEach((elem) => {
  elem.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});

buttonAdd.addEventListener("click", () => {
  openedPopup(popupAdd);
});
buttonEdit.addEventListener("click", () => {
  openedPopup(popupEdit);
});
buttonAvatar.addEventListener("click", () => {
  openedPopup(popupAvatar);
});

initialCards.forEach((element) => {
  addCard(cardsContainer, createCard(element.link, element.name));
});

formEdit.addEventListener("submit", (evt) => {
  formSubmitHandler(evt);
  document.querySelector(".profile__name").textContent = formEdit.elements.name.value;
  document.querySelector(".profile__caption").textContent = formEdit.elements.job.value;
  closePopup(popupEdit);
});

formAdd.addEventListener("submit", (evt) => {
  formSubmitHandler(evt);
  addCard(cardsContainer, createCard(formAdd.elements.image.value, formAdd.elements.name.value));
  closePopup(popupAdd);
  formAdd.reset();
});

formAvatar.addEventListener("submit", (evt) => {
  formSubmitHandler(evt);
  document.querySelector(".profile__avatar").setAttribute("src", formAvatar.elements.image.value);
  closePopup(popupAvatar);
  formAvatar.reset();
});
