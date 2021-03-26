export default class FormValidator {
  constructor(selectors, formSelector) {
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._formElement = document.querySelector(formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(selectors.inputSelector));
    this._buttonElement = this._formElement.querySelector(selectors.submitButtonSelector);
  };

  //-----------------------------------

  // Функция отображения ошибки поля
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);

    inputElement.classList.add(this._inputErrorClass);
  };

  // Функция скрытия ошибки поля
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);

    inputElement.classList.remove(this._inputErrorClass);
  };

  //-----------------------------------

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

  //-----------------------------------

  //Функция переключения состояния кнопки отправки формы
  toggleButtonState() {

    // Проверяем поля на валидность
    const hasInvalidInput = this._inputList.some(inputElement => !inputElement.validity.valid);

    // Переключаем состояние кнопки
    if(hasInvalidInput) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);

    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    };

  };

  //-----------------------------------

  // Функция добавления слушателей для формы
  _setEventListeners() {

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._formElement.addEventListener('reset', () => {
      this._inputList.forEach(inputElement => {
          this._hideInputError(inputElement);
          this.toggleButtonState();
      })
  });

    this.toggleButtonState();

    // Добавляем слушатель для каждого поля формы
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });

  };

  //-----------------------------------

  // Функция активвации валидации
  enableValidation() {
    this._setEventListeners()
  };
};
