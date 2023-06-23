import Block from 'Block';
import Input from 'Input';

export default class Player extends Block {
  constructor() {
    super({ x: 10, y: 20, color: 'red' });
  }

  public update() {
    if (Input.getKey('w')) {
      this.applyForce(0, -0.003);
    }
    if (Input.getKey('a')) {
      this.applyForce(-0.003, 0);
    }
    if (Input.getKey('d')) {
      this.applyForce(0.003, 0);
    }

    if (Input.getKeyDown(' ')) {
      this.setPosition(10, this.y);
    }

    super.update();
  }
}
