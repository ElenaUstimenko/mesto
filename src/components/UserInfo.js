// класс UserInfo отвечает за управление отображением информации о пользователе на странице
export default class UserInfo { 
  constructor ( {nameProfile, jobProfile, avatarSelector} ) {
    this._name = document.querySelector('.profile__name');
    this._about = document.querySelector('.profile__text');
    this.avatar = document.querySelector('.profile__avatar');
  };

  getUserInfo () {
    //достать значения из элементов профиля и вернуть объект
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this.avatar.src,
    }
  };

  setUserInfo ({name, about, avatar}) {  
    // должен принять объект данных и проставить из него значения в элементы профиля
    this._name.textContent = name;
    this._about.textContent = about;
    this.avatar.src = avatar;
  };
};