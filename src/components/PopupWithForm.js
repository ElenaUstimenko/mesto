import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup { 
  constructor (popupSelector, handleFormSubmit) { 
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // кроме селектора попапа принимает в конструктор колбэк сабмита формы
    this._formOfPopup = this.popupSelector.querySelector('.popup__form');
  };

  // приватный метод _getInputValues, который собирает данные всех полей формы
  _getInputValues() {
    const inputList = this._formOfPopup.querySelectorAll('.popup__input'); // достаём все элементы полей
    
    return Array.from(inputList).reduce((formData, input) => {
      formData[input.name] = input.value; // добавляем в этот объект значения всех полей
      return formData; // возвращаем объект значений
    }, {}) // создаём пустой объект
  };

  setInputValues(userData) { //передача в метод установки значений инпутов у класса PopupWithForm
  const inputList = this._formOfPopup.querySelectorAll('.popup__input');
    inputList.forEach((input) => {
      input.value = userData[input.name]; 
    })
  };

  // перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться 
  closePopup() {
    super.closePopup(); // вызываем родительский метод, в нём закрытие попапа и отмена слушателя на esc
    this._formOfPopup.reset(); //чистим форму от несохранённого текста
  }

  // перезаписывает родительский метод setEventListeners
  // метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
  // но и добавлять обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();

    this._formOfPopup
    .addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  };
};


// класс PopupWithForm, который наследуется от Popup, вызывает его конструктор, в который передает нужный параметр
//при этом принимает еще и второй параметр - колбэк сабмита формы