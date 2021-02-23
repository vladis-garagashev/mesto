// Находим попапы в DOM
const popupList = document.querySelectorAll('.popup')
const profileEditPopup = document.querySelector('#popupProfile');
const cardPopup = document.querySelector('#popupCard');
const imagePreviePopup = document.querySelector('#popupImagePrevie');

// Находим элементы превью попапа в DOM
const previeImage = imagePreviePopup.querySelector('.figure__image');
const previeCaption = imagePreviePopup.querySelector('.figure__caption');

// Находим кнопки открыть попап  в DOM
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

  return card;

};

//Обработчик добавления карточки
function addCard(massive) {
  cardsList.prepend(...massive.map(createCard));
};

//------------------------------------------------------------------------------------------------------

// Обработчики открытия и закрытия попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// Обработчик закрытия попапа по клавише Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  };
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

  const cardMassive = [
    {
      name: `${imageNameInput.value}`,
      link: `${imageLinkInput.value}`
    }
  ];

  addCard(cardMassive);
  addCardForm.reset();
  closePopup(cardPopup);

};

//------------------------------------------------------------------------------------------------------


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
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('button_type_close') ) {
        closePopup(popup)
    };
  });
});

// Слушатели обработчика формы
profileEditForm.addEventListener('submit', profileFormSubmitHandler);
addCardForm.addEventListener('submit', cardFormSubmitHandler);

// Слушатель проставки лайков карточкам

cardsList.addEventListener('click', (evt) => {

  // Слушатель проставки лайков карточкам
  if (evt.target.classList.contains('button_type_like')) {
    evt.target.classList.toggle('button_type_like_active');
  };

  // Слушатель удаления карточки
  if (evt.target.classList.contains('button_type_delete')) {
    evt.target.closest('.card').remove();
  };
});
