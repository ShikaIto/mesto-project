import './index.css';

import { enableValidation } from "../components/validate.js";
import { closePopup, popupEdit } from "../components/modal.js";

const formEdit = document.forms.edit;
const avatar = document.querySelector(".profile__avatar-container");
const avatarBtn = document.querySelector(".profile__avatar-button");


enableValidation({
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active"
});

/*avatar.addEventListener("mouseover", () => {
  avatarBtn.style.visibility = "visible";
});

avatar.addEventListener("mouseout", () => {
  avatarBtn.style.visibility = "hidden";
});
Мне кажется этот вариант лучше, а то получается что-то вроде этого, ну или 
может я просто чего-то не знаю) в любом случае спасибо за обратную связь,
все очень развернуто и я узнала для себя новое*/

formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  document.querySelector(".profile__name").textContent = formEdit.elements.name.value;
  document.querySelector(".profile__caption").textContent = formEdit.elements.job.value;
  closePopup(popupEdit);
});