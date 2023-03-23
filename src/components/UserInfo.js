export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector}) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userJobSelector = document.querySelector(userJobSelector);
    this._userAvatarSelector = document.querySelector(userAvatarSelector);
    this._data = {};
  }

  getUserInfo() {
    return this._data;
  }

  setUserInfo(data) {
    this._data = data;
    this._userNameSelector.textContent = data.name;
    this._userJobSelector.textContent = data.about;
  }

  setUserAvatar(data) {
    this._data = data;
    this._userAvatarSelector.src = data.avatar;

    this._userAvatarSelector.onerror = () => {
      this._userAvatarSelector.src = 'https://raw.githubusercontent.com/genevy/mesto/main/src/images/avatar_placeholder.svg';
    }
  }
}