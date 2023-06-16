export default class Card { 
  constructor ( { data, handleCardClick, userID, onLikeClick, confirmDeleteCard}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;

    this._templateSelector = templateSelector;
    this.generateCard = this.generateCard.bind(this);
    
    this.cardID = data._id; // карточки
    this.owner = data.owner;
    this.ownerID = data.owner._id; // владельца для удаления
    this.userID = userID;

    this.likes = data.likes;
    this._likeslength = data.likes.length;
    
    this.handleCardClick = handleCardClick;
    this.onLikeClick = onLikeClick;
    this._confirmDeleteCard = confirmDeleteCard;
  };

  _getTemplate() {// добавление новой карточки на страницу
    const cardNewElement = document
    .querySelector(this._templateSelector/*'.card-template'*/) //найдёт template-элемент
    .content // извлечёт его содержимое
    .querySelector('.element') // в содержимом найдёт элемент с классом
    .cloneNode(true); // клонирует его
 
    return cardNewElement; //вернёт клонированный элемент
  };

  generateCard() { // метод, который вставит данные в разметку и подготовит карточку
    this._element = this._getTemplate();
    this._setEventListeners(); // добавили обработчики
    

    this._element.querySelector('.element__title').textContent = this._name; // добавляем данные
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._alt;
    
    this._likeButton = this._element.querySelector('.element__button_like');
    this._likesCounter = this._element.querySelector('.element__counter');
    this._likesCounter.textContent = this._likeslength;
    this._deleteButton = this._element.querySelector('.element__button_delete');

    this._element.userID = this.userID;
    this._availabilityButtonDelete(); // видимость кнопки удаления
    this.updateLikes(this.likes);
    return this._element;
    
   };

  _setEventListeners() {

    // delete => first step
    this._element
    .querySelector('.element__button_delete')
    .addEventListener('click', () => {
      this._confirmDeleteCard(this); // сначала здесь вызвать функцию открытия попапа
    });

    this._element
    .querySelector('.element__button_like') // like
    .addEventListener('click', () => {
      this.onLikeClick(this);
    });

    this._element
    .querySelector('.element__image') // open big image
    .addEventListener('click', () => {
      this.handleCardClick(this._name, this._link); // конкретные данные
    }); 
  };

  updateLikes(likes) {
    this.likes = likes;
    this.isLiked = this.likes.some((like) => like._id === this.userID);
    // console.log(`this.userID ${this.userID}`)

    this._likeButton.classList.toggle('element__button_like_active', this.isLiked);
    this._likesCounter.textContent = this.likes.length;
  };  

  // проверка id и прячем кнопку удаления
  _availabilityButtonDelete(card) {
  if (this.userID !== this.ownerID) {
    this._deleteButton.remove();
    }
  };
  // delete => last step
  deleteCardElement() {
    this._element.remove();
    this._element = null; // очистка ссылки на DOM-элемент 
  }
};