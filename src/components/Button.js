import { Container, Sprite, Text } from 'pixi.js';
import gsap from 'gsap/all';

/**
 * Initializes a new instance of Button
 * @class
 * @extends {PIXI.Container}
 */
export default class Button extends Container {
  /**
   * @param {String} text  - The value used for button text
   * @param {Number} scale - The value which determines the scale of the button
   */
  constructor(text, scale) {
    super();
    this._text = text;
    this._scale = scale;

    this.buttonMode = true;
    this.interactive = true;

    this._init();
  }

  /**
   * @private
   */
  _init() {
    this._addBackground();
    this._addText();

    this._backGround.addChild(this._textElement);
    this.addChild(this._backGround);
  }

  /**
   * @private
   */
  _addText() {
    const text = new Text(this._text, {
      fontSize: 80,
      fontWeight: 700,
      fontFamily: 'Press Start 2P',
    });

    text.anchor.set(0.5);
    this._textElement = text;
  }

  /**
   * @public
   */
  async handleClick() {
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

  /**
   * @private
   */
  _addBackground() {
    const backGround = new Sprite.from('button');

    backGround.anchor.set(0.5);
    backGround.scale.x = this._scale;
    backGround.scale.y = this._scale;
    
    this._backGround = backGround;
  }
}
