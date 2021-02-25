// Функция отображения ошибки поля
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
  inputElement.classList.add(settings.inputErrorClass);
};

// Функция скрытия ошибки поля
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
  inputElement.classList.remove(settings.inputErrorClass);
};

//------------------------------------------------------------------------------------------------------

// Функция проверки вадилности полей
const checkInputValidity = (formElement, inputElement, settings) => {
  const isInputNotValid = !inputElement.validity.valid;

  // Переключаем сообщения с ошибкой
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, settings);

  } else {
    hideInputError(formElement, inputElement, settings);
  };
};

//------------------------------------------------------------------------------------------------------

//Функция переключения состояния кнопки отправки формы
const toggleButtonState = (inputList, buttonElement, settings) => {

  // Проверяем поля на валидность
  const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);

  // Переключаем состояние кнопки
  if(hasInvalidInput) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settings.inactiveButtonClass);

  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(settings.inactiveButtonClass);
  };
};

//------------------------------------------------------------------------------------------------------

// Функция добавления слушателей для формы
const setEventListeners = (formElement, settings) => {
  // Находим поля формы
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  // Находим кнопку отправки формы
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  // Добавляем слушатель для каждого поля формы
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

//------------------------------------------------------------------------------------------------------

// Фушкция валидации форм
const enableValidation = (settings) => {
  // Находим все формы
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  // Добавляем слушатели для каждой формы
  formList.forEach(formElement => {

    // Отменяем стандартную отправку формы
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });

    setEventListeners(formElement, settings);
  });
};

//------------------------------------------------------------------------------------------------------

// Вызов функции валидации форм
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_visible'
});
