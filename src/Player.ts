import Block from 'Block';
import Input from 'Input';
import { Body } from 'matter-js';

export default class Player extends Block {
  constructor() {
    super({ x: 10, y: 20, height: 2, color: 'orange' });
  }

  public update() {
    if (Input.getKeyDown(' ')) {
      this.setVelocity(this.body.velocity.x, 10);
    }
    if (Input.getKey('a')) {
      this.setVelocity(-5);
    }
    if (Input.getKey('d')) {
      this.setVelocity(5);
    }

    if (Input.getKeyDown('r')) {
      this.setPosition(10, this.y);
    }

    this.stayUpright();
    super.update();
  }

  public onCollisionStart(block: Block) {
    // console.log('Player collision', block);
  }

  private stayUpright() {
    Body.setAngle(this.body, 0);
    Body.setAngularVelocity(this.body, 0);
  }
}
