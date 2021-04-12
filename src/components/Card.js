export default class Card {
  constructor({data, handleCardClick, handleDeleteButtonClick, handleLikeClick}, templateSelector) {
    this._name = data.name;
    this._image = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._isLiked = false;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
  };

  //-----------------------------------

  // Функция получения элемента карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  };

  //-----------------------------------

  // Функция получения id карточки
  getId() {
    return this._id
  }
  //-----------------------------------

  // Функция открытия попапа
  _handleOpenPopup() {
    this._handleCardClick(this._element);
  };

  //-----------------------------------

  // Функция удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = '';
  };

  //-----------------------------------

  // Функция проставки лайков карточкам
  likeCard(data) {
    this._cardLikeButton.classList.toggle('button_type_like_active');
    this._cardLikeCounter.textContent = data.likes.length;
  };

  //-----------------------------------

  // Функция добавления слушателей
  _setEventListeners() {

    this._deleteCardButton.addEventListener('click', () => {
      this._handleDeleteButtonClick()
    });

    this._cardLikeButton.addEventListener('click', () => {
      this._isLiked = !this._isLiked;
      this._handleLikeClick(this._isLiked)
    })

    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup()
    });

    this._likes.forEach(user => {
      if(user._id === 'ee8bdc0bde1f0158b2cac865') {
        this._isLiked = !this._isLiked;
        this._cardLikeButton.classList.add('button_type_like_active');
      }
    });

  };

  //-----------------------------------

  // Функция создания карточки
  generateCard() {
    this._element = this._getTemplate();

    this._deleteCardButton = this._element.querySelector('.button_type_delete')
    this._cardLikeButton = this._element.querySelector('.button_type_like')
    this._cardImage = this._element.querySelector('.card__image');
    this._cardHeading = this._element.querySelector('.card__heading');
    this._cardLikeCounter = this._element.querySelector('.card__likes-counter');

    this._cardImage.src =  this._image;
    this._cardImage.alt =  this._name;
    this._cardHeading.textContent = this._name;
    this._cardLikeCounter.textContent = this._likes.length;
    if (this._owner._id != 'ee8bdc0bde1f0158b2cac865') {
      this._deleteCardButton.remove()
    }
    this._setEventListeners();

    return this._element;
  };

};
