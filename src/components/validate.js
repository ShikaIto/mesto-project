export function enableValidation (obj) {
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
      } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
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
}