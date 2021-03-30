import { Ticker } from 'pixi.js';
import Scene from './Scene';

import Bird from '../components/Bird';
import Score from '../components/Score';
import ObstacleSet from '../components/ObstacleSet';

import config from '../config';
import { random } from '../core/utils';

const EVENTS = {
  END: 'end',
};

export default class Play extends Scene {
  constructor() {
    super();
    this._pressedKeys = [];
    this._obstacles = [];
    this._gameOver = false;
    this._frame = 150;
    this.sortableChildren = true;
  }

  static get event() {
    return EVENTS;
  }

  onCreated() {
    this._addBird();
    this._addScore();
    this._addTicker();
    this._addEventListeners();
  }

  /**
   * @private
   */
  _addScore() {
    const score = new Score();

    score.zIndex = 1;
    score.x = window.innerWidth / 2 - score.width * 2;
    score.y = -window.innerWidth / 2 + score.height / 2;

    this._score = score;
    this.addChild(this._score);
  }

  /**
   * Create Bird Sprite
   * @private
   */
  _addBird() {
    const bird = new Bird(this._gameOver);

    bird.x = -window.innerWidth / 2 + 200;
    this._bird = bird;

    this.addChild(this._bird);
  }

  /**
   * @private
   */
  _addTicker() {
    this.ticker = new Ticker();

    this.ticker.add((delta) => this._update(delta));
    this.ticker.start();
  }

  /**
   * @param {Object} bird Bird sprite boundaries
   * @param {PIXI.Sprite} currentBoundsTop Top obsticle
   * @param {PIXI.Sprite} currentBoundsBottom Bottom obsticle
   * @private
   */
  _checkCollision(bird, obstacle) {
    return (
      this._interaction(bird, obstacle.top.getBounds()) ||
      this._interaction(bird, obstacle.bottom.getBounds())
    );
  }

  /**
   * @private
   */
  _interaction(bird, obstacle) {
    return (
      bird.x + bird.width > obstacle.x &&
      bird.x < obstacle.x + obstacle.width &&
      bird.y + bird.height > obstacle.y &&
      bird.y < obstacle.y + obstacle.height + 15
    );
  }

  /**
   * @private
   */
  _crateObsticle() {
    const obstacle = new ObstacleSet();

    obstacle.x = window.innerWidth / 2 + obstacle.width;
    obstacle.y = random(-350, 350);

    this.addChild(obstacle);
    this._obstacles.push(obstacle);
  }

  /**
   * @private
   */
  _checkifBirdHitScene(birdBounds) {
    if (
      birdBounds.y >= config.view.height - birdBounds.height / 1.2 ||
      birdBounds.y <= 0
    ) {
      this._stopGame();
    }
  }

  /**
   * @private
   */
  _update(delta) {
    this._frame++;
    if (this._frame % 170 === 0) {
      this._crateObsticle();
    }

    const birdBounds = this._bird.getBounds();
    const currentObstacle = this._obstacles[0];

    this._bird.update(delta, config.view.height, this._obstacles);

    this._checkifBirdHitScene(birdBounds);

    if (currentObstacle) {
      if (this._checkCollision(birdBounds, currentObstacle)) {
        this._stopGame();
      }
      if (currentObstacle.isPassed === false) {
        this._birdIsPassingObstacle(birdBounds, currentObstacle.getBounds());
      }
      this._obstacleIsOutsideScene(currentObstacle.getBounds());
    }

    this._moveObstacles();
  }

  _moveObstacles() {
    this._obstacles.forEach((obstacle) => (obstacle.x -= 3));
  }

  /**
   * @private
   */
  _birdIsPassingObstacle(birdBounds, currentObstacleBounds) {
    if (birdBounds.x > currentObstacleBounds.x) {
      this._obstacles[0].isPassed = true;
      this._score.update();
    }
  }

  /**
   * @private
   */
  _obstacleIsOutsideScene(currentObstacleBounds) {
    if (this._obstacles[0].isPassed && currentObstacleBounds.x < -100) {
      this.removeChild(this._obstacles[0]);
      this._obstacles.shift();
    }
  }

  /**
   * @private
   */
  _addEventListeners() {
    document.addEventListener('keydown', async (key) => {
      const currentKeyPressed = key.code;
      if (
        currentKeyPressed === 'Space' &&
        !this._pressedKeys.includes(currentKeyPressed) &&
        !this._gameOver
      ) {
        this._pressedKeys.push(currentKeyPressed);
        await this._bird.goUp(70, this._pressedKeys);
      }
    });

    document.addEventListener('keyup', (event) => {
      this._pressedKeys.splice(this._pressedKeys.indexOf(event.code), 1);
    });
  }

  /**
   * @private
   */
  _stopGame() {
    this.ticker.stop();
    this._gameOver = true;
    this.emit(Play.event.END, {
      currentScore: this._score.getCurrentScore(),
      bestScore: this._score.getBestScore(),
    });
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    // eslint-disable-line no-unused-vars
  }
}
