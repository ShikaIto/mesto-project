import { deleteCard } from "./card.js";

export const popupAdd = document.querySelector("#popup-add");
export const popupEdit = document.querySelector("#popup-edit");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile__edit-button");
export const popupAvatar = document.querySelector("#popup-avatar");
const buttonAvatar = document.querySelector(".profile__avatar-button");
export const popupDelete = document.querySelector("#popup-delete");
export const popupDeleteBtn = popupDelete.querySelector(".popup__submit");

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

export function openPopupDelete() {
  popupDelete.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
  popupDeleteBtn.addEventListener("click", deleteCard);
}
  
Array.from(document.querySelectorAll(".popup")).forEach((elem) => {
  elem.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(elem);
    } else if (evt.target.classList.contains('popup__close-button')) {
      closePopup(elem);
    }
  });
});
  
buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});
buttonEdit.addEventListener("click", () => {
  openPopup(popupEdit);
});
buttonAvatar.addEventListener("click", () => {
  openPopup(popupAvatar);
});
