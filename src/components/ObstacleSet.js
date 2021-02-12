import { Container } from 'pixi.js';
import Obstacle from './Obstacle';
import config from '../config';

/**
 * Class representing a "Obstacle"
 * @extends PIXI.Container
 */
export default class ObstacleSet extends Container {
  constructor() {
    super();

    this.passed = false;
    this.collision = false;
    this._init();
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
      this.collision = true;

      return;
    }

    this.x -= Number(delta) * 2;

    const currentObstacleBounds = this.getBounds();

    if (bird.x > currentObstacleBounds.x && !this.passed) {
      this.passed = true;
    }

    if (currentObstacleBounds.x < -this.width) {
      this.passed = false;
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
      (bird.x + bird.width - 15 > currentBoundsTop.x &&
        bird.x < currentBoundsTop.x + currentBoundsTop.width - 15 &&
        bird.y + bird.height - 15 > currentBoundsTop.y &&
        bird.y < currentBoundsTop.y + currentBoundsTop.height - 15) ||
      (bird.x + bird.width - 15 > currentBoundsBottom.x &&
        bird.x < currentBoundsBottom.x + currentBoundsBottom.width - 15 &&
        bird.y + bird.height - 15 > currentBoundsBottom.y &&
        bird.y < currentBoundsBottom.y + currentBoundsBottom.height - 15)
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
