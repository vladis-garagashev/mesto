import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

  }

  open(item) {
    this._cardImage = item.link
    this._cardHeading = item.name

    this._popupImage = this._popup.querySelector('.figure__image');
    this._popupCaption = this._popup.querySelector('.figure__caption');

    this._popupImage.src = this._cardImage;
    this._popupImage.alt = this._cardHeading;
    this._popupCaption.textContent = this._cardHeading;
    super.open()
  }
}
