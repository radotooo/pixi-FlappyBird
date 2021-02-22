import { Container, Sprite } from 'pixi.js';
import Button from './Button';
import gsap from 'gsap/all';

export default class EndScreen extends Container {
  constructor() {
    super();
    this._button = null;
    this._init();
  }

  _init() {
    this._addButton();
    this._addBackground();
  }

  _addButton() {
    const button = new Button('RETRY', 0.2);
    this._button = button;
    this._button.y = 100;
    this._button.buttonMode = true;
    this._button.interactive = true;
    this.addChild(this._button);
  }

  _addBackground() {
    const background = new Sprite.from('gameOver');
    background.anchor.set(0.5);
    background.scale.x = 0.5;
    background.scale.y = 0.5;
    this.addChild(background);
  }

  async showScreen() {
    await gsap.fromTo(
      this.scale,
      { x: 1, y: 1 },
      {
        duration: 0.05,
        x: 0.9,
        y: 0.9,
        yoyo: true,
        repeat: 1,
        // onComplete: () => this.emit(StartScreen.event.START_GAME),
      }
    );
  }

  async hideScreen() {
    await gsap.fromTo(this, { alpha: 1 }, { alpha: 0, duration: 0.2 });
  }
  // _showEndScreen() {
  //   const data = 0;
  //   console.log('radootoudsia');
  // }
}
