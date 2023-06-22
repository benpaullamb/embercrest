import Block from 'Block';

interface CloudOptions {
  x: number;
  y: number;
  speed: number;
}

export default class Cloud extends Block {
  private speed: number;

  constructor({ x, y, speed }: CloudOptions) {
    super({ x, y, color: 'white', isSensor: true });
    this.speed = speed;
  }

  public update() {
    const { engine } = window;
    this.applyForce(this.speed, -engine.gravity.scale * this.body.mass);

    super.render();
  }
}
