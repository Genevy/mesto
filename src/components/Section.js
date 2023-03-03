export default class Section {
  constructor({ data, renderer }, selector) {
      this._renderCard = data;
      this._renderer = renderer;
      this._container = document.querySelector(selector);
   }
   
    addItem = (element) => {
      this._container.prepend(element);
    };

    renderCard = () => {
      this._renderCard.forEach(item => {
          this._renderer(item);
       });
    };
}