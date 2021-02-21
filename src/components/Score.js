import { Container, Text } from 'pixi.js';

export default class Socre extends Container {
  constructor() {
    super();
    this.localStorage = localStorage;
    this._count = 0;
    this._addText();
  }
  update() {
    this._count++;
    this.text.text = this._count;
    this._saveToLocalStorage();
  }

  _saveToLocalStorage() {
    if (!this.localStorage.bestScore) {
      this.localStorage.setItem('bestScore', 0);
    }
    if (this._count > this.localStorage.getItem('bestScore')) {
      this.localStorage.setItem('bestScore', this._count);
    }
    this.localStorage.setItem('currentScore', this._count);
  }

  _addText() {
    this.text = new Text(this._count, {
      fill: '#FF9C00',
      fontWeight: 'bold',
      fontSize: 40,
    });

    this.text.x = 350;
    this.text.y = -220;

    this.addChild(this.text);
  }
}
