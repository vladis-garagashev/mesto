import {imagePreviePopup, previeImage, previeCaption} from './utils.js';

//-----------------------------------

export class Card {
  constructor(data) {
    this._name = data.name;
    this._image = data.link;
    this._cardElement = document.querySelector('.template__card').content.querySelector('.card').cloneNode(true);

  };

  //-----------------------------------

  // Функция открытия попапа
  _handleOpenPopup() {
    previeImage.src = this._image;
    previeImage.alt = this._name;
    previeCaption.textContent = this._name;
    imagePreviePopup.classList.add('popup_opened');
  };

  //-----------------------------------

  // Функция удаления карточки
  _deleteCard(evt) {
    if (evt.target.classList.contains('button_type_delete')) {
      evt.target.closest('.card').remove();
    };
  };

  //-----------------------------------

  // Функция проставки лайков карточкам
  _likeCard(evt) {
    if (evt.target.classList.contains('button_type_like')) {
      evt.target.classList.toggle('button_type_like_active');
    };
  };

  //-----------------------------------

  // Функция добавления слушателей
  _setEventListeners() {

    this._cardElement.addEventListener('click', evt => {
      this._deleteCard(evt);
      this._likeCard(evt);
    });

    this._cardElement.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup()
    });

  };

  //-----------------------------------

  // Функция создания карточки
  generateCard() {

    const cardImage = this._cardElement.querySelector('.card__image');
    const cardHeading = this._cardElement.querySelector('.card__heading');
    cardImage.src =  this._image;
    cardImage.alt =  this._name;
    cardHeading.textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  };

};
