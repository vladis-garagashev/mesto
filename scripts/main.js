// Находим попапы в DOM
const popupContainer = document.querySelector('.popup');
const profileEditPopup = document.querySelector('.popup__container_type_edit-profile');
const addCardPopup = document.querySelector('.popup__container_type_add-card');

// Находим кнопки открыть и закрыть в DOM
const profileEditButton = document.querySelector('.button_type_edit');
const profileEditCloseButton = profileEditPopup.querySelector('.button_type_close');
const addCardButton = document.querySelector('.button_type_add');
const addCardCloseButton = addCardPopup.querySelector('.button_type_close');

// Находим форму редактирования профиля и добавления карточек в DOM
const profileEditForm = profileEditPopup.querySelector('.form_type_edit-profile');
const addCardForm = addCardPopup.querySelector('.form_type_add-card');

// Находим поля формы в DOM
const nameInput = profileEditForm.querySelector('.form__item_element_name');
const jobInput = profileEditForm.querySelector('.form__item_element_job');
const imageNameImput = addCardForm.querySelector('.form__item_element_name');
const imageLinkImput = addCardForm.querySelector('.form__item_element_image-link');

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Находим контейнер с карточками в DOM
const cardsList = document.querySelector('.cards__list');


// Находим шаблон карточки в DOM
const cardTemplate = document.querySelector('.template__card').content;

// Находим шаблон попапа картинки в DOM
const galereyPopupTemplate = document.querySelector('.template__image-galerey').content;

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
  cardImage.setAttribute('style', `background-image: url(${element.link})`);

  // Добавляем попап для картинки
  cardImage.addEventListener('click', evt => {

    evt.preventDefault()
    // Клонируем шаблон с попапом
    const galereyPopup = galereyPopupTemplate.cloneNode(true);
    const closePopup = galereyPopup.querySelector('.button_type_close');
    const popupImage = galereyPopup.querySelector('.figure__image');
    const popupCaption = galereyPopup.querySelector('.figure__caption');

    popupContainer.classList.toggle('popup_opend');

    popupImage.setAttribute('style', `${cardImage.getAttribute('style')}`);
    popupCaption.textContent = cardHeading.textContent

    closePopup.addEventListener('click', evt => {
      evt.target.closest('.popup__container').remove();
      popupContainer.classList.toggle('popup_opend');
    })

    popupContainer.append(galereyPopup);
  })

  cardLikeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('button_type_like_active');
  })

  cardDeleteButton.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  cardsList.prepend(card);

}

// Загружаем дефолтные карточки на страницу
initialCards.forEach(addCard)

//------------------------------------------------------------------------------------------------------

// Обработчик открытия и закрытия редактора профиля
function profileEditTogglePopup() {

  if (!profileEditPopup.classList.contains('popup_opend')) {

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    popupContainer.classList.toggle('popup_opend');
    profileEditPopup.classList.toggle('popup_opend');

  } else {
    popupContainer.classList.toggle('popup_opend');
    profileEditPopup.classList.toggle('popup_opend');

  }
}

// Обработчик открытия и закрытия добавления карточек
function addCardTogglePopup() {

  popupContainer.classList.toggle('popup_opend');
  addCardPopup.classList.toggle('popup_opend');

}

//------------------------------------------------------------------------------------------------------

// Обработчик «отправки» формы
function formSubmitHandler(evt) {

  evt.preventDefault();

  if (evt.target === editProfileForm) {

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    profileEditTogglePopup()

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

    addCardTogglePopup()

  }

}

//------------------------------------------------------------------------------------------------------

// Слушатели открытия и закрытия попапа
profileEditButton.addEventListener('click', profileEditTogglePopup);
profileEditCloseButton.addEventListener('click', profileEditTogglePopup);
addCardButton.addEventListener('click', addCardTogglePopup);
addCardCloseButton.addEventListener('click', addCardTogglePopup);
// Слушатели обработчика формы
profileEditForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', formSubmitHandler);





