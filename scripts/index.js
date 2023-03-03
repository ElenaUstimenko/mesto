const aditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_profession');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

function handleAditButtonClick () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

function handleCloseButtonClick () {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  handleCloseButtonClick();
} 

aditButton.addEventListener('click', handleAditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
formElement.addEventListener('submit', handleFormSubmit);

// спринт 5

// open & close popup add-image
const addButton = document.querySelector('.profile__add-button');
const popupAddImage = document.querySelector('.popup_type_add-image');
const closeAddButton = popupAddImage.querySelector('.popup__close_add-image');

const popupPlaceInput = document.querySelector('.popup__text_type_place');//ввод текста
const popupImageInput = document.querySelector('.popup__text_type_link');//ввод ссылки

let popupFormAddImage = document.querySelector('.popup__form_add-image');

function handleAddButtonClick () {
  popupAddImage.classList.add('popup_type_add-image_opened');
}

function handleCloseAddButtonClick () {
  popupAddImage.classList.remove('popup_type_add-image_opened');
}

function handleAddImageSubmit (evt) {
  evt.preventDefault();
  handleCloseAddButtonClick();
} 

addButton.addEventListener('click', handleAddButtonClick);
closeAddButton.addEventListener('click', handleCloseAddButtonClick);
popupFormAddImage.addEventListener('submit', handleAddImageSubmit);


// six cards from box
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const itemListWrapper = document.querySelector('.elements'); //place for cards
const popupFormImage = document.querySelector('.popup__form_add-image'); // popup
const template = document.getElementById('card_element'); //template by id

// delete card
const elementCardDelete = (evt) => {
  evt.target.closest('.element').remove();
};

//creating card
const getAddCardElement = (item) => {
  const newCardElement = template.content.cloneNode(true);
  const newCardTitle = newCardElement.querySelector('.element__title');
  newCardTitle.textContent = item.name;
  const newCardImage = newCardElement.querySelector('.element__image');
  newCardImage.src = item.link;
  const elementButtonDelete = newCardElement.querySelector('.element__button_delete'); // delete card
  const elementButtonLike = newCardElement.querySelector('.element__button_like'); // button like 
  elementButtonDelete.addEventListener('click', elementCardDelete); // delete card
// button like
  elementButtonLike.addEventListener('click', () => {
    elementButtonLike.classList.toggle('element__button_like_active');
  });

// open image
  const openImagePopup = document.querySelector('.popup_type_open-image'); // popup
  const openImageCloseButton = openImagePopup.querySelector('.popup__close_open-image');
  const openParagraph = openImagePopup.querySelector('.popup__paragraph') // paragraph
  const openBigImage = openImagePopup.querySelector('.popup__image') // image

  newCardImage.addEventListener('click', () => {
    openImagePopup.classList.add('popup_type_open-image_opened');
    openBigImage.src = item.link;
    openParagraph.textContent = item.name;
  });

  function handleCloseImageButtonClick () {
    openImagePopup.classList.remove('popup_type_open-image_opened'); 
  }
 
  openImageCloseButton.addEventListener('click', handleCloseImageButtonClick);

  return newCardElement;
}

const renderElement = (wrap, item) => {
  wrap.prepend(getAddCardElement(item));
}

initialCards.forEach((item) => {
  renderElement(itemListWrapper, item);
});

popupFormImage.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = popupPlaceInput.value;
  const link = popupImageInput.value;

renderElement(itemListWrapper, {name, link});
  popupPlaceInput.value = '';
  popupImageInput.value = '';
});