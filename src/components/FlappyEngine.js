import { Container, Texture, Ticker } from 'pixi.js';
import config from '../config';
import Bird from './Bird';

export default class FlappyEngine extends Container {
  constructor() {
    super();

    this.ticker = new Ticker();

    this._start();
  }

  _start() {
    const bird = new Bird(new Texture.from('bird'));
    bird.x = -(config.view.width / 2 - bird.width);
    this.bird = bird;
    this.addChild(this.bird);
    // bird.x = 101;
    this._update();
  }

  _addBirt() {}
  _update() {
    this.ticker.add((delta) => {
      const birdBounds = this.bird.getBounds();
      this.bird.update(delta, config.view.height, config.view.width);

      //   this.obstacles.forEach((x) =>
      //     x.update(delta, windowWidth, windowHeight, b.x)
      //   );

      // for (let index = 0; index < this.obstacles.length; index++) {
      //   this.obstacles[index].update(delta);
      //   a = this.obstacles[index].getBounds();

      //   if (b.x > a.x) {
      //     if (!passed.includes(this.obstacles[index])) {
      //       console.log('mina');
      //       passed.push(this.obstacles[index]);
      //       // this.obstacles.push(new ObstacleSet(windowHeight));
      //     }
      //   }
      // }
    });
    this.ticker.start();
  }
}
