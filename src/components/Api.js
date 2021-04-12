export default class Api {
  constructor({adress, token, cohortId}) {
    this._adress = adress;
    this._token = token;
    this._cohortId = cohortId;
  };

  // Функция обработки ответа промиса
  _handleResponse(res)  {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // Функция получения информации о пользователе
  getUserInfo() {
    return fetch(`${this._adress}/v1/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._handleResponse(res));
  };

  // Функция редактирования аватара пользователя
  editUserAvatar(data) {
    return fetch(`${this._adress}/v1/${this._cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(res => this._handleResponse(res));
  };

  // Функция редактирования информации о пользователе
  editUserInfo(data) {
    return fetch(`${this._adress}/v1/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._handleResponse(res));
  };

  // Функция получения стандартных карточек
  getInitialCards() {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._handleResponse(res));
  };

  // Функция добавления новой карточки
  addCard(data) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._handleResponse(res));
  };

  // Функция проставки лайка для карточки
  likeCard(id) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._handleResponse(res));
  };

  // Функция удаления лайка у карточки
  removeLikeCard(id) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._handleResponse(res));
  };

  // Функция удаления карточки
  deleteCard(id) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._handleResponse(res));
  };

};
