import { Container, renderer, Sprite, Graphics } from 'pixi.js';
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

  /**
   * @private
   */
  async _init() {
    const obstacleTop = new Obstacle(-500, 180);

    obstacleTop.scale.y = 4.2;
    obstacleTop.scale.x = 1.5;
    this.top = obstacleTop;

    const obstacleBottom = new Obstacle(500);

    obstacleBottom.scale.y = 4.2;
    obstacleBottom.scale.x = 1.5;
    this.bottom = obstacleBottom;

    this.addChild(this.top, this.bottom);
  }
}
