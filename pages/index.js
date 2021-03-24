
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

//-----------------------------------

import {
  cardListSelector,
  initialCards,
  options,
  cardPopupSelector,
  addCardButton,
  profilePopupSelector,
  profileEditButton,
  profileNametSelector,
  profileJobtSelector,
  nameInput,
  jobInput
} from '../utils/constants.js'

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js';

//-----------------------------------
//Инстанцирование экземпляров класса FormValidator
const profileFormValidator = new FormValidator(options, '.form_type_edit-profile');
const addCardFormValidator = new FormValidator(options, '.form_type_add-card');

//-----------------------------------
//Инстанцирование экземпляра класса Section со стандартными карточками
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.template__card');
      const cardElement = card.generateCard();
      cardList.setItem(cardElement);
    }
  },
  cardListSelector
);

//-----------------------------------
//Инстанцирование экземпляра класса UserInfo
const userInfo = new UserInfo({profileNametSelector, profileJobtSelector});

//-----------------------------------
//Инстанцирование экземпляров класса PopupWithForm
const profilePopup = new PopupWithForm(
  profilePopupSelector,
  {
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData)

    }
  }
);

const addCardPopup = new PopupWithForm(
  cardPopupSelector,
  {
    handleFormSubmit: (formData) => {
      const cardList = new Section(
        {
          data: [formData],
          renderer: (item) => {
            const card = new Card(item, '.template__card');
            const cardElement = card.generateCard();
            cardList.setItem(cardElement);
          }
        },
        cardListSelector
      );
      cardList.renderItems();
    }
  }
);

//-----------------------------------

// Отрисовка карточек
cardList.renderItems();

// Активация валидации форм
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Установка слушателей для попапов
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userInfoValues = userInfo.getUserInfo();
  nameInput.value = userInfoValues.name;
  jobInput.value = userInfoValues.job;
  profileFormValidator.toggleButtonState()
  profilePopup.open();
});

addCardButton.addEventListener('click', () => {
  addCardPopup.open();
});
