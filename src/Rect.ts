import { descY } from 'utils';

export interface RectOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export default class Rect {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private color: string;

  constructor({ x, y, width, height, color }: RectOptions) {
    this.x = x;
    this.y = descY(y);
    this.width = width;
    this.height = height;
    this.color = color;
  }

  public update() {
    this.render();
  }

  private render() {
    const { ctx } = window;
    ctx.save();

    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    ctx.rect(this.x - halfWidth, this.y - halfHeight, this.width, this.height);

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
