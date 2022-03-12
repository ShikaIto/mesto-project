export const formEdit = document.forms.edit;
export const formAvatar = document.forms.avatar;
export const formAdd = document.forms.add;
export const inputCardImage = formAdd.elements.image;
export const inputCardName = formAdd.elements.name;
export const inputProfileName = formEdit.elements.name;
export const inputProfileJob = formEdit.elements.job;
export const avatar = document.querySelector(".profile__avatar-container");
export const avatarBtn = document.querySelector(".profile__avatar-button");

export const buttonAdd = document.querySelector(".profile__add-button");
export const buttonEdit = document.querySelector(".profile__edit-button");;
export const buttonAvatar = document.querySelector(".profile__avatar-button");

export const validationSetup = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

export const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-6",
    headers: {
      authorization: "df2a87c1-ee4d-42a8-8cbf-5bf5b4af8b77",
      "Content-Type": "application/json"
    }
  }
