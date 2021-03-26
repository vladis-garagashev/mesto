import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.figure__image');
    this._popupCaption = this._popup.querySelector('.figure__caption');

  };

  open(item) {
    this._popupImage.src = item.link;
    this._popupImage.alt = item.name;
    this._popupCaption.textContent = item.name;
    super.open();
  };
};
