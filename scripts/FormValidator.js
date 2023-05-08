import { validationOptions } from './constants.js';
//import { popupsAllOnPage } from './index.js'

//принимает вторым параметром элемент той формы, которая валидируется
export default class FormValidator {
  constructor (validationOptions, inputSelector) {
    this._validationOptions = validationOptions;
    //this._formSelector = validationOptions.formSelector;//popup's form
    this.form = /*popupsAllOnPage*/document.querySelector('.popup__form');
    this.inputElement = this.form.querySelector('.popup__input');//validationOptions.inputSelector
  };

  //показать ошибку
  _showInputError = (inputElement, message, validationOptions) => {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`)
    //const inputFieldElement = inputElement.closest(this._validationOptions.inputSectionSelector);
    //const errorElement = inputFieldElement.querySelector(this._validationOptions.inputErrorSelector);
    errorElement.innerText = message;
    errorElement.classList.add(validationOptions.inputErrorClass);
    inputElement.classList.add(validationOptions.inputErrorLineClass);
  };

//убрать ошибку
  _hideInputError = (inputElement, validationOptions) => {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`)
    //const inputFieldElement = inputElement.closest(this._validationOptions.inputSectionSelector);
    //const errorElement = inputFieldElement.querySelector(this._validationOptions.inputErrorSelector);
    errorElement.innerText = ' ';
    errorElement.classList.remove(validationOptions.inputErrorClass);
    inputElement.classList.remove(validationOptions.inputErrorLineClass);
  };

  //валидность input (setInputState в validate.js)
  _checkInputStateValid = (inputElement, isValid, validationOptions) => {
    //const inputFieldElement = this._inputElement.closest(inputSectionSelector);
    //const errorElement = this._inputFieldElement.querySelector(inputErrorSelector);
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, validationOptions);
      //this._hideInputErrorRedLine(inputElement/*, inputErrorLineClass*/);
    } else {
      this._showInputError(inputElement, message, validationOptions);
      //this._showInputErrorRedLine(inputElement/*, inputErrorLineClass*/);
    };
  }

  //валидность формы для кнопки (toggleButtonState в validate.js)
  _toggleButtonStateValid = (validationOptions, buttonElement) => {

    const formIsValid = inputs.every(inputElement => inputElement.validity.valid);
    if (formIsValid) {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._validationOptions.disabledButtonClass);
      //this._enableButtonSave(validationOptions.disabledButtonClass);
    } else {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._validationOptions.disabledButtonClass);
      //this._disableButtonSave(validationOptions.disabledButtonClass);
    };
  };

  //пройтись по массиву и на каждое поле ввода навесить слушатель для проверки на валидность полей и кнопки
  _setEventListeners = (form, validationOptions) => {
    const submitElement = form.querySelector(options.submitSelector);
    const inputs = Array.from(form.querySelectorAll('.popup__input'));
    const buttonElement = form.querySelector('.popup__save');//validationOptions.submitSelector

    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputStateValid(inputElement, isValid, validationOptions)
        this._toggleButtonStateValid(inputs, submitElement, this._validationOptions.disabledButtonClass);
        });
      });
    _toggleButtonStateValid(inputs, submitElement, validationOptions.disabledButtonClass);
  };

//публичный метод enableValidation, который включает валидацию формы
//проверка каждой формы на валидность, слушатель на каждую форму
  enableValidation = () => {
    const forms = Array.from(document.querySelectorAll('.popup__form'));
    forms.forEach(form => {
      //forms.forEach(form => {
        _setEventListeners(form, validationOptions);
      });
      //this.form.addEventListener('input', () => {
        //this._setEventListeners(inputElement, validationOptions);
      //});
   // });
  };
};

//кнопка Сохранить включается для нажатия
  //_enableButtonSave = (validationOptions, buttonElement) => {
    //this._buttonElement.removeAttribute('disabled');
    //this._buttonElement.classList.remove(this._validationOptions.disabledButtonClass);
  //};
  //кнопка Сохранить отключается для нажатия
  //_disableButtonSave = (validationOptions, buttonElement) => {
    //this._buttonElement.setAttribute('disabled', true);
   // this._buttonElement.classList.add(this._validationOptions.disabledButtonClass);
  //};