const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_adit-profile');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close');
const formEditProfile = document.querySelector('.popup__form');
const nameInputAditProfile = document.querySelector('.popup__text_type_name');
const jobInputAditProfile = document.querySelector('.popup__text_type_profession');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__text');

const buttonOpenAddImage = document.querySelector('.profile__add-button');
const popupAddImage = document.querySelector('.popup_add-image');
const buttonCloseAddImage = popupAddImage.querySelector('.popup__close_add-image');
const popupPlaceTextInput = document.querySelector('.popup__text_type_place');
const popupImageLinkInput = document.querySelector('.popup__text_type_link');
const cardListWrapper = document.querySelector('.elements');
const popupAddImageForm = document.querySelector('.popup__form_add-image');
const templateAddNewCard = document.getElementById('card_element');

const popupOpenBigImage = document.querySelector('.popup_open-image');
const buttonCloseBigImage = popupOpenBigImage.querySelector('.popup__close_open-image');
const paragraphOpenBigImage = popupOpenBigImage.querySelector('.popup__paragraph');
const imageOpenBigImage = popupOpenBigImage.querySelector('.popup__image');

const popup = document.querySelector('.popup');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

function openEditProfileForm () {
  openPopup(popupEditProfile);
  nameInputAditProfile.value = nameProfile.textContent;
  jobInputAditProfile.value = jobProfile.textContent;
}

function closeEditProfileForm () {
  closePopup(popupEditProfile);
}

function submitEditProfileForm (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInputAditProfile.value;
  jobProfile.textContent = jobInputAditProfile.value;
  closePopup(popupEditProfile);
} 

function openAddImageForm () {
  openPopup(popupAddImage);
}

function closeAddImageForm () {
  closePopup(popupAddImage);
}

function closeBigImage () {
  closePopup(popupOpenBigImage);
}

const deleteCardElement = (evt) => {
  evt.target.closest('.element').remove();
}

const createCard = (item) => {
  const cardNewElement = templateAddNewCard.content.cloneNode(true);
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
}

const renderNewCardElement = (wrap, item) => {
  wrap.prepend(createCard(item));
}

initialCards.forEach((item) => {
  renderNewCardElement(cardListWrapper, item);
});

popupAddImageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = popupPlaceTextInput.value;
  const link = popupImageLinkInput.value;
  closePopup(popupAddImage);

  renderNewCardElement(cardListWrapper, {name, link});
  popupAddImageForm.reset();
});

buttonOpenEditProfile.addEventListener('click', openEditProfileForm);
buttonCloseEditProfile.addEventListener('click', closeEditProfileForm);
formEditProfile.addEventListener('submit', submitEditProfileForm);

buttonOpenAddImage.addEventListener('click', () => {
  openPopup(popupAddImage);
});

buttonCloseAddImage.addEventListener('click', () => {
  closeAddImageForm(popupAddImage);
});

buttonCloseBigImage.addEventListener('click', () => {
  closePopup(popupOpenBigImage);
});