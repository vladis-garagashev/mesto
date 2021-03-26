export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);

  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(evt) {
    const escapeKey = 'Escape';
    if (evt.key === escapeKey) {
      this.close();
    };
  };

  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target === evt.currentTarget) {
          this.close();
      };
    });

    this._popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('button_type_close')) {
        this.close();
      };
    });

  };


};
