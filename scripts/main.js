let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.button_type_edit');
let popupCloseButton = popup.querySelector('.form__button_type_close');

let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let formName = popup.querySelector('.form__item_el_name');
let formJob = popup.querySelector('.form__item_el_job');

let popupSubmitButton = popup.querySelector('.form__button_type_submit');

function togglePopup() {
  popup.classList.toggle('popup_opend');
  formName.value = profileName.textContent
  formJob.value = profileJob.textContent

}

function closePopup(evt) {
  if (evt.target === evt.currentTarget) {
    togglePopup();
  }
}

popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
popup.addEventListener('click', closePopup);

function submitButton(evt) {
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  evt.preventDefault();
  togglePopup();

}

popupSubmitButton.addEventListener('click', submitButton);


