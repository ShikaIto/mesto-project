import './pages/index.css';

import { enableValidation } from "./components/validate.js";
import { closePopup, popupEdit, popupAvatar } from "./components/modal.js";
import { formSubmitHandler } from "./components/utils.js";

const formAvatar = document.forms.avatar;
const formEdit = document.forms.edit;

enableValidation({
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active"
});

document.querySelector(".profile__avatar-container").addEventListener("mouseover", () => {
  document.querySelector(".profile__avatar-button").style.visibility = "visible";
});

document.querySelector(".profile__avatar-container").addEventListener("mouseout", () => {
  document.querySelector(".profile__avatar-button").style.visibility = "hidden";
});

formEdit.addEventListener("submit", (evt) => {
  formSubmitHandler(evt);
  document.querySelector(".profile__name").textContent = formEdit.elements.name.value;
  document.querySelector(".profile__caption").textContent = formEdit.elements.job.value;
  closePopup(popupEdit);
});

formAvatar.addEventListener("submit", (evt) => {
  formSubmitHandler(evt);
  document.querySelector(".profile__avatar").setAttribute("src", formAvatar.elements.image.value);
  closePopup(popupAvatar);
  formAvatar.reset();
});