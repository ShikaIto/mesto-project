import { popupAdd, popupEdit, buttonAdd, buttonAvatar, buttonEdit, popupAvatar } from "../utils/constants.js"

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
