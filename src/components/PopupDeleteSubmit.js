import PopupWithForm from './PopupWithForm'

export default class PopupDeleteSubmit extends PopupWithForm {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector, {handleFormSubmit});

  }

  setNewFormSumbitHandler(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }
}
