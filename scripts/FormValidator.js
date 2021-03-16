export class FormValidator {
  constructor(selectors, formSelector) {
    this._inputSelector = selectors.inputSelector;
    this._submitButton = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._formSelector = formSelector;

  };

  //------------------------------------------------------------------------------------------------------

  // Функция получения элемента формы
  _getForm() {
    const formElement = document.querySelector(this._formSelector);
    return formElement;
  }

  //------------------------------------------------------------------------------------------------------

  // Функция отображения ошибки поля
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);

    inputElement.classList.add(this._inputErrorClass);
  }

  // Функция скрытия ошибки поля
  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);

    inputElement.classList.remove(this._inputErrorClass);
  }

  //------------------------------------------------------------------------------------------------------

  // Функция проверки вадилности полей
  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;

    // Переключаем сообщения с ошибкой
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);

    } else {
      this._hideInputError(inputElement);
    };

  };

  //------------------------------------------------------------------------------------------------------

  //Функция переключения состояния кнопки отправки формы
  _toggleButtonState(inputList, buttonElement) {

    // Проверяем поля на валидность
    const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);

    // Переключаем состояние кнопки
    if(hasInvalidInput) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveButtonClass);

    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    };

  };

  //------------------------------------------------------------------------------------------------------

  // Функция добавления слушателей для формы
  _setEventListeners() {

    this._element = this._getForm();
    this._element.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    // Находим поля формы
    const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
    // Находим кнопку отправки формы
    const buttonElement = this._element.querySelector(this._submitButton);

    this._toggleButtonState(inputList, buttonElement);

    // Добавляем слушатель для каждого поля формы
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);

      });
    });

  };

  //------------------------------------------------------------------------------------------------------

  enableValidation() {
    this._setEventListeners()
  };
};
