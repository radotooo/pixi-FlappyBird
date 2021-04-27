import { Container, Text } from 'pixi.js';

/**
 * Initializes a new instance of Score
 * @class
 * @extends {PIXI.Container}
 */
export default class Score extends Container {
  constructor() {
    super();
    this._localStorage = localStorage;
    this._setInitialScore();
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
    return this._localStorage.getItem('bestScore');
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
    if (this._count > this._localStorage.getItem('bestScore')) {
      this._localStorage.setItem('bestScore', this._count);
    }
    this._localStorage.setItem('currentScore', this._count);
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
    this.addChild(this.text);
  }

  /**
   * @private
   */
  _setInitialScore() {
    this._count = 0;
    if (!this._localStorage.bestScore) {
      this._localStorage.setItem('bestScore', 0);
    }
  }
}
