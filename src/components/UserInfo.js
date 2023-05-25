import { nameInputAditProfile, jobInputAditProfile } from '../scripts/index.js';

// класс UserInfo отвечает за управление отображением информации о пользователе на странице
export default class UserInfo { 
  // принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
  // аргумент - объект с двумя ключами { элементИнформацииОСебе, элементИмени } 
  constructor ( {nameProfile, jobProfile} ) {
    this._name = document.querySelector('.profile__name');
    this._job = document.querySelector('.profile__text');
  };

  // cодержит публичный метод getUserInfo, который возвращает объект с данными пользователя
  // этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  // есть метод getUserInfo который возвращает текущие значения из разметки
  // то есть textContent свойство двух элементов в виде объекта
  getUserInfo () {
    nameInputAditProfile.value = this._name.textContent;
    jobInputAditProfile.value = this._job.textContent;
  };

  // cодержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  //setUserInfo - получает объект с ключами и устанавливает их в разметку (то есть делает наоборот в отличие от getUserInfo)
  setUserInfo () {  
    this._name.textContent = nameInputAditProfile.value;
    this._job.textContent = jobInputAditProfile.value;
  };
};