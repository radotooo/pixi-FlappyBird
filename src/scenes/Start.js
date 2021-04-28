import Scene from './Scene';
import Button from '../components/Button';

const EVENTS = {
  START: 'start',
};

export default class Start extends Scene {
  constructor() {
    super();
  }

  static get events() {
    return EVENTS;
  }

  onCreated() {
    this._createStartScreen();
    this._addEventListeners();
  }

  /**
   * @orivate
   */
  _createStartScreen() {
    const button = new Button('PLAY', 0.5);

    this._button = button;
    this.addChild(this._button);
  }

  /**
   * @orivate
   */
  _addEventListeners() {
    this._button.on('click', () => {
      this._button.handleClick();
      this.emit(Start.events.START);
    });
  }
}
