import './styles/index.css';
import { Engine, Events, World } from 'matter-js';
import { updateInput } from 'Input';
import Player from 'Player';
import Level from 'Level';
import Camera from 'Camera';
import Block from 'Block';

declare global {
  interface Window {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    engine: Engine;
    world: World;

    blocks: Block[];
    level: Level;
    player: Player;
    camera: Camera;
  }
}

window.canvas = document.querySelector('#canvas') as HTMLCanvasElement;
window.ctx = window.canvas.getContext('2d')!;

window.engine = Engine.create();
window.world = window.engine.world;

window.blocks = [];
window.level = new Level({ numChunks: 5 });
window.player = new Player();
window.camera = new Camera();

console.log('Player ID', window.player.body.id);

Events.on(window.engine, 'collisionStart', event => {
  console.log(event);

  const collisionIdPairs = event.source.pairs.collisionActive.map(({ bodyA, bodyB }: any) => [
    bodyA.id,
    bodyB.id
  ]);

  collisionIdPairs.forEach(([idA, idB]: number[]) => {
    const blockA = window.blocks.find(block => block.body.id === idA)!;
    const blockB = window.blocks.find(block => block.body.id === idB)!;
    blockA.onCollisionStart(blockB);
    blockB.onCollisionStart(blockA);
  });
});

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
