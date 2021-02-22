// Функция отображения ошибки поля
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__item-error_visible');
  inputElement.classList.add('form__item_type_error');
};

// Функция скрытия ошибки поля
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove('form__item-error_visible');
  inputElement.classList.remove('form__item_type_error');
};

//------------------------------------------------------------------------------------------------------

// Функция проверки вадилности полей
const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  // Переключаем сообщения с ошибкой
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage);

  } else {
    hideInputError(formElement, inputElement);
  };
};

//------------------------------------------------------------------------------------------------------

//Функция переключения состояния кнопки отправки формы
const toggleButtonState = (inputList, buttonElement) => {

  // Проверяем поля на валидность
  const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);

  // Переключаем состояние кнопки
  if(hasInvalidInput) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('form__submit-button_disabled');

  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('form__submit-button_disabled');
  };
};

//------------------------------------------------------------------------------------------------------

// Функция добавления слушателей для формы
const setEventListeners = (formElement) => {

  // Находим поля формы
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  // Находим кнопку отправки формы
  const buttonElement = formElement.querySelector('.form__submit-button');

  if (!formElement.classList.contains('form_type_edit-profile')) {
    toggleButtonState(inputList, buttonElement);
  }

  // Добавляем слушатель для каждого поля формы
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//------------------------------------------------------------------------------------------------------

// Фушкция валидации форм
const enableValidation = () => {

  // Находим все формы
  const formList = Array.from(document.querySelectorAll('.form'));

  // Добавляем слушатели для каждой формы
  formList.forEach(formElement => {

    // Отменяем стандартную отправку формы
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });

    setEventListeners(formElement);
  });
};

//------------------------------------------------------------------------------------------------------

// Вызов функции валидации форм
enableValidation();
