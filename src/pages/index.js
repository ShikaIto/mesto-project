import './index.css';

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Сard.js";
import { Api } from "../components/Api.js";
import Section from "../components/Section.js";
import UserInfo from '../components/UserInfo';
import {
  formAvatar, formAdd, formEdit, inputCardImage, inputCardName,inputProfileJob, inputProfileName, 
  avatar, avatarBtn, validationSetup, config, buttonAdd, buttonEdit, buttonAvatar
} from "../utils/constants.js";

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
  api.deleteCardFromServer(deleteId)
  .then(() => {
    deleteElem.removeCard();
    confirmDeletePopup.closePopup();
  })
  .catch((err) => {
    console.log(err);
  })
}

function editFormHandler() {
  const submit = formEdit.elements.submit;
  submit.textContent = "Coхранение...";
  api.saveProfileInfo(inputProfileName.value, inputProfileJob.value)
    .then(() => {
      profileInfo.setUserInfo(inputProfileName.value, inputProfileJob.value);
      profileEditPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submit.textContent = "Сохранить";

    })
}

function handleAddFormSubmit() {
  const submit = formAdd.elements.submit;
  submit.textContent = "Coхранение...";
  api.saveCard(inputCardName.value, inputCardImage.value)
    .then((item) => {
      cardsContainer.renderItem(item);
      profileAddPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submit.textContent = "Создать";
    })
}

function editAvatar(){
  const elements = avatarPopup.getFormElements();
  const link = elements['avatar-url'].value;
  const submit = formAvatar.elements.submit;
  submit.textContent = "Coхранение...";
  api.saveProfileAvatar(link)
    .then(data=>{
      profileInfo.setUserAvatar(data.avatar);
      avatarPopup.closePopup();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      submit.textContent = "Сохранить";
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
  profileInfo.setUserInfo(info.name, info.about);
  profileInfo.setUserAvatar(info.avatar);
  profileInfo.setUserId(info._id);

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