import { Sprite, Texture } from 'pixi.js';

/**
 * Class representing a "Obstacle"
 * @param {Number} y Container y value
 * @param {Number} angle Container angle value
 * @extends PIXI.Container
 */
export default class Obstacle extends Sprite {
  constructor(y, angle = 0) {
    super(Texture.from('obsticle'));
    this.y = y;
    this.angle = angle;
    this.anchor.set(0.5);
  }
}
