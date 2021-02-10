// Находим попапы в DOM
const profileEditPopup = document.querySelector('#popupProfile');
const cardPopup = document.querySelector('#popupCard');
const imagePreviePopup = document.querySelector('#popupImagePrevie');

// Находим элементы превью попапа в DOM
const previeImage = imagePreviePopup.querySelector('.figure__image');
const previeCaption = imagePreviePopup.querySelector('.figure__caption');

// Находим кнопки открыть и закрыть в DOM
const profileEditButton = document.querySelector('.button_type_edit');
const addCardButton = document.querySelector('.button_type_add');
const profileEditCloseButton = profileEditPopup.querySelector('.button_type_close');
const addCardCloseButton = cardPopup.querySelector('.button_type_close');
const previeCloseButton = imagePreviePopup.querySelector('.button_type_close')

// Находим форму редактирования профиля и добавления карточек в DOM
const profileEditForm = profileEditPopup.querySelector('.form_type_edit-profile');
const addCardForm = cardPopup.querySelector('.form_type_add-card');

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

// Создаем список дефолтных карточек карточек
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

//------------------------------------------------------------------------------------------------------


//Обработчик создания карточки
function createCard(element) {

  // Клонируем шаблон карточки
  const card = cardTemplate.cloneNode(true);
  const cardHeading = card.querySelector('.card__heading');
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.button_type_like');
  const cardDeleteButton = card.querySelector('.button_type_delete');

  cardHeading.textContent = element.name;
  cardImage.setAttribute('src', element.link);
  cardImage.setAttribute('alt', element.name);

  // Добавляем попап для картинки
  cardImage.addEventListener('click', evt => {

    evt.preventDefault()

    previeImage.setAttribute('src', element.link);
    previeImage.setAttribute('alt', element.name);
    previeCaption.textContent = element.name

    openPopup(imagePreviePopup)

  });

  cardLikeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('button_type_like_active');
  });

  cardDeleteButton.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  return card;

};

//Обработчик добавления карточки
function addCard(massive) {
  cardsList.prepend(...massive.map(createCard));
};

//------------------------------------------------------------------------------------------------------

// Обработчики открытия и закрытия попапов

function openPopup(popup) {
  popup.classList.add('popup_opend');
};

function closePopup(popup) {
  popup.classList.remove('popup_opend');
};

//------------------------------------------------------------------------------------------------------

// Обработчики «отправки» форм

function profileFormSubmitHandler(evt) {

  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditPopup);

};

function cardFormSubmitHandler(evt) {

  evt.preventDefault();

  let cardMassive = [
    {
      name: `${imageNameImput.value}`,
      link: `${imageLinkImput.value}`
    }
  ];

  addCard(cardMassive);
  imageNameImput.value = '';
  imageLinkImput.value = '';
  cardMassive = [];
  closePopup(cardPopup);

};

//------------------------------------------------------------------------------------------------------


// Загружаем дефолтные карточки на страницу
addCard(initialCards);

// Слушатели открытия и закрытия попапа

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profileEditPopup)
});

profileEditCloseButton.addEventListener('click', () => {
  closePopup(profileEditPopup)
});

addCardButton.addEventListener('click', () => {
  openPopup(cardPopup)
});

addCardCloseButton.addEventListener('click', () => {
  closePopup(cardPopup)
});

previeCloseButton.addEventListener('click', () => {
  closePopup(imagePreviePopup)
});

// Слушатели обработчика формы
profileEditForm.addEventListener('submit', profileFormSubmitHandler);
addCardForm.addEventListener('submit', cardFormSubmitHandler);
