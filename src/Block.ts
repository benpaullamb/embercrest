import { Bodies, Body, Composite, Vector } from 'matter-js';
import { blockSpace, ascY, descY, worldSpace } from 'utils';

interface BlockOptions extends Matter.IChamferableBodyDefinition {
  x: number;
  y: number;
  color: string;
  width?: number;
  height?: number;
}

export default class Block {
  public static SIZE = 20;

  public body: Body;

  public get x() {
    const { camera } = window;
    return blockSpace(this.body.position.x - camera.x);
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

  protected width: number;
  protected height: number;

  private color: string;

  constructor({ x, y, color, width = 1, height = 1, ...bodyOptions }: BlockOptions) {
    this.color = color;
    this.width = width;
    this.height = height;

    bodyOptions.mass ??= 1;
    this.body = Bodies.rectangle(
      worldSpace(x + 0.5),
      descY(worldSpace(y + 0.5)),
      worldSpace(this.width),
      worldSpace(this.height),
      bodyOptions
    );
    Composite.add(window.world, this.body);
    window.blocks.push(this);
  }

  public update() {
    this.render();
  }

  public onCollisionStart(block: Block) {}

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
    const force = Vector.create(x, -y);
    Body.applyForce(this.body, this.body.position, force);
  }

  public setPosition(x: number, y: number) {
    const { camera } = window;
    const position = Vector.create(worldSpace(x) + camera.x, descY(worldSpace(y)));
    Body.setPosition(this.body, position);
  }

  public setVelocity(x: number, y = -this.body.velocity.y) {
    Body.setVelocity(this.body, Vector.create(x, -y));
  }
}
