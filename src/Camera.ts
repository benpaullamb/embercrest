import Chunk from 'Chunk';
import Player from 'Player';
import { Composite, Vector } from 'matter-js';

interface CameraOptions {
  player: Player;
}

enum Direction {
  LEFT,
  RIGHT
}

export default class Camera {
  private player: Player;

  constructor({ player }: CameraOptions) {
    this.player = player;
  }

  public update() {
    this.centre();
  }

  private centre() {
    if (this.player.screenX < 0) {
      this.moveScreen(Direction.LEFT);
    } else if (this.player.screenX > Chunk.WIDTH) {
      this.moveScreen(Direction.RIGHT);
    }
  }

  private moveScreen(dir: Direction) {
    const { world, canvas } = window;
    const value = dir === Direction.LEFT ? canvas.width : -canvas.width;
    window.cameraX += value;
    Composite.translate(world, Vector.create(value, 0));
  }
}
