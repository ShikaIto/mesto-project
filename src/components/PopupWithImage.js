import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{

	constructor(popupSelector) {
		super(popupSelector);
		this.img = this.popup.querySelector(".popup__image");
		this.imgCapture = this.popup.querySelector(".popup__image-caption");
	}

	openPopup(name, img) {
		super.openPopup();
		this.img.src = img;
		this.img.alt = name;
		this.imgCapture.textContent = name;
	}
}