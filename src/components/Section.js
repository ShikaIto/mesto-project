export default class Section {
    constructor({renderer}, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }

    addItem(item) {
      this._container.prepend(item);
    }

    renderItems(cards) {
        cards.reverse().forEach(item => {
            this._renderer(item);
        });
    }

    renderItem(item) {
        this._renderer(item);
    }
}