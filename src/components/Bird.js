import { Container, Sprite } from 'pixi.js';
import gsap from 'gsap/all';

export default class Birds extends Container {
  constructor(gameOver) {
    super();

    this.bird = new Sprite.from('bird');
    this.bird.anchor.set(0.5);

    this.animationIsPlaying = false;
    this.gameOver = gameOver;

    this._moveToStartPosition();
    this.addChild(this.bird);
  }

  update(delta, height) {
    if (!this.animationIsPlaying) {
      this.goDown(delta);
    }

    return false;
  }

  async goDown(delta) {
    await gsap.fromTo(
      this,
      { angle: this.angle, y: this.y },
      { angle: 50, y: this.y + delta, duration: 0.08 }
    );
    this.y += delta * 3;
  }

  async goUp(disantace) {
    this.animationIsPlaying = true;

    await gsap.fromTo(
      this,
      { angle: this.angle, y: this.y },
      { angle: 0, y: this.y - disantace, duration: 0.08 }
    );

    this.animationIsPlaying = false;
  }

  async _moveToStartPosition() {
    this.animationIsPlaying = true;
    await gsap.to(this, {
      x: '+=100',
      duration: 0.5,
      ease: 'linear',
    });
    this.animationIsPlaying = false;
  }
}
