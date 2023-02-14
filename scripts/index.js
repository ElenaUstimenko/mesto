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