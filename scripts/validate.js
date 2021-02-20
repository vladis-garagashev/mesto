




function enableValidation() {

  // Находим все формы
  const formList = Array.from(document.querySelectorAll('.form'))

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) {
      evt.preventDefault();
    });
  });

};

enableValidation()
