import Block from 'Block';
import Input from 'Input';

export default class Player extends Block {
  constructor() {
    super({ x: 10, y: 10, color: 'red' });
  }

  update() {
    if (Input.getKey('w')) {
      this.applyForce(0, -0.001);
    }
    if (Input.getKey('a')) {
      this.applyForce(-0.001, 0);
    }
    if (Input.getKey('d')) {
      this.applyForce(0.001, 0);
    }

    super.update();
  }
}
