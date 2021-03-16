const popupElement = document.querySelector('#popupImagePrevie');
const popupImage = document.querySelector('.figure__image');
const popupCaption = document.querySelector('.figure__caption');

import {openPopup} from './index.js';

export class Card {
  constructor(data) {
    this._name = data.name;
    this._image = data.link;
  };

  _getTemplate() {
    const cardElement = document.querySelector('.template__card').content.querySelector('.card').cloneNode(true);
    return cardElement;
  };

  _handleOpenPopup() {
    popupImage.src = this._image;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupElement)
  };

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup()
    });

  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src =  this._image;
    this._element.querySelector('.card__image').alt =  this._name;
    this._element.querySelector('.card__heading').textContent = this._name;

    return this._element;
  };

};
