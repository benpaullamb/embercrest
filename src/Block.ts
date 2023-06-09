import { Bodies, Body, Composite } from 'matter-js';

interface BlockOptions extends Matter.IChamferableBodyDefinition {
  x: number;
  y: number;
  color: string;
}

export default class Block {
  static readonly SIZE = 20;

  body: Body;
  color: string;

  constructor({ x, y, color, ...bodyOptions }: BlockOptions) {
    const { canvas } = window;
    this.body = Bodies.rectangle(
      Block.SIZE / 2 + x * Block.SIZE,
      canvas.height - Block.SIZE / 2 - y * Block.SIZE,
      Block.SIZE,
      Block.SIZE,
      bodyOptions
    );
    this.color = color;

    Composite.add(window.world, this.body);
    window.blocks.push(this);
  }

  update() {
    this.render();
  }

  render() {
    const { ctx } = window;
    ctx.save();
    ctx.beginPath();

    const firstVertex = this.body.vertices[0];
    ctx.moveTo(firstVertex.x, firstVertex.y);
    this.body.vertices.forEach(({ x, y }) => ctx.lineTo(x, y));
    ctx.lineTo(firstVertex.x, firstVertex.y);

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
