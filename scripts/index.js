const buttonOpenAditProfile = document.querySelector('.profile__edit-button');
const popupAditProfile = document.querySelector('.popup__adit-profile');
const buttonCloseAditProfile = popupAditProfile.querySelector('.popup__close');

const popupForm = document.querySelector('.popup__form');
const nameInputAditProfile = document.querySelector('.popup__text_type_name');
const jobInputAditProfile = document.querySelector('.popup__text_type_profession');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__text');

const buttonOpenAddImage = document.querySelector('.profile__add-button');
const popupAddImage = document.querySelector('.popup__add-image');
const buttonCloseAddImage = popupAddImage.querySelector('.popup__close_add-image');
const popupPlaceTextInput = document.querySelector('.popup__text_type_place');
const popupImageLinkInput = document.querySelector('.popup__text_type_link');
const popupFormAddImage = document.querySelector('.popup__form_add-image');

const cardListWrapper = document.querySelector('.elements');
const popupAddImageForm = document.querySelector('.popup__form_add-image');
const templateAddNewCard = document.getElementById('card_element');

const popupOpenBigImage = document.querySelector('.popup__open-image');
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

function openAditProfileForm () {
  openPopup(popupAditProfile);
  nameInputAditProfile.value = nameProfile.textContent;
  jobInputAditProfile.value = jobProfile.textContent;
}

function closeAditProfileForm () {
  closePopup(popupAditProfile);
}

function submitAditProfileForm (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInputAditProfile.value;
  jobProfile.textContent = jobInputAditProfile.value;
  closePopup(popupAditProfile);
} 

function openAddImageForm () {
  openPopup(popupAddImage);
}

function closeAddImageForm () {
  closePopup(popupAddImage);
}

function submitAddImageForm (evt) {
  evt.preventDefault();
  closePopup(popupAddImage);
} 

function closeBigImage () {
  closePopup(popupOpenBigImage);
}

const deleteCardElement = (evt) => {
  evt.target.closest('.element').remove();
};

const getAddNewCardElement = (item) => {
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
  wrap.prepend(getAddNewCardElement(item));
}

initialCards.forEach((item) => {
  renderNewCardElement(cardListWrapper, item);
});

popupAddImageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = popupPlaceTextInput.value;
  const link = popupImageLinkInput.value;

  renderNewCardElement(cardListWrapper, {name, link});
  popupPlaceTextInput.value = '';
  popupImageLinkInput.value = '';
});


buttonOpenAditProfile.addEventListener('click', openAditProfileForm);
buttonCloseAditProfile.addEventListener('click', closeAditProfileForm);
popupForm.addEventListener('submit', submitAditProfileForm);

buttonOpenAddImage.addEventListener('click', () => {
  document.querySelector('.popup_type_add-image');
  openPopup(popupAddImage);
});

buttonCloseAddImage.addEventListener('click', () => {
  closeAddImageForm(popupAddImage);
});

popupFormAddImage.addEventListener('submit', () => {
  closePopup(popupAddImage);
});

buttonCloseBigImage.addEventListener('click', () => {
  closePopup(popupOpenBigImage);
});