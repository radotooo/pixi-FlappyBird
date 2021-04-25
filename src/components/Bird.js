import { Container, Sprite } from 'pixi.js';
import gsap from 'gsap/all';
import config from '../config';

/**
 * Initializes a new instance of Bird
 * @class
 * @extends {PIXI.Container}
 */
export default class Bird extends Container {
  constructor(gameOver) {
    super();

    this.bird = new Sprite.from('bird');
    this.bird.anchor.set(0.5);
    this.addChild(this.bird);

    this.animationIsPlaying = false;
    this.gameOver = gameOver;
    this._init();
  }

  async _init() {
    await this._moveToStartPosition();
    this._goDown();
  }

  /**
   * Entering the scene before animation start
   * @private
   */
  async _moveToStartPosition() {
    this.animationIsPlaying = true;
    await gsap.to(this, {
      x: '+=100',
      duration: 0.5,
      ease: 'linear',
    });
    this.animationIsPlaying = false;
  }

  /**
   *  Bird go down animation
   * @private
   */
  async _goDown() {
    const tl = gsap.timeline();

    this._goDownAnimation = tl;
    await this._goDownAnimation
      .fromTo(
        this,
        {
          angle: this.angle,
        },
        {
          angle: 70,
          duration: 0.5,
          ease: 'Power0.easeIn',
        }
      )
      .fromTo(
        this,
        {
          y: this.y,
        },
        {
          y: config.view.height / 2,
          duration: 0.7,
          ease: 'Power1.easeIn',
        },
        '<'
      );
  }

  /**
   *  Bird go up animation
   *  @param {Number} distance
   * @private
   */
  async goUp(distance) {
    this._goDownAnimation.pause();

    if (this._goUpAnimation) this._goUpAnimation.pause();

    this._goUpAnimation = gsap.timeline();

    await this._goUpAnimation
      .to(this, {
        angle: -20,
        duration: 0.2,
      })
      .to(
        this,
        {
          y: this.y - distance,
          duration: 0.3,
          onComplete: () => this._goDown(),
        },
        '<'
      );
  }
}
