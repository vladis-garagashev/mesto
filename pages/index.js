import {
  cardListSelector,
  initialCards,
  options,
  cardPopupSelector,
  profilePopupSelector,
  imagePreviePopupSelector,
  addCardButton,
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
      //Инстанцирование экземпляра класса Section
      const cardList = new Section(
        {
          data: [formData],
          renderer: (item) => {
            //Инстанцирование экземпляра класса Card
            const card = new Card(
              {
                data: item,
                handleCardClick: () => {
                  imagePreviePopup.open(item)
                }
              },
               '.template__card'
            );
            const cardElement = card.generateCard();
            cardList.setItem(cardElement);
          }
        },
        cardListSelector
      );
      // отрисовка карточки
      cardList.renderItems();
    }
  }
);

const imagePreviePopup = new PopupWithImage(imagePreviePopupSelector)

//-----------------------------------

//Инстанцирование экземпляра класса Section со стандартными карточками
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      //Инстанцирование экземпляра класса Card
      const card = new Card(
        {
          data: item,
          handleCardClick: () => {
            imagePreviePopup.open(item)
          }
        },
         '.template__card'
      );
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

// Отрисовка стандартных карточек
cardList.renderItems();

// Активация валидации форм
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Установка слушателей для попапов
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePreviePopup.setEventListeners();

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
