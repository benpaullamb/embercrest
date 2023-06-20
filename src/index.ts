import './index.css';
import { Engine, World } from 'matter-js';
import { updateInput } from 'Input';
import Player from 'Player';
import Level from 'Level';

declare global {
  interface Window {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    world: World;
    player: Player;
  }
}

window.canvas = document.querySelector('#canvas') as HTMLCanvasElement;
window.ctx = window.canvas.getContext('2d')!;
const engine = Engine.create();
window.world = engine.world;
window.player = new Player();

const level = new Level({ width: 5 });

(function render() {
  const { ctx, canvas, player } = window;

  ctx.save();
  ctx.fillStyle = 'lightskyblue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  level.update();
  player.update();

  updateInput();
  Engine.update(engine, 1000 / 60);
  requestAnimationFrame(render);
})();
