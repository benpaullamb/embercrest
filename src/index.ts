import './index.css';
import { Engine, World } from 'matter-js';
import Block from 'Block';
import Terrain from 'Terrain';
import Player from 'Player';
import { updateInput } from 'Input';

declare global {
  interface Window {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    world: World;
    blocks: Block[];
  }
}

window.canvas = document.querySelector('#canvas') as HTMLCanvasElement;
window.ctx = window.canvas.getContext('2d')!;
const engine = Engine.create();
window.world = engine.world;
window.blocks = [];

new Terrain();
new Player();

(function render() {
  const { ctx, canvas, blocks } = window;

  ctx.save();
  ctx.fillStyle = 'lightskyblue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  blocks.forEach(block => block.update());
  updateInput();
  Engine.update(engine, 1000 / 60);
  requestAnimationFrame(render);
})();
