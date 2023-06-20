import Player from 'Player';
import { Composite, Vector } from 'matter-js';

interface CameraOptions {
  player: Player;
}

export default class Camera {
  private player: Player;

  constructor({ player }: CameraOptions) {
    this.player = player;
  }

  public centre() {
    const { canvas, world } = window;
    const distFromRight = canvas.width - this.player.x;
    const distFromLeft = this.player.x;

    if (distFromRight < 0) {
      Composite.translate(world, Vector.create(-window.canvas.width, 0));
    } else if (distFromLeft < 0) {
      Composite.translate(world, Vector.create(window.canvas.width, 0));
    }
  }
}
