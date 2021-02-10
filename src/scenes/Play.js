import { Texture, Ticker } from 'pixi.js';
import Scene from './Scene';

import Footer from '../components/Footer';
import Bird from '../components/Bird';

export default class Play extends Scene {
  async onCreated() {
    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;

    const bird = new Bird(new Texture.from('bird'));
    const windowWidth = this.parent.parent.screenWidth;
    const windowHeight = this.parent.parent.screenHeight;

    bird.x = -(this.parent.parent.screenWidth / 2 - bird.width);

    this.addChild(bird);

    const ticker = new Ticker();
    ticker.add((delta) => {
      bird.update(delta, windowHeight, windowWidth);
    });
    ticker.start();
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    // eslint-disable-line no-unused-vars
  }
}
