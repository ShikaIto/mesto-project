import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{

	constructor(popupSelector, handleFormSubmitFunction) {
		super(popupSelector);
		this.handleFormSubmitFunction = handleFormSubmitFunction;
		this.form = this.popup.querySelector("form");
		this.button = this.form.querySelector(".popup__submit");
		this._inputList = this.popup.querySelectorAll(".popup__input");
	}

	_getInputValues() {
		this._formValues = {};
		this._inputList.forEach((input) => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	renderLoading(isLoading, text = "Сохранить", loadingText = "Сохранение...") {
	  if (isLoading) {
		this.button.textContent = loadingText;
	  } else {
        this.button.textContent = text;
	  }
	}

	getFormElements(){
		return this.form.elements;
	}

	setEventListeners() {
		super.setEventListeners();
		this.form.addEventListener("submit", this.handleFormSubmitFunction)
	}

	closePopup() {
		super.closePopup();
		this.form.reset();
	}
}