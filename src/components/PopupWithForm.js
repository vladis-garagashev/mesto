import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.form__item');
  };

  getFormn() {
    return this._form;
  };

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  };

  close() {
    this._form.reset();
    super.close();
  };

  setEventListeners() {
    super.setEventListeners();


    this._form.addEventListener('submit', evt => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      this.close();
    });
  };
};
