// Ипортируем классы карточки и валидации форм
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

// Находим попапы в DOM
const popupList = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('#popupProfile');
const cardPopup = document.querySelector('#popupCard');

// Находим кнопки открыть попап в DOM
const profileEditButton = document.querySelector('.button_type_edit');
const addCardButton = document.querySelector('.button_type_add');

// Находим форму редактирования профиля и добавления карточек в DOM
const profileEditForm = document.forms.editProfileForm;
const addCardForm = document.forms.addCardForm;

// Находим поля формы в DOM
const nameInput = profileEditForm.querySelector('.form__item_element_name');
const jobInput = profileEditForm.querySelector('.form__item_element_job');;
const imageNameInput = addCardForm.querySelector('.form__item_element_name');;
const imageLinkInput = addCardForm.querySelector('.form__item_element_image-link');;

// Выбераем элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Находим контейнер с карточками в DOM
const cardList = document.querySelector('.cards__list');

// Создаем список дефолтных карточек карточек
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];

// Настройки с селекторами и классами форм
const options = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_visible'
};

//------------------------------------------------------------------------------------------------------

// Функция добавления карточки
function addCard(massive) {
  massive.forEach(function (item) {

    const card = new Card(item);
    const cardElement = card.generateCard();
    cardList.prepend(cardElement);

  });
};

//------------------------------------------------------------------------------------------------------

// Функция инициализации валидации формы
function initValidation(formSelector) {
  const formValidator = new FormValidator(options, formSelector);
  formValidator.enableValidation();
};

//------------------------------------------------------------------------------------------------------

// Функции открытия и закрытия попапов

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// Функция закрытия попапа по клавише Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  };
};

//------------------------------------------------------------------------------------------------------

// Функция «отправки» форм

function profileFormSubmitHandler(evt) {

  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditPopup);

};

function cardFormSubmitHandler(evt) {

  evt.preventDefault();

  const card = [
    {
      name: `${imageNameInput.value}`,
      link: `${imageLinkInput.value}`
    }
  ];

  addCard(card);
  addCardForm.reset();
  closePopup(cardPopup);

};

//------------------------------------------------------------------------------------------------------

// Инициализируем валидация форм
initValidation('.form_type_edit-profile');
initValidation('.form_type_add-card');

// Загружаем дефолтные карточки на страницу
addCard(initialCards);

// Слушатели открытия попапа

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profileEditPopup);
});

addCardButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

// Слушатель закрытия попапа

popupList.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('button_type_close')) {
        closePopup(popup);
    };
  });
});

// Слушатели обработчика формы
profileEditForm.addEventListener('submit', profileFormSubmitHandler);
addCardForm.addEventListener('submit', cardFormSubmitHandler);


cardList.addEventListener('click', (evt) => {
  // Слушатель проставки лайков карточкам
  if (evt.target.classList.contains('button_type_like')) {
    evt.target.classList.toggle('button_type_like_active');
  };
  // Слушатель удаления карточки
  if (evt.target.classList.contains('button_type_delete')) {
    evt.target.closest('.card').remove();
  };
});
