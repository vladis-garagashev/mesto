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
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${responce.status}`)
    });
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
    .then(responce => {
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(`Ошибка ${responce.status}`)
    });
  };

  getInitialCards() {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(responce => {
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(`Ошибка ${responce.status}`);
    });
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
    .then(responce => {
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(`Ошибка ${responce.status}`);
    });
  };

};
