import { validationOptions } from './constants.js';

//принимает вторым параметром элемент той формы, которая валидируется
export default class FormValidator {
  constructor (validationOptions, formSelector) {
    this._validationOptions = validationOptions;
    this._formSelector = validationOptions.formSelector;//popup's form
    this._inputElement = this._formSelector.querySelector('.popup__input');//validationOptions.inputSelector
    this._buttonElement = this._formSelector.querySelector('.popup__save');//validationOptions.submitSelector
    this._inputs = Array.from(form.querySelectorAll(validationOptions.inputSelector));
  };

  //показать или убрать ошибку
  _showInputError = (inputElement, message) => {
    //const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`)
    const inputFieldElement = inputElement.closest(this.validationOptions.inputSectionSelector);
    const errorElement = inputFieldElement.querySelector(this.validationOptions.inputErrorSelector);
    errorElement.innerText = message;
    errorElement.classList.add(this.validationOptions.inputErrorClass);
    inputElement.classList.add(this.validationOptions.inputErrorLineClass);
  };

  _hideInputError = (inputElement) => {
    //const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`)
    const inputFieldElement = inputElement.closest(this.validationOptions.inputSectionSelector);
    const errorElement = inputFieldElement.querySelector(this.validationOptions.inputErrorSelector);
    errorElement.innerText = ' ';
    errorElement.classList.remove(this.validationOptions.inputErrorClass);
    inputElement.classList.remove(this.validationOptions.inputErrorLineClass);
  };

  //кнопка Сохранить включается для нажатия
  _enableButtonSave = (buttonElement) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this.validationOptions.disabledButtonClass);
  };

  //кнопка Сохранить отключается для нажатия
  _disableButtonSave = (buttonElement) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(this.validationOptions.disabledButtonClass);
  };

  //валидность input (setInputState в validate.js)
  _checkInputStateValid = (inputElement, isValid, options) => {
    //const {inputSectionSelector, inputErrorSelector, inputErrorClass, inputErrorLineClass} = options;
    //const inputFieldElement = this._inputElement.closest(inputSectionSelector);
    //const errorElement = this._inputFieldElement.querySelector(inputErrorSelector);
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement/*, inputErrorClass*/);
      this._hideInputErrorRedLine(inputElement/*, inputErrorLineClass*/);
    } else {
      this._showInputError(errorElement, inputElement.validationMessage/*, inputErrorClass*/);
      this._showInputErrorRedLine(inputElement/*, inputErrorLineClass*/);
    };
  }

  //валидность формы для кнопки (toggleButtonState в validate.js)
  _toggleButtonStateValid = () => {
    const formIsValid = inputs.every(inputElement => inputElement.validity.valid);
    if (formIsValid) {
      this._enableButtonSave(buttonElement);
    } else {
      this._disableButtonSave(buttonElement);
    };
  };

  //пройтись по массиву и на каждое поле ввода навесить слушатель для проверки на валидность полей и кнопки
  _setEventListeners = () => {
    this._inputs.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this._checkInputStateValid(inputElement, isValid, options)
        this._toggleButtonStateValid(inputs, submitElement, this.validationOptions.disabledButtonClass);
        });
      });
    _toggleButtonStateValid(inputs, submitElement, this.validationOptions.disabledButtonClass);
  };

//публичный метод enableValidation, который включает валидацию формы
//проверка каждой формы на валидность, слушатель на каждую форму
  enableValidation = (validationOptions) => {
    //const forms = Array.from(document.querySelectorAll(validationOptions.formSelector));
    this._formSelector.forEach(form => {
      this._formSelector.addEventListener('input', () => {
        this._setEventListeners(form, validationOptions);
      });
    });
  };
};