// Находим попапы в DOM
const popupContainer = document.querySelector('.popup');
const profileEditPopup = document.querySelector('.popup__container_type_edit-profile');
const addCardPopup = document.querySelector('.popup__container_type_add-card');
const imagePreviePopup = document.querySelector('.popup__container_type_image-previe');

// Находим элементы превью попапа в DOM
let previeImage = imagePreviePopup.querySelector('.figure__image');
let previeCaption = imagePreviePopup.querySelector('.figure__caption');

// Находим кнопки открыть и закрыть в DOM
const profileEditButton = document.querySelector('.button_type_edit');
const addCardButton = document.querySelector('.button_type_add');
const profileEditCloseButton = profileEditPopup.querySelector('.button_type_close');
const addCardCloseButton = addCardPopup.querySelector('.button_type_close');
const previeCloseButton = imagePreviePopup.querySelector('.button_type_close')

// Находим форму редактирования профиля и добавления карточек в DOM
const profileEditForm = profileEditPopup.querySelector('.form_type_edit-profile');
const addCardForm = addCardPopup.querySelector('.form_type_add-card');

// Находим поля формы в DOM
const nameInput = profileEditForm.querySelector('.form__item_element_name');
const jobInput = profileEditForm.querySelector('.form__item_element_job');
const imageNameImput = addCardForm.querySelector('.form__item_element_name');
const imageLinkImput = addCardForm.querySelector('.form__item_element_image-link');

// Выбераем элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Находим контейнер с карточками в DOM
const cardsList = document.querySelector('.cards__list');

// Находим шаблон карточки в DOM
const cardTemplate = document.querySelector('.template__card').content;

//------------------------------------------------------------------------------------------------------

// Добавляем дефолтные карточки
// Создаем список карточек
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

//Обработчик добавления карточки
function addCard(element) {
  // Клонируем шаблон карточки
  const card = cardTemplate.cloneNode(true);
  const cardHeading = card.querySelector('.card__heading');
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.button_type_like');
  const cardDeleteButton = card.querySelector('.button_type_delete');


  cardHeading.textContent = element.name;
  cardImage.setAttribute('src', `${element.link}`);
  cardImage.setAttribute('alt', `${element.name}`);

  // Добавляем попап для картинки
  cardImage.addEventListener('click', evt => {

    evt.preventDefault()

    previeImage.setAttribute('src', `${cardImage.getAttribute('src')}`);
    previeImage.setAttribute('alt', `${cardImage.getAttribute('alt')}`);
    previeCaption.textContent = cardHeading.textContent

    imagePreviePopup.classList.toggle('popup__container_opend');
    popupContainer.classList.toggle('popup_opend');

  });

  cardLikeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('button_type_like_active');
  });

  cardDeleteButton.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  cardsList.prepend(card);

}

// Загружаем дефолтные карточки на страницу
initialCards.forEach(addCard)

//------------------------------------------------------------------------------------------------------

// Обработчик открытия и закрытия попапов

function togglePopup(evt) {

  if (evt.target === profileEditButton) {

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    popupContainer.classList.add('popup_opend');
    profileEditPopup.classList.add('popup__container_opend');

  } else if (evt.target === addCardButton) {
    popupContainer.classList.add('popup_opend');
    addCardPopup.classList.add('popup__container_opend');

  } else {
    popupContainer.classList.remove('popup_opend');
    profileEditPopup.classList.remove('popup__container_opend');
    addCardPopup.classList.remove('popup__container_opend');
    imagePreviePopup.classList.remove('popup__container_opend');

  }

}

//------------------------------------------------------------------------------------------------------

// Обработчик «отправки» формы
function formSubmitHandler(evt) {

  evt.preventDefault();

  if (evt.target === editProfileForm) {

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

  } else if (evt.target === addCardForm) {
    let cardMassive = [
      {
        name: `${imageNameImput.value}`,
        link: `${imageLinkImput.value}`
      }
    ]

    cardMassive.forEach(addCard)

    imageNameImput.value = '';
    imageLinkImput.value = '';
    cardMassive = []

  }

  togglePopup(evt)

}

//------------------------------------------------------------------------------------------------------

// Слушатели открытия и закрытия попапа
profileEditButton.addEventListener('click', togglePopup);
addCardButton.addEventListener('click', togglePopup);
profileEditCloseButton.addEventListener('click', togglePopup);
addCardCloseButton.addEventListener('click', togglePopup);
previeCloseButton.addEventListener('click', togglePopup)
// Слушатели обработчика формы
profileEditForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', formSubmitHandler);
