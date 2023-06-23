import Chunk from 'Chunk';
import { Composite, Vector } from 'matter-js';

enum Direction {
  LEFT,
  RIGHT
}

export default class Camera {
  public x = 0;

  public update() {
    this.centre();
  }

  private centre() {
    const { player } = window;
    if (player.screenX < 0) {
      this.moveScreen(Direction.LEFT);
    } else if (player.screenX > Chunk.WIDTH) {
      this.moveScreen(Direction.RIGHT);
    }
  }

  private moveScreen(dir: Direction) {
    const { world, canvas } = window;
    const value = dir === Direction.LEFT ? canvas.width : -canvas.width;
    this.x += value;
    Composite.translate(world, Vector.create(value, 0));
  }
}
