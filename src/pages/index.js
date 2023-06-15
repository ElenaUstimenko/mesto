import { validationOptions } from '../utils/constants.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddImage = document.querySelector('.popup_add-image');
const popupOpenBigImage = document.querySelector('.popup_open-image');
const popupUpdateAvatar = document.querySelector('.popup_update-avatar');
const popupConfirmDeleteCard = document.querySelector('.popup_confirm-delete');

const formEditProfile = document.querySelector('.popup__form_edit-profile');
const formAddImage = document.querySelector('.popup__form_add-image');

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonOpenAddImage = document.querySelector('.profile__add-button');
const buttonOpenUpdateAvatar = document.querySelector('.profile__avatar-button');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__text');

const photoOfAvatar = document.querySelector('.profile__avatar');

import '../pages/index.css' // подключение css

// section => экземпляр класса
const section = new Section({ renderer: renderCard }, '.elements');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'b6c2ceaf-2bff-4edb-9d30-ddef75ef1cb1'
  },
});

//////////////////////////////////////////////////////////// card + ID information

let userID = null; // пустой объект для данных профиля

  // деструктурирует массив, первым карточки, вторым информация о пользователе, порядок запросов и ответов сохранился
  api.getAppInfo()
  .then(([cards, user]) => {
    // console.log([cards, user])
  // card
  cards.forEach((data) => {
    const card = new Card({data, handleCardClick, userID, onLikeClick, confirmDeleteCard},
    '.card-template', '.card-template_type_default').generateCard(); 
    userID = user._id;
    section.addItem(card);
  });
  // ID information
  userInfo.setUserInfo({name: user.name, about: user.about, avatar: user.avatar, _id: user._id})

}).catch((err) => console.log(`catch: ${err}`));

//////////////////////////////////////////////////////////// card

function onLikeClick(card) {
    if(card.isLiked) {
      api.deleteLike(this.cardID)
      .then((data) => card.updateLikes(data.likes))
      .catch((err) => console.log(`catch: ${err}`));
    } else {
      api.addLike(this.cardID)
      .then((data) => card.updateLikes(data.likes))
      .catch((err) => console.log(`catch: ${err}`));
    }
  }; 

function renderCard(data) { // => не нужен
  const cardElement = createCard(data);
  section.addItem(cardElement);
};

// создание новой карточки => card => экземпляр класса 
const createCard = (data) => {
  const card = new Card({data, handleCardClick, userID, onLikeClick, confirmDeleteCard},
  '.card-template', '.card-template_type_default'); 
  const cardElement = card.generateCard(); // создаём карточку и возвращаем её на страницу
  return cardElement;
};

// добавление карточки  => экземпляр класса
const popupWithFormAddImage = new PopupWithForm(popupAddImage, submitCreateImageCard);
popupWithFormAddImage.setEventListeners();

function submitCreateImageCard(data) {
  
  popupWithFormAddImage.closePopup();
  // вызов для добавления новой карточки => передать сюда данные
  api.newCardData(data).then(post => {
    section.addItem(createCard(post));
  }).catch((err) => {console.log( `catch: ${err}`)})
};

//////////////////////////////////////////////////////////// confirm delete

const popupwithFormConfirmDeleteCard = new PopupWithConfirmation(popupConfirmDeleteCard);

popupwithFormConfirmDeleteCard.setEventListeners();

// delete => third step
function deleteCardElement(card) {
  api.deleteCard(card.cardID).then(() => {
    card.deleteCardElement();
  }).catch((err) => console.log(`catch: ${err}`)) 
  console.log(card)
};

// delete => second step
function confirmDeleteCard(card) {
  popupwithFormConfirmDeleteCard.openPopup(() => {
    deleteCardElement(card)
  }); // открыли попап и ждём ответ
};

//////////////////////////////////////////////////////////// user's profile

// updateAvatar => экземпляр класса
const popupWithFormUpdateAvatar = new PopupWithForm(popupUpdateAvatar, submitUpdateAvatar);
popupWithFormUpdateAvatar.setEventListeners();

function submitUpdateAvatar(avatar) {
  // по линку заменить фотку аватара 
  api.photoOfAvatar(avatar).then((data) => {
    userInfo.setUserInfo(data)
  }).catch((err) => {console.log( `catch: ${err}`)})
}; 

// popup => экземпляр класса for update info of user
const popupWithFormEditProfile = new PopupWithForm(popupEditProfile, submitCreateProfile);
popupWithFormEditProfile.setEventListeners();

function submitCreateProfile({name, about}) {

  api.userInformation({name, about}).then((name, about) => {
    userInfo.setUserInfo(name, about);
  }).catch((err) => {console.log( `catch: ${err}`)})
}; 

// info пользователя => экземпляр класса
const userInfo = new UserInfo({nameProfile, jobProfile, photoOfAvatar});

//////////////////////////////////////////////////////////// zoom

// zoom => экземпляр класса
export const popupWithZoomImage = new PopupWithImage(popupOpenBigImage);
popupWithZoomImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithZoomImage.openPopup(name, link); // внутри вызов публичного метода экземпляра класса PopupWithImage
};

//////////////////////////////////////////////////////////// validation

// валидация => экземпляры класса
const formEditProfileValidator = new FormValidator(validationOptions, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddImagValidator = new FormValidator(validationOptions, formAddImage);
formAddImagValidator.enableValidation();

const formApdateAvatarValidator = new FormValidator(validationOptions, popupUpdateAvatar);
formApdateAvatarValidator.enableValidation();

//////////////////////////////////////////////////////////// listeners

//слушатели для открытия попапов на кнопки изменений
buttonOpenEditProfile.addEventListener('click', () => {
  popupWithFormEditProfile.openPopup(); // функцию на экземпляр класса, не на попап
  const userData = userInfo.getUserInfo(); // данные профиля в попап - получение
  popupWithFormEditProfile.setInputValues(userData); // и дальше нужно будет передать эти данные в форму
  formEditProfileValidator.resetErrorForOpenPopup(); //чистим форму от ошибок + кнопка
});

buttonOpenAddImage.addEventListener('click', () => {
  popupWithFormAddImage.openPopup();
  formAddImagValidator.resetErrorForOpenPopup(); //чистим форму от ошибок + кнопка
});

buttonOpenUpdateAvatar.addEventListener('click', () => {
  popupWithFormUpdateAvatar.openPopup();
  formApdateAvatarValidator.resetErrorForOpenPopup(); //чистим форму от ошибок + кнопка
});

//section.renderItems(); // в конце! => не нужен