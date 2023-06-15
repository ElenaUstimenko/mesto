import PopupWithForm from '../components/PopupWithForm.js';

export default class PopupWithConfirmation extends PopupWithForm {
  constructor (popupSelector) {
    super(popupSelector);
    this._formOfPopup = this.popupSelector.querySelector('.popup__form');
  };

  // переопределяем метод open, чтобы он принимал функцию, которую нужно вызвать на сабмите
  openPopup(onSubmit) {
   super.openPopup();
   this._handleFormSubmit = onSubmit;
  };
};