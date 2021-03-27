import Scene from './Scene';
import Button from '../components/Button';

export default class Start extends Scene {
  constructor() {
    super();
  }

  onCreated() {
    this._createStartScreen();
    this._addEventListeners();
  }

  _createStartScreen() {
    const button = new Button('PLAY', 0.5);

    this._button = button;
    this.addChild(this._button);
  }

  _addEventListeners() {
    this._button.on('click', () => {
      this._button.handleClick();
      this.emit('start');
    });
  }
}
