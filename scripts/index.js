const aditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');


let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_profession');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');


const handleAditButtonClick = () => {
  popup.classList.add('popup_opened');
}

const handleCloseButtonClick = () => {
  popup.classList.remove('popup_opened');
}

aditButton.addEventListener('click', handleAditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);


function handleFormSubmit (evt) {
  evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);