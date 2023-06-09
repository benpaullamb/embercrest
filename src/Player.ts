import Block from 'Block';
import Input from 'Input';
import { Body, Vector } from 'matter-js';

export default class Player extends Block {
  constructor() {
    super({ x: 10, y: 10, color: 'red' });
  }

  update() {
    if (Input.getKey('w')) {
      Body.applyForce(this.body, this.body.position, Vector.create(0, -0.001));
    }
    if (Input.getKey('a')) {
      Body.applyForce(this.body, this.body.position, Vector.create(-0.001, 0));
    }
    if (Input.getKey('d')) {
      Body.applyForce(this.body, this.body.position, Vector.create(0.001, 0));
    }

    super.update();
  }
}
