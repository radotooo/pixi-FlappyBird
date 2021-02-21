import { Container } from 'pixi.js';
import Obstacle from './Obstacle';
import config from '../config';

const EVENTS = {
  OBSTACLE_PASSED: 'obstacle_passed',
  OBSTACLE_HIT: 'obstacle_hit',
};
/**
 * Class representing a "Obstacle"
 * @extends PIXI.Container
 */
export default class ObstacleSet extends Container {
  constructor() {
    super();

    this._passed = false;
    this._collision = false;
    this._init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Update obsticle set on every tick
   * @param {*} delta Time between every tick
   * @param {Number} width App width value
   * @param {Object} bird Bird sprite boundaries
   */
  update(delta, width, bird) {
    const currentBoundsTop = this.obstacleTop.getBounds();
    const currentBoundsBottom = this.obstacleBottom.getBounds();

    if (this._checkCollision(bird, currentBoundsTop, currentBoundsBottom)) {
      this.emit(ObstacleSet.events.OBSTACLE_HIT);
      this._collision = true;

      return;
    }

    this.x -= Number(delta) * 2;

    const currentObstacleBounds = this.getBounds();

    if (bird.x > currentObstacleBounds.x && !this._passed) {
      this._passed = true;
      this.emit(ObstacleSet.events.OBSTACLE_PASSED);
    }

    if (currentObstacleBounds.x < -this.width) {
      this._passed = false;
      this.x = width / 2 + this.width * 2;
    }
  }

  /**
   * @param {Object} bird Bird sprite boundaries
   * @param {PIXI.Sprite} currentBoundsTop Top obsticle
   * @param {PIXI.Sprite} currentBoundsBottom Bottom obsticle
   * @private
   */
  _checkCollision(bird, currentBoundsTop, currentBoundsBottom) {
    return (
      this._interaction(bird, currentBoundsTop) ||
      this._interaction(bird, currentBoundsBottom)
    );
  }

  _interaction(bird, obstacle) {
    return (
      bird.x + bird.width - 15 > obstacle.x &&
      bird.x < obstacle.x + obstacle.width - 15 &&
      bird.y + bird.height - 15 > obstacle.y &&
      bird.y < obstacle.y + obstacle.height - 15
    );
  }
  /**
   * @private
   */
  async _init() {
    const obstacleTop = new Obstacle(-config.view.height / 2.9, 180);
    this.obstacleTop = obstacleTop;

    const obstacleBottom = new Obstacle(config.view.height / 2.9);
    this.obstacleBottom = obstacleBottom;

    this.addChild(obstacleTop, obstacleBottom);
  }
}
