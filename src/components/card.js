import { openPopup, closePopup } from "./modal.js";
import { deleteCardFromServer, addLikeCard, removeLikeCard } from "./api.js";
import { profileId } from "../pages/index.js";
import { popupImage, popupImg, popupCaption, cards, popupDelete, popupDeleteBtn } from "../utils/constants.js";

let deleteElem;
let deleteId;

export function createButtonDelete() {
  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("cards__delete-button");
  buttonDelete.setAttribute("type","button");
  return buttonDelete;
}

export function addCard(container, element) {
  container.prepend(element);
}

function likeCard(element, button, cardId) {
  if(button.classList.contains("cards__like-button_active")) {
    removeLikeCard(cardId)
    .then((res) => {
      console.log("ok");
      element.textContent = res.likes.length;
      button.classList.remove("cards__like-button_active");
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    addLikeCard(cardId)
    .then((res) => {
    element.textContent = res.likes.length;
    button.classList.add("cards__like-button_active");
  })
  .catch((err) => {
    console.log(err);
  })
  }
  
}

export function createCard(imageLink, imageName, cardId, ownerId, likes) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".cards__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const likeCounter = cardElement.querySelector(".cards__like-counter");
  const likeButton = cardElement.querySelector(".cards__like-button");

  cardImage.setAttribute("src", imageLink);
  cardElement.querySelector(".cards__title").textContent = imageName;
  cardImage.setAttribute("alt", imageName);
  likeCounter.textContent = likes.length;
  
  likes.forEach((elem) => {
    if(elem._id === profileId) {
      likeButton.classList.add("cards__like-button_active");
    }
  })
  cards[imageLink] = cardId;

  if (ownerId === profileId) {
    addCard(cardElement, createButtonDelete());
  }

  cardImage.addEventListener("click", () => {
    openPopup(popupImage);
    popupCaption.textContent = imageName;
    popupImg.setAttribute("src", imageLink);
    popupImg.setAttribute("alt", imageName);
  });

  likeButton.addEventListener("click", (evt) => {
    likeCard(likeCounter, evt.target, cardId);
  });
  
  const deleteBtn = cardElement.querySelector(".cards__delete-button");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", (evt) => {
      deleteElem = evt.target.closest(".cards__item");
      deleteId = cards[deleteElem.querySelector(".cards__image").src];
      openPopup(popupDelete);
   });
  }

  return cardElement;
}

export function deleteCard() {
  deleteCardFromServer(deleteId)
  .then(() => {
    deleteElem.remove();
    closePopup(popupDelete);
  })
  .catch((err) => {
    console.log(err);
  })
  popupDeleteBtn.removeEventListener("click", deleteCard);
}
