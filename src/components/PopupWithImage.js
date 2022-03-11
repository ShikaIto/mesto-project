import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{

	constructor(popupSelector) {
		super(popupSelector);
		this.img = document.querySelector(".popup__image");
		this.imgCapture = document.querySelector(".popup__image-caption");
	}

	openPopup(name, imgLink) {
		super.openPopup();
		this.img.src = imgLink;
		this.img.alt = name;
		this.imgCapture.textContent = name;
	}
}