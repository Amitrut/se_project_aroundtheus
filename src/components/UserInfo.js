export default class UserInfo {
  constructor({ nameElementSelector, jobElementSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._jobElement = document.querySelector(jobElementSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo({ nameInput, jobInput }) {
    this._nameElement.textContent = nameInput;
    this._jobElement.textContent = jobInput;
  }

  setUserAvatar(linkInput) {
    this._avatar.src = linkInput;
  }
}
