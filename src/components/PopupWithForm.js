import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{

	constructor(popupSelector, handleFormSubmitFunction) {
		super(popupSelector);
		this.handleFormSubmitFunction = handleFormSubmitFunction;
		this.form = this.popup.querySelector("form");
		this.button = this.form.querySelector(".popup__submit");
	}

	getFormElements(){
		return this.form.elements;
	}

	setEventListeners() {
		super.setEventListeners();
		this.form.addEventListener("submit", this.handleFormSubmitFunction)
	}

}