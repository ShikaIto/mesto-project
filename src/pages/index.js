import './index.css';

import { enableValidation, toggleButtonState } from "../components/validate.js";
import { closePopup, popupEdit, popupAdd, popupAvatar } from "../components/modal.js";
import { createCard, addCard, cardsContainer } from "../components/card.js";
import { profileInfo, cardInfo, saveProfileInfo, saveProfileAvatar, saveCard } from '../components/api.js';

const formEdit = document.forms.edit;
const formAvatar = document.forms.avatar;
const formAdd = document.forms.add;
export const inputCardImage = formAdd.elements.image;
export const inputCardName = formAdd.elements.name;
export const inputProfileName = formEdit.elements.name;
export const inputProfileJob = formEdit.elements.job;
export const inputProfileAvatar = formAvatar.elements.image;
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
export let profileId = "";

enableValidation(obj);

avatar.addEventListener("mouseover", () => {
  avatarBtn.style.visibility = "visible";
});

avatar.addEventListener("mouseout", () => {
  avatarBtn.style.visibility = "hidden";
});

formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submit = formEdit.elements.submit;
  submit.textContent = "Coхранение...";
  profileName.textContent = inputProfileName.value;
  profileCaption.textContent = inputProfileJob.value;
  saveProfileInfo();
  closePopup(popupEdit);
  submit.textContent = "Сохранить";
});

formAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submit = formAdd.elements.submit;
  submit.textContent = "Coхранение...";
  addCard(cardsContainer, createCard(inputCardImage.value, inputCardName.value));
  saveCard();
  closePopup(popupAdd);
  submit.textContent = "Создать";
  formAdd.reset();
  const addInputList = Array.from(formAdd.querySelectorAll(obj.inputSelector));
  toggleButtonState(addInputList, submit, obj);
});

formAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submit = formAvatar.elements.submit;
  submit.textContent = "Coхранение...";
  profileAvatar.setAttribute("src", inputProfileAvatar.value);
  saveProfileAvatar();
  closePopup(popupAvatar);
  submit.textContent = "Сохранить";
  formAvatar.reset();
  const avatarInputList = Array.from(formAvatar.querySelectorAll(obj.inputSelector));
  toggleButtonState(avatarInputList, submit, obj);
});

profileInfo()
.then((info) => {
  profileName.textContent = info.name;
  profileCaption.textContent = info.about;
  profileAvatar.src = info.avatar;
  inputProfileName.value = info.name;
  inputProfileJob.value = info.about;
  return info._id
})
.then((res) => {
  profileId = res
})
.catch((err) => {
  console.log(err);
})

cardInfo()
.then((cards) => {
  cards.forEach((card) => {
    addCard(cardsContainer, createCard(card.link, card.name, card._id, card.owner._id, card.likes));
  });
})
.catch((err) => {
  console.log(err);
})