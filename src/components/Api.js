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
    })
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

}
