import { validationOptions } from './constants.js';

//принимает вторым параметром элемент той формы, которая валидируется
export default class FormValidator {
  constructor (validationOptions, form) {
    this._validationOptions = validationOptions;//форма, инпуты, кнопка, ошибки
    this.form = form;//форма
    this.inputs = Array.from(this.form.querySelectorAll('.popup__input'));//инпуты в форме
    this.buttonElement = this.form.querySelector('.popup__save');//кнопка
  };

  //показать ошибку
  _showInputError = (inputElement, message) => {
    const inputFieldElement = inputElement.closest(validationOptions.inputSectionSelector);
    const errorElement = inputFieldElement.querySelector(validationOptions.inputErrorSelector);
    errorElement.innerText = message;
    errorElement.classList.add(this._validationOptions.inputErrorClass);
    inputElement.classList.add(this._validationOptions.inputErrorLineClass);
  };

//убрать ошибку
  _hideInputError = (inputElement) => {
    const inputFieldElement = inputElement.closest(validationOptions.inputSectionSelector);
    const errorElement = inputFieldElement.querySelector(validationOptions.inputErrorSelector);
    errorElement.innerText = ' ';
    errorElement.classList.remove(this._validationOptions.inputErrorClass);
    inputElement.classList.remove(this._validationOptions.inputErrorLineClass);
  };

  //показ ошибки после проверки на валидность input
  _checkInputStateValid = (inputElement, /*isValid*/) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    };
  };

  _resetErrorForOpenPopup = () => {
    this.inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  //кнопка Сохранить включается для нажатия
  _enableButtonSave = (buttonElement, disabledButtonClass) => {
    this.buttonElement.removeAttribute('disabled');
    this.buttonElement.classList.remove(this._validationOptions.disabledButtonClass);
  };
  
  //кнопка Сохранить отключается для нажатия
  _disableButtonSave = (buttonElement, disabledButtonClass) => {
    this.buttonElement.setAttribute('disabled', true);
    this.buttonElement.classList.add(this._validationOptions.disabledButtonClass);
  };

  //валидность формы для кнопки
  _toggleButtonStateValid = (inputs, submitElement, disabledButtonClass) => {

    const formIsValid = this.inputs.every(inputElement => inputElement.validity.valid);
    if (formIsValid) {
      this._enableButtonSave(this._validationOptions.disabledButtonClass);
    } else {
      this._disableButtonSave(this._validationOptions.disabledButtonClass);
    };
  };

  //пройтись по массиву и на каждое поле ввода навесить слушатель для проверки на валидность полей и кнопки
  _setEventListeners = () => {
    this.inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputStateValid(inputElement)
        this._toggleButtonStateValid(this.inputs, validationOptions.submitElement, validationOptions.disabledButtonClass);
        });
      });
    this._toggleButtonStateValid(this.inputs, validationOptions.submitElement, validationOptions.disabledButtonClass);

    this.form.addEventListener('submit', () => {
      this._disableButtonSave(this.form.querySelector(this._validationOptions.submitSelector));//кнопка очищается при закрытии
    });
  };

//публичный метод enableValidation, который включает валидацию формы
//проверка каждой формы на валидность, слушатель на каждую форму
  enableValidation = () => {
        this._setEventListeners();
  };
};