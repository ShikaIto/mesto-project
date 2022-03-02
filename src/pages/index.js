import './index.css';

import { enableValidation, toggleButtonState } from "../components/validate.js";
import { closePopup } from "../components/modal.js";
import { createCard, addCard } from "../components/card.js";
import { Api } from "../components/api.js";
import { formEdit, formAvatar, formAdd, inputCardImage, inputCardName, inputProfileAvatar,
inputProfileJob, inputProfileName, avatar, avatarBtn, profileAvatar, profileCaption,
profileName, obj, cardsContainer, popupAdd, popupEdit, popupAvatar, config } from "../utils/constants.js";

export let profileId = "";

export const api = new Api(config);

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
  api.saveProfileInfo(inputProfileName.value, inputProfileJob.value)
  .then(() => {
    profileName.textContent = inputProfileName.value;
    profileCaption.textContent = inputProfileJob.value;
    closePopup(popupEdit);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submit.textContent = "Сохранить";
  })
});

formAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const addInputList = Array.from(formAdd.querySelectorAll(obj.inputSelector));
  const submit = formAdd.elements.submit;
  submit.textContent = "Coхранение...";
  api.saveCard(inputCardName.value, inputCardImage.value)
  .then((card) => {
    addCard(cardsContainer, createCard(card.link, card.name, card._id, card.owner._id, card.likes));
    closePopup(popupAdd);
    formAdd.reset();
    toggleButtonState(addInputList, submit, obj);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submit.textContent = "Создать";
  })
});

formAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const avatarInputList = Array.from(formAvatar.querySelectorAll(obj.inputSelector));
  const submit = formAvatar.elements.submit;
  submit.textContent = "Coхранение...";
  api.saveProfileAvatar(inputProfileAvatar.value)
  .then(() => {
    profileAvatar.setAttribute("src", inputProfileAvatar.value);
    closePopup(popupAvatar);
    formAvatar.reset();
    toggleButtonState(avatarInputList, submit, obj);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submit.textContent = "Сохранить";
  })
});

Promise.all([api.getProfileInfo(), api.getAllCards()])
.then(([info, cards]) => {
  profileName.textContent = info.name;
  profileCaption.textContent = info.about;
  profileAvatar.src = info.avatar;
  inputProfileName.value = info.name;
  inputProfileJob.value = info.about;
  profileId = info._id;

  cards.forEach((card) => {
    addCard(cardsContainer, createCard(card.link, card.name, card._id, card.owner._id, card.likes));
  });
})
.catch((err) => {
  console.log(err);
})