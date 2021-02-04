// Находим попап в DOM
let popup = document.querySelector('.popup');
// Находим кнопки открыть и закрыть в DOM
let popupOpenButton = document.querySelector('.button_type_edit');
let popupCloseButton = popup.querySelector('.form__button_type_close');
// Находим форму в DOM
let formElement = document.querySelector('.form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__item_element_name');
let jobInput = formElement.querySelector('.form__item_element_job');
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job');

// Обработчик открытия и закрытия попапа
function togglePopup() {

  if (!popup.classList.contains('popup_opend')) {
    // Вставляем старые значения в инпуты
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    popup.classList.add('popup_opend');

  } else {
    popup.classList.remove('popup_opend');

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
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// Добавляем дефолтные карточки
// Находим контейнер с карточками в DOM
const cardsList = document.querySelector('.cards__list');
// Находим шаблон карточки в DOM
const cardTemplate = document.querySelector('.template-card').content;
// Создаем список дефолтных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// Загружаем карточки на страницу
initialCards.forEach(function (element) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.card__image').setAttribute('style', `background-image: url(${element.link})`);
  card.querySelector('.card__heading').textContent = element.name;

  card.querySelector('.button_type_like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('button_type_like_active');
  })

  card.querySelector('.button_type_delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });

  cardsList.append(card);
})



