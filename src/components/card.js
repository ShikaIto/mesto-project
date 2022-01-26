import { openPopup, popupDelete, openPopupDelete } from "./modal.js";
import { deleteCardFromServer, addLikeCard, removeLikeCard } from "./api.js";
import { profileId } from "../pages/index.js";

export const cardsContainer = document.querySelector(".cards__list");
const popupImage = document.querySelector("#popup-image");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__image-caption");
const cards = {};

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
    addLikeCard(cardId)
    .then((res) => {
      element.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    removeLikeCard(cardId)
    .then((res) => {
    element.textContent = res.likes.length;
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

  if (cardId) {
    likeCounter.textContent = likes.length;
  
    likes.forEach((elem) => {
      if(elem._id === profileId) {
        likeButton.classList.add("cards__like-button_active");
      }
    })
    cards[imageLink] = cardId;
  }

  if (ownerId === profileId || !ownerId) {
    addCard(cardElement, createButtonDelete());
  }

  cardImage.addEventListener("click", () => {
    openPopup(popupImage);
    popupCaption.textContent = imageName;
    popupImg.setAttribute("src", imageLink);
    popupImg.setAttribute("alt", imageName);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
    likeCard(likeCounter, likeButton, cardId);
  });
  
  const deleteBtn = cardElement.querySelector(".cards__delete-button");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", (evt) => {
      const deleteElem = evt.target.closest(".cards__item");
      const key = deleteElem.querySelector(".cards__image").src;
     openPopupDelete(popupDelete, deleteElem, cards[key]);
   });
  }

  return cardElement;
}

export function deleteCard(deleteElem, deleteId) {
  deleteElem.remove();
  deleteCardFromServer(deleteId);
}
