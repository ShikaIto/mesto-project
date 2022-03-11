import './index.css';

import formValidator from "../components/validate.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { closePopup, openPopup } from "../components/modal.js";
import { Card, addCard } from "../components/Сard.js";
import { Api } from "../components/Api.js";
import {
  formEdit, formAvatar, formAdd, inputCardImage, inputCardName, inputProfileAvatar,
  inputProfileJob, inputProfileName, avatar, avatarBtn, profileAvatar, profileCaption,
  profileName, obj, validationSetup, cardsContainer, popupAdd, popupEdit, popupAvatar,
  config, popupImage, popupImg, popupCaption, popupDeleteBtn, popupDelete, buttonAdd, buttonEdit, buttonAvatar
} from "../utils/constants.js";

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



export const api = new Api(config);
/*
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
*/
/*
enableValidation(obj);
*/
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

// Delete card - надо переписать функцию удаления
export const deletePopup = new PopupWithForm("#popup-delete", handleDeleteClick);
deletePopup.setEventListeners();

buttonAdd.addEventListener('click',() => {
  formValidators['add'].resetValidation();
  profileAddPopup.openPopup();
});
buttonEdit.addEventListener('click', () => {
  formValidators['edit'].resetValidation();
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
    const validator = new formValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSetup);

avatar.addEventListener("mouseover", () => {
  avatarBtn.style.visibility = "visible";
});

avatar.addEventListener("mouseout", () => {
  avatarBtn.style.visibility = "hidden";
});

function handleDeleteClick() {
  deletePopup.clearEventListeners();
  deletePopup.handleClick = deleteCard.bind(this);
  deletePopup.openPopup();
}

function deleteCard() {
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
}

/*
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
*/

function editFormHandler() {
  const submit = formAdd.elements.submit;
  submit.textContent = "Coхранение...";
  api.saveProfileInfo(inputProfileName.value, inputProfileJob.value)
    .then(() => {
      profileName.textContent = inputProfileName.value;
      profileCaption.textContent = inputProfileJob.value;
      profileEditPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submit.textContent = "Сохранить";
    })


}
/*
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
*/

function handleAddFormSubmit() {
  const submit = formAdd.elements.submit;
  submit.textContent = "Coхранение...";
  api.saveCard(inputCardName.value, inputCardImage.value)
    .then((item) => {
      const card = new Card(item, handleCardClick, handleDeleteClick, handleLikeClick, profileId, "#card-template");
      addCard(cardsContainer, card.getCard());
      profileAddPopup.form.reset();
      profileAddPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submit.textContent = "Создать";
    })
}

/*
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
*/
function editAvatar(){
  const elements = avatarPopup.getFormElements();
  const link = elements['avatar-url'].value;
  const submit = formAvatar.elements.submit;
  submit.textContent = "Coхранение...";
  api.saveProfileAvatar(link)
    .then(data=>{
      profileAvatar.src = data.avatar;
      avatarPopup.closePopup();
      avatarPopup.form.reset();
    })
    .catch(err => {
      console.log(err);
    })
}

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