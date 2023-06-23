import Block from 'Block';
import { random } from 'utils';

interface CloudOptions {
  x: number;
  y: number;
  speed: number;
}

export default class Cloud extends Block {
  private speed: number;

  constructor({ x, y, speed }: CloudOptions) {
    const width = random(2, 10, true);
    const height = random(1, width - 1, true);
    super({ x, y, color: 'white', width, height, isSensor: true });
    this.speed = speed;
  }

  public update() {
    this.float();

    const { level } = window;
    const halfWidth = this.width / 2;
    if (this.x > level.width + halfWidth) {
      this.setPosition(-halfWidth, this.y);
    }

    super.render();
  }

  private float() {
    const { engine } = window;
    this.applyForce(this.speed, engine.gravity.scale * this.body.mass);
  }
}
