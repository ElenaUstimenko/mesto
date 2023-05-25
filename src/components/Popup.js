export default class Popup {
  constructor (popupSelector) { // принимает в конструктор единственный параметр — popupSelector
    this.popupSelector = popupSelector; //popupSelector - селектор конкретного попапа
    this._handleEscClose = this._handleEscClose.bind(this); //без этого не работает закрытие на esc, контекст теряется
  };

  // cодержит публичные методы open и close, которые отвечают за открытие и закрытие попапа
  openPopup() {
    this.popupSelector.classList.add('popup_opened'); // к конкретному попапу добавляется открытие
    document.addEventListener('keydown', this._handleEscClose);// вместо старой функции новый метод
  };

  closePopup() {
    this.popupSelector.classList.remove('popup_opened'); // к конкретному попапу удаляется открытие
    document.removeEventListener('keydown', this._handleEscClose);// вместо старой функции новый метод
  };
 
  // приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if(evt.key === 'Escape') { 
      const popup = document.querySelector('.popup_opened'); // ищем открытый popup по классу 'popup_opened'
      this.closePopup();
     };
  };

  // публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа
  // модальное окно также закрывается при клике на затемнённую область вокруг формы
  setEventListeners() {
    
    // закрытие по кнопке-крестику
    this.popupSelector.querySelector('.popup__close') // popup__close = общий класс у трёх кнопок-крестиков
    .addEventListener('click', () => {
      this.closePopup();
    });

    // закрытие на overlay
    this.popupSelector.addEventListener('mousedown', (evt) => {
      if(evt.target === evt.currentTarget && this.popupSelector.classList.contains('popup_opened')) {
        this.closePopup();
      };
    });
  };
};

// класс Popup, который отвечает за открытие и закрытие попапа
// должно быть 4 метода, описанных в ТЗ, исходя из принципа, что более 
// общий класс должен описывать поведение всех попапов 
// a конкретизация каких-то методов должна происходить уже на уровне дочерних классов