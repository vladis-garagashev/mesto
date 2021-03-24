export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  renderItems() {
    console.log(this._renderedItems)
    this._renderedItems.forEach(item => {
      console.log(item)
      this._renderer(item);
    });
  };

  setItem(element) {
    this._container.prepend(element);
  };
};
