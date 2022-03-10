import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{

	constructor(popupSelector, imgSelector, imgCaptureSelector) {
		super(popupSelector);
		this.img = document.querySelector(imgSelector);
		this.imgCapture = document.querySelector(imgCaptureSelector);
	}

	openPopup(name, imgLink) {
		super.openPopup();
		this.img.src = imgLink;
		this.img.alt = name;
		this.imgCapture.textContent = name;
	}
}