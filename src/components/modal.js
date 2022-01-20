import { deleteElem } from "./card.js";

const popupAdd = document.querySelector("#popup-add");
const popupEdit = document.querySelector("#popup-edit");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupAvatar = document.querySelector("#popup-avatar");
const buttonAvatar = document.querySelector(".profile__avatar-button");
const popupDelete = document.querySelector("#popup-delete");

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
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

popupDelete.querySelector(".popup__submit").addEventListener("click", () => {
  deleteElem.remove();
  closePopup(popupDelete);
});

export { closePopup, popupAvatar, popupEdit, openPopup, popupDelete, popupAdd };