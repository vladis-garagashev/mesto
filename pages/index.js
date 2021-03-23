
//-----------------------------------
/*
// Функция добавления карточки
function addCard(massive) {
  massive.forEach(function (item) {

    const card = new Card(item, '.template__card');
    const cardElement = card.generateCard();
    cardList.prepend(cardElement);

  });
}; */

//-----------------------------------

// Функции открытия и закрытия попапов
/*
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
  if (evt.key === escapeKey) {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  };
}; */

//-----------------------------------

// Функция «отправки» форм
/*
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
  addCardFormValidator.toggleButtonState();
  closePopup(cardPopup);

}; */



// Загружаем дефолтные карточки на страницу
/* addCard(initialCards); */

// Слушатели открытия попапа
/*
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profileEditPopup);
});

addCardButton.addEventListener('click', () => {
  openPopup(cardPopup);
}); */

// Слушатель закрытия попапа
/*
popupList.forEach(popup => {

  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
    };
  });

  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('button_type_close')) {
        closePopup(popup);
    };
  });
}); */

// Слушатели обработчика формы
/* profileEditForm.addEventListener('submit', profileFormSubmitHandler);
addCardForm.addEventListener('submit', cardFormSubmitHandler); */

//-----------------------------------

import {
  cardListSelector,
  initialCards,
  options
} from '../utils/constants.js'

//-----------------------------------
import FormValidator from '../components/FormValidator.js';
//Инстанцирование экземпляров класса FormValidator
const profileFormValidator = new FormValidator(options, '.form_type_edit-profile');
const addCardFormValidator = new FormValidator(options, '.form_type_add-card');

// Активируем валидацию форм

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
//-----------------------------------

import Section from '../components/Section.js';
import Card from '../components/Card.js';

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template__card');
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
},
cardListSelector
);

cardList.renderItems();

//-----------------------------------
