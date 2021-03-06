import './index.css';
import {
  cardListSelector,
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
  aboutInput,
  deleteCardPopupSelector
} from '../utils/constants.js';

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupDeleteSubmit from '../components/PopupDeleteSubmit.js'
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js';

//-----------------------------------

//Инстанцирование экземпляров класса FormValidator
const avatarFormValidator = new FormValidator(options, '.form_type_edit-avatar');
const profileFormValidator = new FormValidator(options, '.form_type_edit-profile');
const addCardFormValidator = new FormValidator(options, '.form_type_add-card');
const deleteCardFormValidator = new FormValidator(options, '.form_type_delete-card');

//-----------------------------------

// Функция отображения загрузки
const renderLoading = (isLoading, formElement) => {
  const defaultTitle = formElement.querySelector('.form__submit-title');
  const loadingTitle = formElement.querySelector('.form__submit-loading');
  if (isLoading) {
    defaultTitle.style.display = 'none';
    loadingTitle.style.display = 'block';

  } else {
    defaultTitle.style.display = 'block';
    loadingTitle.style.display = 'none';

  };
};

//Инстанцирование экземпляра класса Api
const api = new Api({
  adress: 'https://mesto.nomoreparties.co',
  token: '12e16369-63c3-45db-b812-aa3f60268f30',
  cohortId: 'cohort-22'
});

// Функция создание элемента с карточкой
const createCard = (item) => {
  //Инстанцирование экземпляра класса Card
  const card = new Card({
      data: item,
      userId: 'ee8bdc0bde1f0158b2cac865',
      handleCardClick: () => {
        imagePreviePopup.open(item);
      },
      handleDeleteButtonClick: () => {
        popupDeleteSubmit.setNewFormSumbitHandler(() => {
          api.deleteCard(card.getId())
          .then(() => {
            card.deleteCard();
            popupDeleteSubmit.close();
          })
          .catch(err => console.log(err));
        })
        popupDeleteSubmit.open()
      },
      handleLikeClick: (isLiked) => {
        if(isLiked) {
          api.removeLikeCard(card.getId())
            .then(data => card.likeCard(data))
            .catch(error => console.log(error));
        } else {
          api.likeCard(card.getId())
            .then(data => card.likeCard(data))
            .catch(error => console.log(error));
        };
      }
    },
     '.template__card'
  );
  const cardElement = card.generateCard();
  return cardElement;
};

//Инстанцирование экземпляра класса Section
const cardList = new Section({
    renderer: (item) => {
      cardList.setItem(createCard(item));
    }
  },
  cardListSelector
);

//-----------------------------------

//Инстанцирование экземпляров класса PopupWithForm
const avatarPopup = new PopupWithForm(
  avatarPopupSelector, {
    handleFormSubmit: (formData) => {
      renderLoading(true, avatarPopup.getFormn());
      api.editUserAvatar(formData)
        .then(data => {
          userInfo.setUserInfo(data);
          avatarPopup.close();
        })
        .catch(error => {console.log(error)})
        .finally(() => {
          renderLoading(false, avatarPopup.getFormn());
        });
    }
  }
);

const profilePopup = new PopupWithForm(
  profilePopupSelector, {
    handleFormSubmit: (formData) => {
      renderLoading(true, profilePopup.getFormn());
      api.editUserInfo(formData)
        .then(data => {
          userInfo.setUserInfo(data);
          profilePopup.close();
        })
        .catch(error => console.log(error))
        .finally(() => {
          renderLoading(false, profilePopup.getFormn());
        });
    }
  }
);

const addCardPopup = new PopupWithForm(
  cardPopupSelector, {
    handleFormSubmit: (formData) => {
      renderLoading(true, addCardPopup.getFormn());
      api.addCard(formData)
        .then(card => {
          cardList.setItem(createCard(card));
          addCardPopup.close();
        })
        .catch(error => console.log(error))
        .finally(() => {
          renderLoading(false, addCardPopup.getFormn());
        });
    }
  }
);

const popupDeleteSubmit = new PopupDeleteSubmit(
  deleteCardPopupSelector, {
    handleFormSubmit: () => {

    }
  }
)

//Инстанцирование экземпляров класса PopupWithImage
const imagePreviePopup = new PopupWithImage(imagePreviePopupSelector);

//-----------------------------------

//Инстанцирование экземпляра класса UserInfo
const userInfo = new UserInfo({
  profileNametSelector,
  profileAboutSelector,
  profileAvatarSelector
});

//-----------------------------------

// Получаем информацию о пользователе и стандартные карточки
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);
  })
  .catch(error => console.log(error));

// Активация валидации форм
avatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
deleteCardFormValidator.enableValidation();

// Установка слушателей для попапов
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePreviePopup.setEventListeners();
popupDeleteSubmit.setEventListeners();

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

