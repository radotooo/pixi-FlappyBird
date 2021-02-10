import { Sprite } from 'pixi.js';
import gsap from 'gsap/all';

export default class Birds extends Sprite {
  constructor(texture) {
    super(texture);

    this.animationIsPlaying = false;
    this.pressedKeys = [];
    this.timeLine = new gsap.timeline();
    this.addEventListeners();
    this._init();
  }

  addEventListeners() {
    document.addEventListener('keydown', (key) => {
      const currentKeyPressed = key.code;
      if (currentKeyPressed === 'Space') {
        this.goUp(70, currentKeyPressed);
      }
    });

    document.addEventListener('keyup', (event) => {
      this.pressedKeys.splice(this.pressedKeys.indexOf(event.code), 1);
    });
  }

  update(delta, height) {
    if (this.y >= height / 2 - this.height) {
      delta = 0;
    }

    if (!this.animationIsPlaying) {
      this.goDown(delta);
    }
  }

  async goDown(delta) {
    await gsap.fromTo(
      this,
      { angle: this.angle, y: this.y },
      { angle: 70, y: this.y + delta, duration: 0.1 }
    );
    this.y += delta * 2;
  }

  async goUp(disantace, key) {
    if (this.pressedKeys.includes(key)) {
      return;
    }
    this.pressedKeys.push(key);

    this.animationIsPlaying = true;

    await gsap.fromTo(
      this,
      { angle: this.angle, y: this.y },
      { angle: 10, y: this.y - disantace, duration: 0.3 }
    );

    this.animationIsPlaying = false;
  }

  async _moveToStartPosition() {
    await gsap.to(this, {
      x: '+=100',
      duration: 2,
      ease: 'linear',
    });
  }

  async _init() {
    this.scale.set(0.5);
    this.anchor.set(0.5);
    this.animationIsPlaying = true;

    await this._moveToStartPosition();

    this.animationIsPlaying = false;
  }
}
