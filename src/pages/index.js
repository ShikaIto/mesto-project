import './index.css';

import { enableValidation, toggleButtonState } from "../components/validate.js";
import { closePopup, openPopup } from "../components/modal.js";
import { Card, addCard } from "../components/Сard.js";
import { Api } from "../components/Api.js";
import { formEdit, formAvatar, formAdd, inputCardImage, inputCardName, inputProfileAvatar,
inputProfileJob, inputProfileName, avatar, avatarBtn, profileAvatar, profileCaption,
profileName, obj, cardsContainer, popupAdd, popupEdit, popupAvatar, 
config, popupImage, popupImg, popupCaption, popupDeleteBtn, popupDelete } from "../utils/constants.js";

export let profileId = "";
let deleteElem, deleteId;

function handleCardClick(card) {
  popupCaption.textContent = card.name;
  popupImg.src = card.link;
  popupImg.alt = card.name;
  openPopup(popupImage);
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
  openPopup(popupDelete);
  deleteElem = card;
  deleteId = id;
}

export const api = new Api(config);

popupDeleteBtn.addEventListener("click", () => {
  api.deleteCardFromServer(deleteId)
  .then(() => {
    deleteElem.removeCard();
    closePopup(popupDelete);
  })
  .catch((err) => {
    console.log(err);
  })
});

enableValidation(obj);

avatar.addEventListener("mouseover", () => {
  avatarBtn.style.visibility = "visible";
});

avatar.addEventListener("mouseout", () => {
  avatarBtn.style.visibility = "hidden";
});

formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submit = formEdit.elements.submit;
  submit.textContent = "Coхранение...";
  api.saveProfileInfo(inputProfileName.value, inputProfileJob.value)
  .then(() => {
    profileName.textContent = inputProfileName.value;
    profileCaption.textContent = inputProfileJob.value;
    closePopup(popupEdit);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submit.textContent = "Сохранить";
  })
});

formAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const addInputList = Array.from(formAdd.querySelectorAll(obj.inputSelector));
  const submit = formAdd.elements.submit;
  submit.textContent = "Coхранение...";
  api.saveCard(inputCardName.value, inputCardImage.value)
  .then((item) => {
    const card = new Card(item, handleCardClick, handleDeleteClick, handleLikeClick, profileId, "#card-template");
    addCard(cardsContainer, card.getCard());
    closePopup(popupAdd);
    formAdd.reset();
    toggleButtonState(addInputList, submit, obj);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submit.textContent = "Создать";
  })
});

formAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const avatarInputList = Array.from(formAvatar.querySelectorAll(obj.inputSelector));
  const submit = formAvatar.elements.submit;
  submit.textContent = "Coхранение...";
  api.saveProfileAvatar(inputProfileAvatar.value)
  .then(() => {
    profileAvatar.setAttribute("src", inputProfileAvatar.value);
    closePopup(popupAvatar);
    formAvatar.reset();
    toggleButtonState(avatarInputList, submit, obj);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submit.textContent = "Сохранить";
  })
});

Promise.all([api.getProfileInfo(), api.getAllCards()])
.then(([info, cards]) => {
  profileName.textContent = info.name;
  profileCaption.textContent = info.about;
  profileAvatar.src = info.avatar;
  inputProfileName.value = info.name;
  inputProfileJob.value = info.about;
  profileId = info._id;

  cards.reverse().forEach((item) => {
    const card = new Card(item, handleCardClick, handleDeleteClick, handleLikeClick, profileId, "#card-template");
    addCard(cardsContainer, card.getCard());   
  });
})
.catch((err) => {
  console.log(err);
})