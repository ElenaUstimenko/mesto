import { initialCards, validationOptions } from './constants.js';
import Card from './Сard.js';
import FormValidator from './FormValidator.js';
//import { enableValidation, setInputState, disableButtonSave } from './validate.js'

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddImage = document.querySelector('.popup_add-image');
const popupOpenBigImage = document.querySelector('.popup_open-image');

const formEditProfile = document.querySelector('.popup__form_edit-profile');
const formAddImage = document.querySelector('.popup__form_add-image');

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close_edit-profile');
const buttonSubmitSaveEditProfile = popupEditProfile.querySelector('.popup__save_edit-profile');
const buttonOpenAddImage = document.querySelector('.profile__add-button');
const buttonCloseAddImage = popupAddImage.querySelector('.popup__close_add-image');
const buttonSubmitSaveAddImage = popupAddImage.querySelector('.popup__save_add-image');
const buttonCloseBigImage = popupOpenBigImage.querySelector('.popup__close_open-image');

const nameInputAditProfile = document.querySelector('.popup__input_type_name');
const jobInputAditProfile = document.querySelector('.popup__input_type_profession');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__text');

const placeTextInputAddImage = document.querySelector('.popup__input_type_place');
const imageLinkInputAddImage = document.querySelector('.popup__input_type_link');
const cardListWrapper = document.querySelector('.elements');

const paragraphOpenBigImage = popupOpenBigImage.querySelector('.popup__paragraph');
const imageOpenBigImage = popupOpenBigImage.querySelector('.popup__image');

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};

function closePopupByEscape(evt) { 
 if(evt.key === 'Escape') { 
  const popup = document.querySelector('.popup_opened')// ищем открытый popup по классу 'popup_opened'
  closePopup(popup);
 };
};

const closePopupByOverlay = (popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target === evt.currentTarget && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    };
  });
};

const popupsAllOnPage = document.querySelectorAll('.popup');
  popupsAllOnPage.forEach((popup) => {
    closePopupByOverlay(popup);
});

function openEditProfileForm () {
  openPopup(popupEditProfile);
  nameInputAditProfile.value = nameProfile.textContent;
  jobInputAditProfile.value = jobProfile.textContent;
//чистим форму редактирования профиля
  const findAndDeleteErrorEditProfile = Array.from(formEditProfile.querySelectorAll('.popup__input'));
    findAndDeleteErrorEditProfile.forEach(input => {
    _checkInputStateValid(input, true, validationOptions);
  });
};

function closeEditProfileForm () {
  closePopup(popupEditProfile);
};

function submitEditProfileForm (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInputAditProfile.value;
  jobProfile.textContent = jobInputAditProfile.value;
  closePopup(popupEditProfile);
  formEditProfile.reset();
  _disableButtonSave(buttonSubmitSaveEditProfile, validationOptions.disabledButtonClass);
  };

function openAddImageForm () {
  openPopup(popupAddImage);
//чистим форму добавления карточки
  const findAndDeleteErrorAddImage = Array.from(formAddImage.querySelectorAll('.popup__input'));
    findAndDeleteErrorAddImage.forEach(input => {
    _checkInputStateValid(input, true, validationOptions);
  });
};

function closeAddImageForm () {
  closePopup(popupAddImage);
};

function closeBigImage () {
  closePopup(popupOpenBigImage);
};

//open big image
export const openBigImageCardElement = (name, link) => {
  openPopup(popupOpenBigImage);
  imageOpenBigImage.src  = link;
  imageOpenBigImage.alt = name;
  paragraphOpenBigImage.textContent = name;
};

//добавление новой карточки
  const renderNewCardElement = (wrap, item) => {
  const card = new Card(item, '.card-template', '.card-template_type_default', openBigImageCardElement); //создаём экземпляр карточки
  const cardElement = card.generateCard(); //создаём карточку и возвращаем её на страницу
  wrap.prepend(cardElement);
};

//карточки при загрузке страницы
initialCards.forEach((item) => {
  renderNewCardElement(cardListWrapper, item);
});

//наполнение данными
function fullNewCardTextAndLink (evt) {
  evt.preventDefault();
  const name = placeTextInputAddImage.value;
  const link = imageLinkInputAddImage.value;
  closePopup(popupAddImage);

  renderNewCardElement(cardListWrapper, {name, link});
  formAddImage.reset();
  _disableButtonSave(buttonSubmitSaveAddImage, validationOptions.disabledButtonClass);
};

formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddImage.addEventListener('submit', fullNewCardTextAndLink);

buttonOpenEditProfile.addEventListener('click', openEditProfileForm);
buttonCloseEditProfile.addEventListener('click', closeEditProfileForm);

buttonOpenAddImage.addEventListener('click', () => {
  openPopup(popupAddImage);
});

buttonCloseAddImage.addEventListener('click', () => {
  closeAddImageForm(popupAddImage);
});

buttonCloseBigImage.addEventListener('click', () => {
  closePopup(popupOpenBigImage);
});

//валидация
//const formEditProfile = document.querySelector('.popup__form_edit-profile');
//const formAddImage = document.querySelector('.popup__form_add-image');
const formEditProfileValidator = new FormValidator(validationOptions, formEditProfile);
const formAddImagValidator = new FormValidator(validationOptions, formAddImage);

formEditProfileValidator.enableValidation(validationOptions);
formAddImagValidator.enableValidation(validationOptions);

//убираем для ПР 7 из index.js
//enableValidation(validationOptions);

//const templateAddNewCard = document.querySelector('#card_element').content.querySelector('.element');// в классе Card

//убираем для ПР 7 из index.js
/*const deleteCardElement = (evt) => {
  evt.target.closest('.element').remove();
};*/

//убираем для ПР 7 из index.js
/*const createCard = (item) => {
  const cardNewElement = templateAddNewCard.cloneNode(true);
  const cardNewElementTitle = cardNewElement.querySelector('.element__title');
  cardNewElementTitle.textContent = item.name;
  const cardNewElementImage = cardNewElement.querySelector('.element__image');
  cardNewElementImage.src = item.link;
  cardNewElementImage.alt = cardNewElementTitle.textContent;
  const buttonDeleteCardElement = cardNewElement.querySelector('.element__button_delete');
  const buttonLikeCardElement = cardNewElement.querySelector('.element__button_like');
  buttonDeleteCardElement.addEventListener('click', deleteCardElement);

  buttonLikeCardElement.addEventListener('click', () => {
    buttonLikeCardElement.classList.toggle('element__button_like_active');
  });

  cardNewElementImage.addEventListener('click', () => {
    openPopup(popupOpenBigImage);
    imageOpenBigImage.src = item.link;
    imageOpenBigImage.alt = cardNewElementTitle.textContent;
    paragraphOpenBigImage.textContent = item.name;
  });

  return cardNewElement;
};*/

//убираем для ПР 7 из index.js
/*const renderNewCardElement = (wrap, item) => {
  wrap.prepend(createCard(item));
};*/