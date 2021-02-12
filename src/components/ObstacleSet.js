import { Container } from 'pixi.js';
import Obstacle from './Obstacle';
import config from '../config';

export default class Obsticle extends Container {
  constructor() {
    super();

    this.passed = false;
    this.collision = false;
    this._init();
  }

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

  async _init() {
    const obstacleTop = new Obstacle(-config.view.height / 2.9, 180);
    this.obstacleTop = obstacleTop;

    const obstacleBottom = new Obstacle(config.view.height / 2.9);
    this.obstacleBottom = obstacleBottom;

    this.addChild(obstacleTop, obstacleBottom);
  }
}
