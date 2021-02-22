import { Container, Sprite, Text } from 'pixi.js';
import gsap from 'gsap/all';

export default class Button extends Container {
  constructor(text, scale) {
    super();
    this._text = text;
    this._scale = scale;

    this._backGround = null;
    this._textElement = null;

    this._init();
  }

  _init() {
    this._addBackground();
    this._addText();

    this._backGround.addChild(this._textElement);
    this.addChild(this._backGround);
  }

  _addText() {
    const text = new Text(this._text, {
      fontSize: 80,
      fontWeight: 900,
    });

    text.anchor.set(0.5);
    this._textElement = text;
  }

  async _onClick() {
    await gsap.fromTo(
      this.scale,
      { x: 1, y: 1 },
      {
        duration: 0.05,
        x: 0.9,
        y: 0.9,
        yoyo: true,
        repeat: 1,
      }
    );
  }

  _addBackground() {
    const backGround = new Sprite.from('button');
    backGround.anchor.set(0.5);
    backGround.scale.x = this._scale;
    backGround.scale.y = this._scale;
    this._backGround = backGround;
  }
}
