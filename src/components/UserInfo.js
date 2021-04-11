export default class UserInfo {
  constructor({profileNametSelector, profileAboutSelector, profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNametSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);

  };

  getUserInfo() {
    this._userInfo = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src
    };

    return this._userInfo
  };

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
  };

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
};
