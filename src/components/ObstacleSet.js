import { Container } from 'pixi.js';
import Obstacle from './Obstacle';
import { random } from '../core/utils';

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

    this.isPassed = false;
    this._init();
  }

  static get events() {
    return EVENTS;
  }

  move() {
    this.x -= 3;
  }

  /**
   * @private
   */
  async _init() {
    const randomNum = random(1, 2);
    const obstacleTop = new Obstacle(-400, 180);
    this.top = obstacleTop;
    this.top.scale.y = 3.2;

    const obstacleBottom = new Obstacle(400);
    this.bottom = obstacleBottom;

    this.bottom.scale.y = 3.2;
    if (randomNum < 1.5) {
      this.top.scale.y += randomNum;
      this.bottom.scale.y -= randomNum;
    } else {
      this.top.scale.y -= randomNum;
      this.bottom.scale.y += randomNum;
    }
    this.addChild(obstacleTop, obstacleBottom);
  }
}
