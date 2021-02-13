import { Container, Text } from 'pixi.js';

export default class Points extends Container {
  constructor() {
    super();

    this.text = new Text('0', {
      fill: '#FADC5C',
      fontWeight: 'bold',
    });

    this.addChild(this.text);
  }
  update(num) {}
}
