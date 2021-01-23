// Находим попап в DOM
let popup = document.querySelector('.popup');
// Находим кнопки открыть и закрыть в DOM
let popupOpenButton = document.querySelector('.button_type_edit');
let popupCloseButton = popup.querySelector('.form__button_type_close');
// Находим форму в DOM
let formElement = document.querySelector('.form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_job');
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job');
// Вставляем старые значения в инпуты
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

// Обработчик открытия и закрытия попапа
function togglePopup() {
  if (popup.classList.contains('popup_opend') === false) {
    popup.classList.add('popup_opend');

  } else {
    popup.classList.remove('popup_opend');

  }
}

// Обработчик закрытия попапа при
// клике на оверлей
function closePopup(evt) {
  if (evt.target === evt.currentTarget) {
    togglePopup();
  }
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  // Закрывыем попап
  togglePopup();

}

// Слушатели открытия и закрытия попапа
popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
popup.addEventListener('click', closePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);




