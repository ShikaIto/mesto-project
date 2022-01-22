    function showImputError(formElement, inputElement, errorMessage, obj) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(obj.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(obj.errorClass);
      }
      function hideInputError(formElement, inputElement, obj) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(obj.inputErrorClass);
        errorElement.classList.remove(obj.errorClass);
        errorElement.textContent = "";
      }
      function checkInputValidity(formElement, inputElement, obj) {
        if (!inputElement.validity.valid) {
          showImputError(formElement, inputElement, inputElement.validationMessage, obj);
        } else {
          hideInputError(formElement, inputElement, obj);
        }
      }
      function hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      }
      export function toggleButtonState(inputList, buttonElement, obj) {
        if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(obj.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "true");
      } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
      } 
      }
      function setEventListeners(formElement, obj) {
        const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
        const buttonElement = formElement.querySelector(obj.submitButtonSelector);
        toggleButtonState(inputList, buttonElement, obj);
        inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            toggleButtonState(inputList, buttonElement, obj);
            checkInputValidity(formElement, inputElement, obj);
          });
        });
      }

      export function enableValidation (obj) {
        Array.from(document.forms).forEach((formElement) => {
          setEventListeners(formElement, obj);
        });
      }