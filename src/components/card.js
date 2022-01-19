import { formSubmitHandler } from "./utils.js";
import { closePopup, openedPopup, popupDelete, popupAdd } from "./modal.js";

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
const cardsContainer = document.querySelector(".cards__list");
const formAdd = document.forms.add;
const popupImage = document.querySelector("#popup-image");
let deleteElem = "";

function createCard(imageLink, imageName) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".cards__item").cloneNode(true);
  cardElement.querySelector(".cards__image").setAttribute("src", imageLink);
  cardElement.querySelector(".cards__title").textContent = imageName;
  cardElement.querySelector(".cards__image").setAttribute("alt", imageName);
  return cardElement;
}
function addCard(container, element) {
  container.prepend(element);
}

initialCards.forEach((element) => {
    addCard(cardsContainer, createCard(element.link, element.name));
  });

formAdd.addEventListener("submit", (evt) => {
  formSubmitHandler(evt);
  addCard(cardsContainer, createCard(formAdd.elements.image.value, formAdd.elements.name.value));
  closePopup(popupAdd);
  formAdd.reset();
});

cardsContainer.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("cards__like-button")) {
      evt.target.classList.toggle("cards__like-button_active");
    } else if (evt.target.classList.contains("cards__delete-button")) {
      deleteElem = evt.target.parentElement;
      openedPopup(popupDelete);
    } else if (evt.target.classList.contains("cards__image")) {
      const image = evt.target.getAttribute("src");
      const name = evt.target.getAttribute("alt");
      openedPopup(popupImage);
      document.querySelector(".popup__image-caption").textContent = name;
      document.querySelector(".popup__image").setAttribute("src", image);
      document.querySelector(".popup__image").setAttribute("alt", name);
    }
  });

export { deleteElem };