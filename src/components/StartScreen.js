import { Container } from 'pixi.js';
import gsap from 'gsap/all';
import Button from './Button';

const EVENTS = {
  START_GAME: 'start_game',
};

/**
 * Initializes a new instance of StartScreen
 * @class
 */
export default class StartScreen extends Container {
  constructor() {
    super();

    this._init();
  }

  static get event() {
    return EVENTS;
  }

  /**
   *@private
   */
  _init() {
    this._addButton();
    this.addChild(this._button);
  }

  /**
   * Add button element
   *@private
   */
  _addButton() {
    const button = new Button('PLAY', 0.5);
    this._button = button;
    this._button.buttonMode = true;
    this._button.interactive = true;
    this._button.addListener('click', () => this._handleClick());
  }

  /**
   * Handle button click animation
   *  @private
   */
  async _handleClick() {
    await this._button.handleClick();
    this.emit(StartScreen.event.START_GAME);
  }

  /**
   * Show screen
   * @public
   */
  async show() {
    this.visible = true;
    await gsap.fromTo(
      this,
      { alpha: 0 },
      {
        duration: 0.2,
        alpha: 1,
      }
    );
  }

  /**
   * Hide element
   * @private
   */
  async hide() {
    this.visible = false;
    await gsap.fromTo(this, { alpha: 1 }, { alpha: 0, duration: 0.2 });
  }
}
