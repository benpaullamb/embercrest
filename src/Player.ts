import Block from 'Block';
import Camera from 'Camera';
import Input from 'Input';

export default class Player extends Block {
  private camera: Camera;

  constructor() {
    super({ x: 10, y: 20, color: 'red' });

    this.camera = new Camera({ player: this });
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

    super.update();
    this.camera.update();
  }
}
