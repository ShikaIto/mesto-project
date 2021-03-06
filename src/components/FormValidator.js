export default class FormValidator {
  constructor(settings, formElement){
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;
    this.form = formElement;
    this._inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
    this.submitButton = this.form.querySelector(this.submitButtonSelector);
  }

  enableValidation () {
    this.form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    });
  }

  _setEventListeners (){
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', ()=> {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState () {
    if(this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this.submitButton.classList.remove(this.inactiveButtonClass);
      this.submitButton.removeAttribute('disabled');
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
  }

  _hasInvalidInput (){
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _disableSubmitButton(){
    this.submitButton.classList.add(this.inactiveButtonClass);
    this.submitButton.setAttribute('disabled', '');
  }
}