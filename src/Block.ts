import Rect from 'Rect';
import { Bodies, Body, Composite, Vector } from 'matter-js';

interface BlockOptions extends Matter.IChamferableBodyDefinition {
  x: number;
  y: number;
  color: string;
  size?: number;
}

export default class Block extends Rect {
  public body: Body;

  public get x() {
    return this.body.position.x;
  }
  private set x(_) {}
  public get y() {
    return this.body.position.y;
  }
  private set y(_) {}

  public static SIZE = 20;

  constructor({ x, y, size, color, ...bodyOptions }: BlockOptions) {
    super({ x, y, size, color });

    const { canvas } = window;
    this.body = Bodies.rectangle(x, canvas.height - y, this.size, this.size, bodyOptions);
    Composite.add(window.world, this.body);
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
