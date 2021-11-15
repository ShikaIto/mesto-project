const popupAdd = document.querySelector("#popup-add");
const popupEdit = document.querySelector("#popup-edit");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile__edit-button");
const closeAdd = document.querySelector("#close-add");
const closeEdit = document.querySelector("#close-edit");
const popupImage = document.querySelector("#popup-image");
const closeImage = document.querySelector("#close-image");
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
const submitEdit = popupEdit.querySelector(".submit-edit");
const nameInput = popupEdit.querySelector(".popup__form_el_name");
const jobInput = popupEdit.querySelector(".popup__form_el_caption");
const cardsContainer = document.querySelector(".cards__list");
const submitAdd = document.querySelector("#submit-add");
const formAdd = popupAdd.querySelector(".popup__form-container");

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}
function openedPopup(popupName) {
  popupName.classList.add("popup_opened");
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  const name = document.querySelector(".profile__name");
  const caption = document.querySelector(".profile__caption");
  name.textContent = nameInput.value;
  caption.textContent = jobInput.value;
  closePopup(popupEdit);
}
function createCard(imageLink, imageName) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".cards__item")
    .cloneNode(true);
  cardElement.querySelector(".cards__image").setAttribute("src", imageLink);
  cardElement.querySelector(".cards__title").textContent = imageName;
  cardElement.querySelector(".cards__image").setAttribute("alt", imageName);
  cardElement
    .querySelector(".cards__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("cards__like-button_active");
    });
  cardElement
    .querySelector(".cards__delete-button")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
    });
  cardElement
    .querySelector(".cards__image")
    .addEventListener("click", function (evt) {
      const image = evt.target.getAttribute("src");
      const name = evt.target.getAttribute("alt");
      openedPopup(popupImage);
      document.querySelector(".popup__image-caption").textContent = name;
      document.querySelector(".popup__image").setAttribute("src", image);
      document.querySelector(".popup__image").setAttribute("alt", name);
    });
  return cardElement;
}
function addCard(container, element) {
  container.prepend(element);
}

closeAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});
closeEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});
closeImage.addEventListener("click", function () {
  closePopup(popupImage);
});
buttonAdd.addEventListener("click", function () {
  openedPopup(popupAdd);
});
buttonEdit.addEventListener("click", function () {
  openedPopup(popupEdit);
});

formEdit.addEventListener("submit", formSubmitHandler);

initialCards.forEach(function (element) {
  addCard(cardsContainer, createCard(element.link, element.name));
});

submitAdd.addEventListener("click", function (evt) {
  evt.preventDefault();
  const cardImage = popupAdd.querySelector(".popup__form_el_caption");
  const cardName = popupAdd.querySelector(".popup__form_el_name");
  addCard(cardsContainer, createCard(cardImage.value, cardName.value));
  closePopup(popupAdd);
  formAdd.reset();
});
