export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this.authorization = config.headers.authorization; // token
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json() // возвращает promise 
    } else {
      return Promise.reject(`Ошибка: ${res.status}`) // если ошибка, отклоняет promise 
    }
  };

  // карточки при загрузке страницы + загрузка инфо о пользователе с сервера
  //передаёт массив промисов. первым - карточки, вторым - запрос к информации о пользователе
  getAppInfo() {
    return Promise.all([this.getCards(), this.getUserIDInfo()]); 
  };

  // карточки при загрузке страницы
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: this.authorization,
        'Content-type': 'application/json'
      }
    })
    .then(this._handleResponse)
  };

  // загрузка инфо о пользователе с сервера
  getUserIDInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: this.authorization,
        'Content-type': 'application/json'
      },
    })
    .then(this._handleResponse)
  };

  // добавление новой карточки => получить данные
  newCardData({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this.authorization,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    }).then(this._handleResponse)
  };

  // изменение фотки профиля
  photoOfAvatar(avatar) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: this.authorization,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(avatar)
    }).then(this._handleResponse)
  };

  // редактирование профиля
  userInformation({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about,
      })
    }).then(this._handleResponse)
  };

  // лайки
  addLike(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: {
        authorization: this.authorization,
        'Content-type': 'application/json'
      },
    }).then(this._handleResponse)
  };

  deleteLike(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
        'Content-type': 'application/json'
      },
    }).then(this._handleResponse)
  };

  // удаление карточки
  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
        'Content-type': 'application/json'
      }
    })
  .then(this._handleResponse)
};
};