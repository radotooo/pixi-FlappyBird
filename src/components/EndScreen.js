import { Container, Sprite, Texture, Text } from 'pixi.js';
import Button from './Button';
import gsap from 'gsap/all';

const EVENTS = {
  RESTART_GAME: 'restart_game',
};

/**
 * Initializes a new instance of EndScreen
 * @class
 */
export default class EndScreen extends Container {
  constructor() {
    super();

    this._init();
  }

  static get event() {
    return EVENTS;
  }

  /**
   * @private
   */
  _init() {
    this._addBackground();
    this._addScoreElement();
    this._addButton();
    this._addGameOverElement();
    this.visible = false;
  }

  /**
   * @private
   */
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

  /**
   * @private
   */
  _addBackground() {
    const background = new Sprite.from(Texture.WHITE);
    background.width = 900;
    background.height = 500;
    background.anchor.set(0.5);
    background.tint = '#212121';
    background.alpha = 0.8;
    this.addChild(background);
  }

  /**
   * @private
   */
  _addScoreElement() {
    this.text = new Text('', {
      fill: '#FF9C00',
      fontFamily: 'Press Start 2P',
      fontSize: 20,
      align: 'center',
    });
    this.text.anchor.set(0.5);
    this.text.y = -190;
    this.addChild(this.text);
  }

  /**
   * Update score text
   * @private
   */
  _updateScoreElement(currentScore, bestScore) {
    const text = `SCORE \n \n You:${('0' + currentScore).slice(
      -2
    )}  Best:${bestScore}`;
    this.text.text = text;
  }

  /**
   * @private
   */
  _addGameOverElement() {
    const element = new Sprite.from('gameOver');
    element.anchor.set(0.5);
    element.scale.x = 0.5;
    element.scale.y = 0.5;
    this.addChild(element);
  }

  /**
   * Show container
   * @param {Number} currentScore Current player score
   * @param {Number} bestScore Best score
   */
  show(currentScore, bestScore) {
    this._updateScoreElement(currentScore, bestScore);
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

  /**
   * Hide container
   * @public
   */
  hide() {
    gsap.fromTo(this, { alpha: 1 }, { alpha: 0, duration: 0.2 });
    this.visible = false;
  }
}
