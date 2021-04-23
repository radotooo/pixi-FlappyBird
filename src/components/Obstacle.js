import { Sprite, Texture } from 'pixi.js';

/**
 * Initializes a new instance of Obstacle
 * @class
 * @param {Number} y Container y coordinate value
 * @param {Number} angle Container angle value
 * @extends {PIXI.Sprite}
 */
export default class Obstacle extends Sprite {
  constructor(y, angle = 0) {
    super(Texture.from('obsticle'));
    this.y = y;
    this.angle = angle;
    this.anchor.set(0.5);
  }
}
