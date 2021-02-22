import { Ticker } from 'pixi.js';
import Scene from './Scene';

import Bird from '../components/Bird';
import Points from '../components/Score';
import ObstacleSet from '../components/ObstacleSet';
import EndScreen from '../components/EndScreen';

import StartScreen from '../components/StartScreen';
import config from '../config';

export default class Play extends Scene {
  constructor() {
    super();
    this._pressedKeys = [];
    this._obstacles = [];
    this._gameOver = false;
    this._init();
    this._addEventListeners();
  }

  _init() {
    this._addStartScreen();
    // this._addEndScreen();
  }

  _addEndScreen() {
    const endScreen = new EndScreen();
    this._endScreen = endScreen;
    this.addChild(this._endScreen);
  }

  async _onCreated() {
    await this._startScreen.hideScreen();
    this.removeChild(this._startScreen);
    this._createBird();
    this._createObstacles(config.view.height, this.bird.x, 4, 5);
    this._addTicker();
    this._addPoint();
    this.ticker.start();
  }

  _addStartScreen() {
    const startScreen = new StartScreen();
    this._startScreen = startScreen;
    this._startScreen.addListener('click', () => startScreen.startGame());
    this._startScreen.on(StartScreen.event.START_GAME, () => this._onCreated());
    this.addChild(startScreen);
  }

  _addPoint() {
    const point = new Points();
    this.score = point;
    this.score.zIndex = 1;
    this.addChild(this.score);
  }

  _update(delta) {
    const birdBounds = this.bird.getBounds();
    this.bird.update(delta, config.view.height, this._obstacles);

    if (birdBounds.y >= config.view.height - birdBounds.height / 1.2) {
      this._stopGame();

      return;
    }

    this._obstacles.forEach((obstacle) => {
      if (obstacle.collision) {
        this._stopGame();

        return;
      }

      obstacle.update(delta, config.view.width, birdBounds);
    });
  }

  _addEventListeners() {
    document.addEventListener('keydown', (key) => {
      const currentKeyPressed = key.code;
      if (
        currentKeyPressed === 'Space' &&
        !this._pressedKeys.includes(currentKeyPressed) &&
        !this.bird.gameOver
      ) {
        this._pressedKeys.push(currentKeyPressed);

        this.bird.goUp(70);
      }
    });

    document.addEventListener('keyup', (event) => {
      this._pressedKeys.splice(this._pressedKeys.indexOf(event.code), 1);
    });
    // document.addEventListener('click', () => {
    //   if (this._gameOver) {
    //     this._reset();
    //     this._gameOver = false;
    //   }
    //   this._onCreated();
    // });
  }

  /**
   * Reset animation
   * @private
   */
  _reset() {
    this.removeChild(this.bird);
    this.removeChild(this.score);
    this._obstacles.forEach((x) => x.destroy());
    this.ticker.destroy();
    this._obstacles = [];
    this.currentScore = 0;
  }

  /**
   * @private
   */
  _stopGame() {
    this.ticker.stop();
    this._gameOver = true;
    this.bird.gameOver = true;
  }

  /**
   * Create Bird Sprite
   * @private
   */
  _createBird() {
    const bird = new Bird(this._gameOver);
    bird.x = -(this.parent.parent.screenWidth / 2 - bird.width);
    this.bird = bird;
    this.addChild(this.bird);
  }

  /**
   * @private
   */
  _addTicker() {
    this.ticker = new Ticker();
    this.ticker.add((delta) => this._update(delta));
  }

  /**
   * Create multiple OBstacleSet and add gap betweenn
   * @param {Number} windowHeight Viewport height in pixels
   * @param {Number} birdXPosition X position of bird
   * @param {Number} count Number of ObstacleSet to create
   * @param {Number} gap Number multiplayed by ObstacleSet.width representing the gap between obstacles
   */
  _createObstacles(windowHeight, birdXPosition, count, gap) {
    for (let index = 0; index < count; index++) {
      const obstacle = new ObstacleSet(windowHeight);

      birdXPosition += obstacle.width * gap;
      obstacle.x += birdXPosition + 250;
      obstacle.on(ObstacleSet.events.OBSTACLE_PASSED, () =>
        this.score.update()
      );
      obstacle.on(ObstacleSet.events.OBSTACLE_HIT, () => this._stopGame());
      this._obstacles.push(obstacle);
      this.addChild(obstacle);
    }
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
