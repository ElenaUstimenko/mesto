// класс Section, который отвечает за отрисовку элементов на странице
export default class Section { 
  constructor ( { renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector('.elements');
  };

  // cодержит публичный метод, который отвечает за отрисовку всех элементов
  // отрисовка каждого отдельного элемента должна осуществляться функцией renderer
  renderItems() { // карточки при загрузке страницы
    items.forEach((item) => {
      this._renderer(item);
    });
  };

  // содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер
  addItem(item) { //добавление новой карточки
    this._containerSelector.prepend(item);
  };
};

// у класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер