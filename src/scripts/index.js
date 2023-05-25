import { initialCards, validationOptions } from './constants.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddImage = document.querySelector('.popup_add-image');
const popupOpenBigImage = document.querySelector('.popup_open-image');

export const formEditProfile = document.querySelector('.popup__form_edit-profile');
export const formAddImage = document.querySelector('.popup__form_add-image');

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close_edit-profile');
const buttonSubmitSaveEditProfile = popupEditProfile.querySelector('.popup__save_edit-profile');
const buttonOpenAddImage = document.querySelector('.profile__add-button');
const buttonCloseAddImage = popupAddImage.querySelector('.popup__close_add-image');
const buttonSubmitSaveAddImage = popupAddImage.querySelector('.popup__save_add-image');
const buttonCloseBigImage = popupOpenBigImage.querySelector('.popup__close_open-image');

export const nameInputAditProfile = document.querySelector('.popup__input_type_name');
export const jobInputAditProfile = document.querySelector('.popup__input_type_profession');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__text');

const placeTextInputAddImage = document.querySelector('.popup__input_type_place');
const imageLinkInputAddImage = document.querySelector('.popup__input_type_link');
const cardListWrapper = document.querySelector('.elements');

export const paragraphOpenBigImage = popupOpenBigImage.querySelector('.popup__paragraph');
export const imageOpenBigImage = popupOpenBigImage.querySelector('.popup__image');

import '../pages/index.css' // подключение css

// section => экземпляр класса
const section = new Section({items: initialCards, renderer: renderCard }, '.elements');

// popup => экземпляры класса
// для каждого попапа создавайте свой экземпляр класса PopupWithForm
// создаем два экземпляра класса PopupWithForm, в каждый передаем свой коллбек (помимо селектора попапа)
// в одном случае форма редактирует данные пользователя на странице, во втором - добавляет новую карточку
const popupWithFormEditProfile = new PopupWithForm(popupEditProfile, submitCreateProfile);
popupWithFormEditProfile.setEventListeners();

const popupWithFormAddImage = new PopupWithForm(popupAddImage, submitCreateImageCard);
popupWithFormAddImage.setEventListeners();

// zoom => экземпляр класса
export const popupWithZoomImage = new PopupWithImage(popupOpenBigImage);
popupWithZoomImage.setEventListeners();

// info пользователя => экземпляр класса
const userInfo = new UserInfo(nameProfile, jobProfile);

//валидация => экземпляры класса
export const formEditProfileValidator = new FormValidator(validationOptions, formEditProfile);
formEditProfileValidator.enableValidation();

export const formAddImagValidator = new FormValidator(validationOptions, formAddImage);
formAddImagValidator.enableValidation();

//создание новой карточки => card => экземпляр класса
const createCard = (data) => {
  const card = new Card({data, handleCardClick}, '.card-template', '.card-template_type_default');
  const cardElement = card.generateCard(); // создаём карточку и возвращаем её на страницу
  return cardElement;
};

// renderer - функция которая описывает логику создания новой карточки,т.е функция, которая принимает данные,
// необходимые для создания карточки, затем внутри себя создает ее и добавляет в список через публичный метод этого списка 
// функция не должна ничего возвращать, а просто создает карточку и добавляет в список (не нужен return)
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};

// popup
function submitCreateProfile() {
  userInfo.setUserInfo({ name: nameInputAditProfile.value, link: jobInputAditProfile.value });
  popupWithFormEditProfile.closePopup();
};

function submitCreateImageCard() {
  document.querySelector('.elements').prepend(createCard({ name: placeTextInputAddImage.value, link: imageLinkInputAddImage.value }));
  popupWithFormAddImage.closePopup();
};

// handleCardClick - функция, которая описывает поведение при нажатии на карточку  
// функция должна открывать попап с картинкой при клике на карточку
// так как логика открытия попапа описывается теперь в аргументе handleCardClick, то все костыли которые 
// раньше были связаны с этим (импортирование внешних функций в класс Card) можно убрать
function handleCardClick(name, link) {
  popupWithZoomImage.openPopup( name, link); // внутри вызов публичного метода экземпляра класса PopupWithImage
};


//слушатели для открытия попапов на кнопки изменений
buttonOpenEditProfile.addEventListener('click', () => {
  popupWithFormEditProfile.openPopup(); // функцию на экземпляр класса, не на попап
  userInfo.getUserInfo(); //данные профиля в попап
});

buttonOpenAddImage.addEventListener('click', () => {
  popupWithFormAddImage.openPopup();
});

// popup
buttonSubmitSaveEditProfile.addEventListener('click', submitCreateProfile);
buttonSubmitSaveAddImage.addEventListener('click', submitCreateImageCard);

section.renderItems(); // в конце!

// в основном файле не должно быть больше логики, кроме создания экземпляров и вызова их публичных методов, 
// а также обработчиков на кнопках, которые открывают попапы через публичные методы