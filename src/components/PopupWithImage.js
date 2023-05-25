import Popup from '../components/Popup.js';
// класс PopupWithImage, наследуется от Popup, вызывает его конструктор, в который передает нужный параметр

export default class PopupWithImage extends Popup { 
  constructor (popupSelector) {
    super(popupSelector); // наследуем от Popup popupSelector - селектор конкретного попапа
  };

  // этот класс должен перезаписывать родительский метод open
  // в методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке
  // используя логику полиморфизма надо перезаписать метод open, сначала сделать в нем то что описано в ТЗ, 
  // а потом вызвать метод родительского класса чтобы открыть попап
  openPopup( name, link ) { // данные, чтобы их взять
    super.openPopup(); // вызываем родительский метод, в нём открытие попапа и слушатель на esc
      this.popupSelector.querySelector('.popup__paragraph').textContent = name; // добавляем данные
      this.popupSelector.querySelector('.popup__image').src = link;
      this.popupSelector.querySelector('.popup__paragraph').alt = name; 
  };
};  