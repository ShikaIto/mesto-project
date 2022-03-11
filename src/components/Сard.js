export default class Card {
  constructor(card, handleCardClick, handleDeleteClick, handleLikeClick, userId, selector) {
    this.link = card.link;
    this.name = card.name;
    this._id = card._id;
    this._ownerId = card.owner._id;
    this._likes = card.likes;
    this._selector = selector;

    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  getCard() {
    this._element = this._getElement();
    const cardImage = this._element.querySelector(".cards__image");
    this._element.querySelector(".cards__title").textContent = this.name;
    cardImage.src = this.link;
    cardImage.alt = this.name;

    if(this._ownerId === this._userId) {
      this._element.prepend(this._createButtonDelete());
    }

    this._likesCard();
    this._setEventListeners();

    return this._element;
  }

  isLiked() {
    return Boolean(this._likes.find(user => user._id === this._userId));
  }

  updateLikes(cardData) {
    this._likes = cardData.likes;
    this._likesCard();
  }

  removeCard() {
    this._element.remove();
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector(".cards__item")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector(".cards__image").addEventListener("click", () => {
      this._handleCardClick(this);
    });

    this._element.querySelector(".cards__like-button").addEventListener("click", () => {
      this._handleLikeClick(this, this._id);
    });

    const deleteBtn = this._element.querySelector(".cards__delete-button");
    if(deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        this._handleDeleteClick(this, this._id);
      });
    }
  }

  _createButtonDelete() {
    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("cards__delete-button");
    buttonDelete.setAttribute("type","button");
    return buttonDelete;
  }

  _likesCard() {
    this._element.querySelector(".cards__like-counter").textContent = this._likes.length;
    const like = this._element.querySelector(".cards__like-button");

    if(this.isLiked()) {
      like.classList.add("cards__like-button_active");  
    } else {
      like.classList.remove("cards__like-button_active");
    }
  }
}
