import './index.css';

import { enableValidation, toggleButtonState } from "../components/validate.js";
import { closePopup, popupEdit, popupAdd, popupAvatar } from "../components/modal.js";
import { createCard, addCard, cardsContainer } from "../components/card.js";

const formEdit = document.forms.edit;
const formAvatar = document.forms.avatar;
const formAdd = document.forms.add;
const avatar = document.querySelector(".profile__avatar-container");
const avatarBtn = document.querySelector(".profile__avatar-button");
const profileName =  document.querySelector(".profile__name");
const profileCaption = document.querySelector(".profile__caption");
const profileAvatar = document.querySelector(".profile__avatar");
const obj = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active"
};


enableValidation(obj);

avatar.addEventListener("mouseover", () => {
  avatarBtn.style.visibility = "visible";
});

avatar.addEventListener("mouseout", () => {
  avatarBtn.style.visibility = "hidden";
});

formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = formEdit.elements.name.value;
  profileCaption.textContent = formEdit.elements.job.value;
  closePopup(popupEdit);
});

formAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addCard(cardsContainer, createCard(formAdd.elements.image.value, formAdd.elements.name.value));
  closePopup(popupAdd);
  formAdd.reset();
  const addInputList = Array.from(formAdd.querySelectorAll(obj.inputSelector));
  toggleButtonState(addInputList, formAdd.elements.submit, obj);
});

formAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileAvatar.setAttribute("src", formAvatar.elements.image.value);
  closePopup(popupAvatar);
  formAvatar.reset();
  const avatarInputList = Array.from(formAvatar.querySelectorAll(obj.inputSelector));
  toggleButtonState(avatarInputList, formAvatar.elements.submit, obj);
});