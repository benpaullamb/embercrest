import Block from 'Block';
import Camera from 'Camera';
import Input from 'Input';

export default class Player extends Block {
  camera: Camera;

  constructor() {
    super({ x: 0, y: 12, color: 'red' });

    this.camera = new Camera({ player: this });
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

    this.camera.centre();

    super.update();
  }
}
