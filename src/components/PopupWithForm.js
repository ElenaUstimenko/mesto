import Popup from '../components/Popup.js';
import { formEditProfileValidator, formAddImagValidator, formEditProfile, formAddImage } from '../scripts/index.js'


export default class PopupWithForm extends Popup { 
  constructor (popupSelector, handleFormSubmit) { 
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // кроме селектора попапа принимает в конструктор колбэк сабмита формы
    this._specificPopup = document.querySelector('.popup');
    this._formOfPopup = this._specificPopup.querySelector('.popup__form');
    this._fieldOfPOpup = this._formOfPopup.querySelector('.popup__field');
  };

  // приватный метод _getInputValues, который собирает данные всех полей формы
  _getInputValues() {
    const inputList = this._formOfPopup.querySelectorAll('.popup__input'); // достаём все элементы полей
    
    return Array.from(inputList).reduce((formData, input) => {
      formData[input.name] = input.value; // добавляем в этот объект значения всех полей
      return formData; // возвращаем объект значений
    }, {}) // создаём пустой объект
  };

  // перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться 
  closePopup() {
    super.closePopup(); // вызываем родительский метод, в нём закрытие попапа и отмена слушателя на esc
    formEditProfile.reset(); //чистим форму от несохранённого текста
    formAddImage.reset(); //чистим форму от несохранённого текста
    formEditProfileValidator.resetErrorForOpenPopup(); //чистим форму от ошибок + кнопка
    formAddImagValidator.resetErrorForOpenPopup(); //чистим форму от ошибок + кнопка
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