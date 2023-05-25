//принимает вторым параметром элемент той формы, которая валидируется
export default class FormValidator {
  constructor (validationOptions, form) {
    this._validationOptions = validationOptions;//форма, инпуты, кнопка, ошибки
    this.form = form;//форма
    this.inputs = Array.from(this.form.querySelectorAll(validationOptions.inputSelector));//инпуты в форме
    this.buttonElement = this.form.querySelector(validationOptions.submitSelector);//кнопка
  };

  //показать ошибку
  _showInputError = (inputElement, message) => {
    const inputFieldElement = inputElement.closest(this._validationOptions.inputSectionSelector);
    const errorElement = inputFieldElement.querySelector(this._validationOptions.inputErrorSelector);
    errorElement.innerText = message;
    errorElement.classList.add(this._validationOptions.inputErrorClass);
    inputElement.classList.add(this._validationOptions.inputErrorLineClass);
  };

  //убрать ошибку
  _hideInputError = (inputElement) => {
    const inputFieldElement = inputElement.closest(this._validationOptions.inputSectionSelector);
    const errorElement = inputFieldElement.querySelector(this._validationOptions.inputErrorSelector);
    errorElement.innerText = ' ';
    errorElement.classList.remove(this._validationOptions.inputErrorClass);
    inputElement.classList.remove(this._validationOptions.inputErrorLineClass);
  };

  //показ ошибки после проверки на валидность input
  _checkInputStateValid = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    };
  };

  resetErrorForOpenPopup = () => {
    this.inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableButtonSave();//кнопка очищается при открытии попапа
  };

  //кнопка Сохранить включается для нажатия
  _enableButtonSave = () => {
    this.buttonElement.removeAttribute('disabled');
    this.buttonElement.classList.remove(this._validationOptions.disabledButtonClass);
  };
  
  //кнопка Сохранить отключается для нажатия
  _disableButtonSave = () => {
    this.buttonElement.setAttribute('disabled', true);
    this.buttonElement.classList.add(this._validationOptions.disabledButtonClass);
  };

  //валидность формы для кнопки
  _toggleButtonStateValid = () => {

    const formIsValid = this.inputs.every(inputElement => inputElement.validity.valid);
    if (formIsValid) {
      this._enableButtonSave();//передавать в параметрах поля класса не нужно, они доступны во всех методах класса
    } else {
      this._disableButtonSave();
    };
  };

  //пройтись по массиву и на каждое поле ввода навесить слушатель для проверки на валидность полей и кнопки
  _setEventListeners = () => {
    this.inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputStateValid(inputElement);
        this._toggleButtonStateValid();
        });
      });
    this._toggleButtonStateValid();

    //this.form.addEventListener('submit', () => { //перенесено в resetErrorForOpenPopup на открытие
     // this._disableButtonSave(this.form.querySelector(this._validationOptions.submitSelector));//кнопка очищается при закрытии
    //});
  };

  //публичный метод enableValidation, который включает валидацию формы
  //проверка каждой формы на валидность, слушатель на каждую форму
  enableValidation = () => {
    this._setEventListeners();
  };
};