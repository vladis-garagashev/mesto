import './index.css';
import {
  cardListSelector,
  initialCards,
  options,
  avatarPopupSelector,
  cardPopupSelector,
  profilePopupSelector,
  imagePreviePopupSelector,
  avatarEditButton,
  addCardButton,
  profileEditButton,
  profileNametSelector,
  profileAboutSelector,
  profileAvatarSelector,
  nameInput,
  aboutInput
} from '../utils/constants.js';

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js';

//-----------------------------------

//Инстанцирование экземпляров класса FormValidator
const avatarFormValidator = new FormValidator(options, '.form_type_edit-avatar');
const profileFormValidator = new FormValidator(options, '.form_type_edit-profile');
const addCardFormValidator = new FormValidator(options, '.form_type_add-card');

//-----------------------------------
//Инстанцирование экземпляра класса Api
const api = new Api({
  adress: 'https://mesto.nomoreparties.co',
  token: '12e16369-63c3-45db-b812-aa3f60268f30',
  cohortId: 'cohort-22'
});

api.getUserInfo()
    .then(data => {
      userInfo.setUserAvatar(data);
      userInfo.setUserInfo(data);
    })
    .catch(error => console.log(error));

// Функция создание элемента с карточкой
const createCard = (item) => {
  //Инстанцирование экземпляра класса Card
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        imagePreviePopup.open(item);
      }
    },
     '.template__card'
  );
  const cardElement = card.generateCard();
  return cardElement;
};

//Инстанцирование экземпляра класса Section со стандартными карточками
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      cardList.setItem(createCard(item));
    }
  },
  cardListSelector
);

//-----------------------------------

//Инстанцирование экземпляров класса PopupWithForm
const avatarPopup = new PopupWithForm(
  avatarPopupSelector,
  {
    handleFormSubmit: (formData) => {
    }
  }
);

const profilePopup = new PopupWithForm(
  profilePopupSelector,
  {
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);
    }
  }
);

const addCardPopup = new PopupWithForm(
  cardPopupSelector,
  {
    handleFormSubmit: (formData) => {
      cardList.setItem(createCard(formData));
    }
  }
);

//Инстанцирование экземпляров класса PopupWithImage
const imagePreviePopup = new PopupWithImage(imagePreviePopupSelector);

//-----------------------------------

//Инстанцирование экземпляра класса UserInfo
const userInfo = new UserInfo({profileNametSelector, profileAboutSelector, profileAvatarSelector});

//-----------------------------------

// Отрисовка стандартных карточек
cardList.renderItems();

// Активация валидации форм
avatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Установка слушателей для попапов
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePreviePopup.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  avatarFormValidator.toggleButtonState();
  avatarPopup.open();
})

profileEditButton.addEventListener('click', () => {
  const userInfoValues = userInfo.getUserInfo();
  nameInput.value = userInfoValues.name;
  aboutInput.value = userInfoValues.about;
  profileFormValidator.toggleButtonState();
  profilePopup.open();
});

addCardButton.addEventListener('click', () => {
  addCardFormValidator.toggleButtonState();
  addCardPopup.open();
});


