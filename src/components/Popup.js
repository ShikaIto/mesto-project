export default class Popup {

	constructor(popupSelector) {
		this.popup = document.querySelector(popupSelector);
	}

	openPopup() {
		this.popup.classList.add("popup_opened");
		document.addEventListener('keydown', this._handleEscClose);
	}

	closePopup() {
		this.popup.classList.remove("popup_opened");
		document.removeEventListener("keydown", this._handleEscClose);
	}

	_handleEscClose = (evt) => {
		if (evt.key === "Escape") {
			this.closePopup.call(this);
		}
	};

	setEventListeners(){
		this.popup.addEventListener("mousedown", (evt) => {
			if (evt.target.classList.contains("popup_opened")) {
				this.closePopup()
			}
			if (evt.target.classList.contains("popup__close-button")) {
				this.closePopup()
			}})
	}
}