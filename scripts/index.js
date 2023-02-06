const adidButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const saveButton = popup.querySelector('.popup__save');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__text');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

const toggleOpenPopup = () => {
  popup.classList.toggle('popup_opened');
}

const handleAddButtonClick = () => {
  toggleOpenPopup();
}

const handleCloseButtonClick = () => {
  toggleOpenPopup();
}

const handleSaveButtonClick = () => {
  toggleOpenPopup();
}

const handleOverlyClick = (event) => {
  if (event.target === event.currentTarget) {
    toggleOpenPopup();
  }
}

adidButton.addEventListener('click', handleAddButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
saveButton.addEventListener('click', handleSaveButtonClick);
popup.addEventListener('click', handleOverlyClick);


function handleFormSubmit (evt) {
  evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);


function handleOpenPopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;

}

adidButton.addEventListener('click', handleOpenPopup);