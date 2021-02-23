import { Container, Sprite, Texture } from 'pixi.js';
import Button from './Button';
import gsap from 'gsap/all';

const EVENTS = {
  RESTART_GAME: 'restart_game',
};

export default class EndScreen extends Container {
  constructor() {
    super();
    this._button = null;

    this._init();
  }

  static get event() {
    return EVENTS;
  }

  _init() {
    this._addBackground();
    this._addButton();
    this._addGameOverElement();
    this.visible = false;
  }

  _addButton() {
    const button = new Button('RETRY', 0.2);
    this._button = button;
    this._button.y = 100;
    this._button.buttonMode = true;
    this._button.interactive = true;
    this._button.addListener('click', () => this._handleClick());
    this.addChild(this._button);
  }

  async _handleClick() {
    await this._button.handleClick();
    this.emit(EndScreen.event.RESTART_GAME);
  }

  _addBackground() {
    const background = new Sprite.from(Texture.WHITE);
    background.width = 900;
    background.height = 500;
    background.anchor.set(0.5);
    background.tint = '#212121';
    background.alpha = 0.8;
    this.addChild(background);
  }

  _addGameOverElement() {
    const element = new Sprite.from('gameOver');
    element.anchor.set(0.5);
    element.scale.x = 0.5;
    element.scale.y = 0.5;
    this.addChild(element);
  }

  show() {
    this.visible = true;
    gsap.fromTo(
      this,
      { alpha: 0 },
      {
        duration: 0.2,
        alpha: 1,
      }
    );
  }

  hide() {
    gsap.fromTo(this, { alpha: 1 }, { alpha: 0, duration: 0.2 });
    this.visible = false;
  }
}
