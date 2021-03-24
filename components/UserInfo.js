export default class UserInfo {
  constructor({profileNametSelector, profileJobtSelector}) {
    this._profileName = document.querySelector(profileNametSelector);;
    this._profileJob = document.querySelector(profileJobtSelector);

  };

  getUserInfo() {
    this._userInfo = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    };

    return this._userInfo
  };

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.job;
    data.name = "";
    data.job = "";
  };
};
