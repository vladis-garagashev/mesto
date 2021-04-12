export default class Api {
  constructor({adress, token, cohortId}) {
    this._adress = adress;
    this._token = token;
    this._cohortId = cohortId;
  };

  getUserInfo() {
    return fetch(`${this._adress}/v1/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(response => response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`));
  };

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
    .then(response => response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`));
  };

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
    .then(response => response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`));
  };

  getInitialCards() {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(response => response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`));
  };

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
    .then(response => response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`));
  };

  likeCard(id) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(response => response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`));
  };

  removeLikeCard(id) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(response => response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`));
  };

  deleteCard(id) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(response => response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`));

  }

};
