import './index.css';
import { Engine, World } from 'matter-js';
import { updateInput } from 'Input';
import Player from 'Player';
import Level from 'Level';
import Camera from 'Camera';

declare global {
  interface Window {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    engine: Engine;
    world: World;

    level: Level;
    player: Player;
    camera: Camera;
  }
}

window.canvas = document.querySelector('#canvas') as HTMLCanvasElement;
window.ctx = window.canvas.getContext('2d')!;

window.engine = Engine.create();
window.world = window.engine.world;

window.level = new Level({ chunkWidth: 5 });
window.player = new Player();
window.camera = new Camera();

(function render() {
  const { ctx, canvas, level, player, camera } = window;

  ctx.save();
  ctx.fillStyle = 'lightskyblue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  level.update();
  player.update();
  camera.update();

  updateInput();
  Engine.update(window.engine, 1000 / 60);
  requestAnimationFrame(render);
})();
