import './index.css';
import { Engine, World } from 'matter-js';
import { updateInput } from 'Input';
import Player from 'Player';
import Level from 'Level';

declare global {
  interface Window {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    engine: Engine;
    world: World;
    player: Player;
    cameraX: number;
    level: Level;
  }
}

window.canvas = document.querySelector('#canvas') as HTMLCanvasElement;
window.ctx = window.canvas.getContext('2d')!;
window.engine = Engine.create();
window.world = window.engine.world;
window.level = new Level({ chunkWidth: 5 });
window.cameraX = 0;
window.player = new Player();

(function render() {
  const { ctx, canvas, level, player } = window;

  ctx.save();
  ctx.fillStyle = 'lightskyblue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  level.update();
  player.update();

  updateInput();
  Engine.update(window.engine, 1000 / 60);
  requestAnimationFrame(render);
})();
