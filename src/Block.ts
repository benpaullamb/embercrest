import { Bodies, Body, Composite, Vector } from 'matter-js';
import { blockSpace, ascY, descY, worldSpace } from 'utils';

interface BlockOptions extends Matter.IChamferableBodyDefinition {
  x: number;
  y: number;
  color: string;
}

export default class Block {
  public static SIZE = 20;

  public get x() {
    const { cameraX } = window;
    return blockSpace(this.body.position.x - cameraX);
  }
  public get y() {
    return blockSpace(ascY(this.body.position.y));
  }

  public get screenX() {
    return blockSpace(this.body.position.x);
  }
  public get screenY() {
    return blockSpace(ascY(this.body.position.y));
  }

  protected body: Body;
  private color: string;

  constructor({ x, y, color, ...bodyOptions }: BlockOptions) {
    this.color = color;

    bodyOptions.mass ??= 1;
    this.body = Bodies.rectangle(
      worldSpace(x + 0.5),
      descY(worldSpace(y + 0.5)),
      Block.SIZE,
      Block.SIZE,
      bodyOptions
    );
    Composite.add(window.world, this.body);
  }

  public update() {
    this.render();
  }

  protected render() {
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
