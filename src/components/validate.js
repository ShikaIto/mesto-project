import { popupAvatar, closePopup, popupAdd } from "./modal.js";
import { createCard, addCard, cardsContainer } from "./card.js";

export function enableValidation (obj) {
  const formAvatar = document.forms.avatar;
  const formAdd = document.forms.add;

    function showImputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(obj.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(obj.errorClass);
      }
      function hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(obj.inputErrorClass);
        errorElement.classList.remove(obj.errorClass);
        errorElement.textContent = "";
      }
      function checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
          showImputError(formElement, inputElement, inputElement.validationMessage);
        } else {
          hideInputError(formElement, inputElement);
        }
      }
      function hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      }
      function toggleButtonState(inputList, buttonElement) {
        if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(obj.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "true");
      } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
      } 
      }
      function setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
        const buttonElement = formElement.querySelector(obj.submitButtonSelector);
        toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            toggleButtonState(inputList, buttonElement);
            checkInputValidity(formElement, inputElement);
          });
        });
      }
    
      Array.from(document.forms).forEach((formElement) => {
        setEventListeners(formElement);
      });

      formAdd.addEventListener("submit", (evt) => {
        evt.preventDefault();
        addCard(cardsContainer, createCard(formAdd.elements.image.value, formAdd.elements.name.value));
        closePopup(popupAdd);
        formAdd.reset();
        const addInputList = Array.from(formAdd.querySelectorAll(obj.inputSelector));
        toggleButtonState(addInputList, formAdd.elements.submit);
      });
      
      formAvatar.addEventListener("submit", (evt) => {
        evt.preventDefault();
        document.querySelector(".profile__avatar").setAttribute("src", formAvatar.elements.image.value);
        closePopup(popupAvatar);
        formAvatar.reset();
        const avatarInputList = Array.from(formAvatar.querySelectorAll(obj.inputSelector));
        toggleButtonState(avatarInputList, formAvatar.elements.submit);
      });
}