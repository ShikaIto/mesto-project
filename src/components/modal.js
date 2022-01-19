import { deleteElem } from "./card.js";

const popupAdd = document.querySelector("#popup-add");
const popupEdit = document.querySelector("#popup-edit");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupAvatar = document.querySelector("#popup-avatar");
const buttonAvatar = document.querySelector(".profile__avatar-button");
const popupDelete = document.querySelector("#popup-delete");

function closePopup(popupName) {
    popupName.classList.remove("popup_opened");
  }
function openedPopup(popupName) {
  popupName.classList.add("popup_opened");
}

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

popupDelete.querySelector(".popup__submit").addEventListener("click", () => {
  deleteElem.remove();
  closePopup(popupDelete);
});

export { closePopup, popupAvatar, popupEdit, openedPopup, popupDelete, popupAdd };