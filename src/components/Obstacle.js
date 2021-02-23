import { Sprite, Container } from 'pixi.js';

/**
 * Class representing a "Obstacle"
 * @param {Number} y Container y value
 * @param {Number} angle Container angle value
 * @extends PIXI.Container
 */
export default class Obstacle extends Container {
  constructor(y, angle = 0) {
    super();
    this.obstacle = new Sprite.from('obsticle');
    this.obstacle.y = y;
    this.obstacle.angle = angle;
    this.obstacle.scale.set(0.8);
    this.obstacle.anchor.set(0.5);
    this.addChild(this.obstacle);
  }
}
