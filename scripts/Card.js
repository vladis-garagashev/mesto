import {imagePreviePopup, previeImage, previeCaption} from './utils.js';

//-----------------------------------

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  };

  //-----------------------------------

  // Функция получения элемента карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
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
      this._element.remove();
      this._element = '';
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

    this._element.addEventListener('click', evt => {
      this._deleteCard(evt);
      this._likeCard(evt);
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup()
    });

  };

  //-----------------------------------

  // Функция создания карточки
  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector('.card__image');
    const cardHeading = this._element.querySelector('.card__heading');
    cardImage.src =  this._image;
    cardImage.alt =  this._name;
    cardHeading.textContent = this._name;
    this._setEventListeners();

    return this._element;
  };

};
