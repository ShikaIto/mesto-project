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
    this._deleteBtn = this._element.querySelector(".cards__delete-button");
    this._cardImage = this._element.querySelector(".cards__image");
    this._likeBtn = this._element.querySelector(".cards__like-button");
    this._likeCounter = this._element.querySelector(".cards__like-counter");

    this._element.querySelector(".cards__title").textContent = this.name;
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;

    if(this._ownerId !== this._userId) {
      this._deleteBtn.remove();
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
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this);
    });

    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick(this, this._id);
    });

    if(this._deleteBtn) {
      this._deleteBtn.addEventListener("click", () => {
        this._handleDeleteClick(this, this._id);
      });
    }
  }

  _likesCard() {
    this._likeCounter.textContent = this._likes.length;

    if(this.isLiked()) {
      this._likeBtn.classList.add("cards__like-button_active");  
    } else {
      this._likeBtn.classList.remove("cards__like-button_active");
    }
  }
}
