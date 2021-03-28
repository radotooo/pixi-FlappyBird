import Scene from './Scene';
import Button from '../components/Button';
import { Sprite, Texture, Text } from 'pixi.js';

const EVENTS = {
  RESTART_GAME: 'restart_game',
};

export default class End extends Scene {
  constructor({ currentScore, bestScore }) {
    super();
    this._currentScore = currentScore;
    this._bestScore = bestScore;
  }

  static get event() {
    return EVENTS;
  }

  onCreated() {
    this._addBackground();
    this._addScoreElement();
    this._addButton();
    this._addGameOverElement();
    this._updateScoreElement(20, 20);
  }

  _addEventListeners() {
    this._button.on('click', () => {
      this._button.handleClick();
      this.emit('start');
    });
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
    this.emit('restart');
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
  _updateScoreElement() {
    const text = `SCORE \n \n You:${('0' + this._currentScore).slice(
      -2
    )}  Best:${this._bestScore}`;
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
}
