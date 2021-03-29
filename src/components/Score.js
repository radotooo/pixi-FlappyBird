import { Container, Text } from 'pixi.js';

/**
 * Initializes a new instance of Score
 * @class
 */
export default class Score extends Container {
  constructor() {
    super();
    this.localStorage = localStorage;
    this._count = 0;
    this._addText();
  }

  /**
   * Update score
   * @public
   */
  update() {
    this._count++;
    this.text.text = this._count;
    this._saveToLocalStorage();
  }

  /**
   * Get current score value
   * @public
   */
  getCurrentScore() {
    return this._count;
  }

  /**
   * Get best score value
   * @public
   */
  getBestScore() {
    return localStorage.getItem('bestScore');
  }

  /**
   * @public
   */
  resetScore() {
    this._count = 0;
    this.text.text = this._count;
    this._saveToLocalStorage();
  }

  /**
   * Save current and best score to local storage
   * @private
   */
  _saveToLocalStorage() {
    if (!this.localStorage.bestScore) {
      this.localStorage.setItem('bestScore', 0);
    }
    if (this._count > this.localStorage.getItem('bestScore')) {
      this.localStorage.setItem('bestScore', this._count);
    }
    this.localStorage.setItem('currentScore', this._count);
  }

  /**
   * @private
   */
  _addText() {
    this.text = new Text(this._count, {
      fill: '#FF9C00',
      fontWeight: 'bold',
      fontSize: 40,
    });

    this.text.x = 350;
    this.text.y = -220;

    this.addChild(this.text);
  }
}
