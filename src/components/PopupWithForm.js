import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup { 
  constructor (popupSelector, handleFormSubmit) { 
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // кроме селектора попапа принимает в конструктор колбэк сабмита формы
    this._formOfPopup = this.popupSelector.querySelector('.popup__form');
    this._submitButton = this._formOfPopup.querySelector('.popup__save');
    this._inputList = this._formOfPopup.querySelectorAll('.popup__input'); // достаём все элементы полей
  };

  // приватный метод _getInputValues, который собирает данные всех полей формы
  _getInputValues() {
    return Array.from(this._inputList).reduce((formData, input) => {
      formData[input.name] = input.value; // добавляем в этот объект значения всех полей
      return formData; // возвращаем объект значений
    }, {}) // создаём пустой объект
  };

  setInputValues(userData) { //передача в метод установки значений инпутов у класса PopupWithForm
    this._inputList.forEach((input) => {
      input.value = userData[input.name]; 
    })
  };
 
  closePopup() {
    super.closePopup(); // вызываем родительский метод, в нём закрытие попапа и отмена слушателя на esc
    this._formOfPopup.reset(); // чистим форму от несохранённого текста
  };

  // перезаписывает родительский метод setEventListeners
  // метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
  // но и добавлять обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();

    // улучшенный UX всех форм => кнопка "Сохрание..." в процессе
    this._formOfPopup.addEventListener('submit', (evt) => {
      this.handleSubmit(evt)});
  };

  async handleSubmit(evt) {
    evt.preventDefault();
    const originalText = this._submitButton.textContent;
    try {
      this._submitButton.textContent = 'Сохранение...';
      await this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    } finally {
      this._submitButton.textContent = originalText;
    }
  };
};

  // old  version  
   /* this._formOfPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    })
  }*/