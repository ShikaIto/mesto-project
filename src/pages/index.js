import './index.css';

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Сard.js";
import { Api } from "../components/Api.js";
import Section from "../components/Section.js";
import UserInfo from '../components/UserInfo';
import { inputProfileJob, inputProfileName,avatar, avatarBtn, validationSetup, 
  config, buttonAdd, buttonEdit, buttonAvatar } from "../utils/constants.js";

let deleteElem, deleteId;

function handleCardClick(card) {
  imgPopup.openPopup(card.name, card.link);
}

function handleLikeClick(card, id) {
  if(card.isLiked()) {
    api.removeLikeCard(id)
    .then((res) => {
      card.updateLikes(res); 
    }) 
    .catch((err) => {
      console.log(err);
    })
  } else {
    api.addLikeCard(id)
    .then((res) => {
      card.updateLikes(res); 
    })  
    .catch((err) => {
      console.log(err);
    })
  }
}

function handleDeleteClick(card, id) {
  confirmDeletePopup.openPopup();
  deleteElem = card;
  deleteId = id;
}

function handleDeleteFormSubmit() {
  confirmDeletePopup.renderLoading(true, "Да", "Удаление...");
  api.deleteCardFromServer(deleteId)
  .then(() => {
    deleteElem.removeCard();
    confirmDeletePopup.closePopup();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    confirmDeletePopup.renderLoading(false, "Да");
  })
}

function editFormHandler() {
  const { name, job } = profileEditPopup.getInputValues();
  profileEditPopup.renderLoading(true);
  api.saveProfileInfo(name, job)
    .then((res) => {
      profileInfo.setUserInfo(res);
      profileEditPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false);
    })
}

function handleAddFormSubmit() {
  const { name, image } = profileAddPopup.getInputValues();
  profileAddPopup.renderLoading(true);
  api.saveCard(name, image)
    .then((item) => {
      cardsContainer.renderItem(item);
      profileAddPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileAddPopup.renderLoading(false, "Создать");
    })
}

function editAvatar(){
  const { image } = avatarPopup.getInputValues();;
  avatarPopup.renderLoading(true);
  api.saveProfileAvatar(image)
    .then(data=>{
      profileInfo.setUserInfo(data);
      avatarPopup.closePopup();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    })
}

const profileInfo = new UserInfo(".profile__name", ".profile__caption", ".profile__avatar");

const cardsContainer = new Section({
  renderer: (item) => {
    const card = new Card(item, handleCardClick, handleDeleteClick, handleLikeClick, profileInfo.getUserId(), "#card-template");
    cardsContainer.addItem(card.getCard());
  }
}, ".cards__list");

export const api = new Api(config);

// Edit profile
export const profileEditPopup = new PopupWithForm('#popup-edit', editFormHandler);
profileEditPopup.setEventListeners();

// Edit avatar
export const avatarPopup = new PopupWithForm("#popup-avatar", editAvatar);
avatarPopup.setEventListeners();

// Add card
export const profileAddPopup = new PopupWithForm("#popup-add", handleAddFormSubmit);
profileAddPopup.setEventListeners();

// Show card
export const imgPopup = new PopupWithImage("#popup-image");
imgPopup.setEventListeners();

// Delete card 
export const confirmDeletePopup = new PopupWithForm("#popup-delete", handleDeleteFormSubmit);
confirmDeletePopup.setEventListeners();

buttonAdd.addEventListener('click',() => {
  formValidators['add'].resetValidation();
  profileAddPopup.openPopup();
});
buttonEdit.addEventListener('click', () => {
  formValidators['edit'].resetValidation();
  const info = profileInfo.getUserInfo();
  inputProfileName.value = info.name;
  inputProfileJob.value = info.about;
  profileEditPopup.openPopup();
});
buttonAvatar.addEventListener('click', ()=> {
  formValidators['avatar'].resetValidation();
  avatarPopup.openPopup();
});

// Validation
const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

Promise.all([api.getProfileInfo(), api.getAllCards()])
.then(([info, cards]) => {
  profileInfo.setUserInfo(info);

  cardsContainer.renderItems(cards);
})
.catch((err) => {
  console.log(err);
})

enableValidation(validationSetup);

avatar.addEventListener("mouseover", () => {
  avatarBtn.style.visibility = "visible";
});

avatar.addEventListener("mouseout", () => {
  avatarBtn.style.visibility = "hidden";
});