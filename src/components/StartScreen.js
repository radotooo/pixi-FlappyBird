import { Container, Sprite, Text } from 'pixi.js';
import gsap from 'gsap/all';
import Button from './Button';

const EVENTS = {
  START_GAME: 'start_game',
};

export default class StartScreen extends Container {
  constructor() {
    super();
    this._button = null;

    this._init();
  }

  static get event() {
    return EVENTS;
  }

  _init() {
    this.buttonMode = true;
    this.interactive = true;

    this._addButton();
    this.addChild(this._button);
  }

  _addButton() {
    const button = new Button('PLAY', 0.5);
    this._button = button;
  }

  async startGame() {
    await this._button._onClick();
    this.emit(StartScreen.event.START_GAME);
  }

  async hideScreen() {
    await gsap.fromTo(this, { alpha: 1 }, { alpha: 0, duration: 0.2 });
  }
}
