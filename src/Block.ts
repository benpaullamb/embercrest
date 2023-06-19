import { Bodies, Body, Composite, Vector } from 'matter-js';

interface BlockOptions extends Matter.IChamferableBodyDefinition {
  x: number;
  y: number;
  color: string;
}

export default class Block {
  public static readonly SIZE = 20;

  public body: Body;
  public color: string;

  constructor({ x, y, color, ...bodyOptions }: BlockOptions) {
    const { canvas } = window;

    const halfBlock = Block.SIZE / 2;
    const pxX = x * Block.SIZE;
    const pxY = y * Block.SIZE;

    this.body = Bodies.rectangle(
      halfBlock + pxX,
      canvas.height - halfBlock - pxY,
      Block.SIZE,
      Block.SIZE,
      bodyOptions
    );

    this.color = color;

    Composite.add(window.world, this.body);
    window.blocks.push(this);
  }

  public update() {
    this.render();
  }

  private render() {
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

  public applyForce(x: number, y: number) {
    const force = Vector.create(x, y);
    Body.applyForce(this.body, this.body.position, force);
  }
}
