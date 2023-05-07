import { openBigImageCardElement } from './index.js'

export default class Card { 
  constructor (data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._templateSelector = templateSelector;
    this.generateCard = this.generateCard.bind(this);
    this.openBigImageCardElement = openBigImageCardElement;
  };

_getTemplate() {//добавление новой карточки на страницу
  const cardNewElement = document
  .querySelector(this._templateSelector/*'.card-template'*/) //найдёт template-элемент
  .content //извлечёт его содержимое
  .querySelector('.element') //в содержимом найдёт элемент с классом
  .cloneNode(true); //клонирует его
 
  return cardNewElement; //вернёт клонированный элемент
};

generateCard() { //метод, который вставит данные в разметку и подготовит карточку
  this._element = this._getTemplate();
  this._setEventListeners(); //добавили обработчики
  this._element.querySelector('.element__title').textContent = this._name;//добавляем данные
  this._element.querySelector('.element__image').src = this._link;
  this._element.querySelector('.element__image').alt = this._alt;
  return this._element;
};

_setEventListeners = () => {
  this._element
  .querySelector('.element__button_delete') //delete
  .addEventListener('click', () => {
    this._deleteCardElement();
  });

  this._element
  .querySelector('.element__button_like') //like
  .addEventListener('click', () => {
    this._handleLikeCardElement();
  });

  this._element
  .querySelector('.element__image') //open big image
  .addEventListener('click', () => {
    this.openBigImageCardElement(this._name, this._link);
  });
};

  _handleLikeCardElement() {
    this._element
    .querySelector('.element__button_like')
    .classList.toggle('element__button_like_active');
  };

  _deleteCardElement = () => {
    this._element.remove();
  };
};
