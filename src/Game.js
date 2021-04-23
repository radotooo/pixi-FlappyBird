import Splash from './scenes/Splash';
import Play from './scenes/Play';
import Start from './scenes/Start';
import End from './scenes/End';
import { Container } from 'pixi.js';

/**
 * Main game stage, manages scenes/levels.
 *
 * @extends {PIXI.Container}
 */
export default class Game extends Container {
  static get events() {
    return {
      SWITCH_SCENE: 'switch_scene',
    };
  }

  /**
   * @param {PIXI.Sprite} background
   */
  constructor({ background } = {}) {
    super();

    this._background = background;
    this.currentScene = null;
  }

  async start() {
    this._addEventListeners();
    await this.switchScene(Splash, { scene: 'splash' });
    await this.currentScene.finish;
    this.switchScene(Start, { scene: 'Start' });
  }

  _addEventListeners() {
    this.on(Game.events.SWITCH_SCENE, () => {
      this.currentScene.on(End.event.RESTART_GAME, () =>
        this.switchScene(Play, { scene: 'play' })
      );

      this.currentScene.on(Start.events.START, () =>
        this.switchScene(Play, { scene: 'play' })
      );

      this.currentScene.once(Play.event.END, (data) => {
        this.switchScene(End, { scene: 'End' }, false, data);
      });
    });
  }

  /**
   * @param {Function} constructor
   * @param {String} scene
   */
  switchScene(constructor, scene, remove = true, data = {}) {
    if (remove) this.removeChildren();

    this.currentScene = new constructor(data);
    this.currentScene.background = this._background;
    this.addChild(this.currentScene);

    this.emit(Game.events.SWITCH_SCENE, { scene });

    return this.currentScene.onCreated();
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    if (this.currentScene === null) return;

    this.currentScene.onResize(width, height);
  }
}
