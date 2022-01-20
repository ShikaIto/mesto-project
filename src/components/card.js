import { openPopup, popupDelete } from "./modal.js";

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];
export const cardsContainer = document.querySelector(".cards__list");
const popupImage = document.querySelector("#popup-image");
let deleteElem = "";

export function createCard(imageLink, imageName) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".cards__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");

  cardImage.setAttribute("src", imageLink);
  cardElement.querySelector(".cards__title").textContent = imageName;
  cardImage.setAttribute("alt", imageName);

  cardImage.addEventListener("click", (evt) => {
    const image = evt.target.getAttribute("src");
    const name = evt.target.getAttribute("alt");
    const popupImg = document.querySelector(".popup__image");
    openPopup(popupImage);
    document.querySelector(".popup__image-caption").textContent = name;
    popupImg.setAttribute("src", image);
    popupImg.setAttribute("alt", name);
  });

  cardElement.querySelector(".cards__like-button").addEventListener("click", (evt) => {
    evt.target.classList.toggle("cards__like-button_active");
  });

  cardElement.querySelector(".cards__delete-button").addEventListener("click", (evt) => {
    deleteElem = evt.target.closest(".cards__item");
    openPopup(popupDelete);
  });

  return cardElement;
}

export function addCard(container, element) {
  container.prepend(element);
}

initialCards.forEach((element) => {
    addCard(cardsContainer, createCard(element.link, element.name));
  });

export { deleteElem };