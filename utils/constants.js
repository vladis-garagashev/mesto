
// Находим попапы в DOM
/* export const popupList = document.querySelectorAll('.popup');
export const profileEditPopup = document.querySelector('#popupProfile');
export const cardPopup = document.querySelector('#popupCard'); */

export const cardPopupSelector = '#popupCard';
export const profilePopupSelector = '#popupProfile';

// Находим кнопки открыть попап в DOM
export const profileEditButton = document.querySelector('.button_type_edit');
export const addCardButton = document.querySelector('.button_type_add');

// Находим форму редактирования профиля и добавления карточек в DOM
/* export const profileEditForm = document.forms.editProfileForm;
export const addCardForm = document.forms.addCardForm; */

// Находим поля формы в DOM
/* export const nameInput = profileEditForm.querySelector('.form__item_element_name');
export const jobInput = profileEditForm.querySelector('.form__item_element_job');;
export const imageNameInput = addCardForm.querySelector('.form__item_element_name');;
export const imageLinkInput = addCardForm.querySelector('.form__item_element_image-link');; */

// Выбераем элементы, куда должны быть вставлены значения полей
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

// Находим контейнер с карточками в DOM
/* export const cardList = document.querySelector('.cards__list'); */
export const cardListSelector = '.cards__list';

// Находим попап карточки и его элементы
export const imagePreviePopup = document.querySelector('#popupImagePrevie');
export const previeImage = imagePreviePopup.querySelector('.figure__image');
export const previeCaption = imagePreviePopup.querySelector('.figure__caption');

// Создаем список дефолтных карточек карточек
export const initialCards = [
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
export const options = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_visible'
};

export const escapeKey = 'Escape';

