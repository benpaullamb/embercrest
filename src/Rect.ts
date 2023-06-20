export interface RectOptions {
  x: number;
  y: number;
  color: string;
  size?: number;
}

export default class Rect {
  public size = 20;
  public color: string;
  private _x: number;
  private _y: number;

  public get x() {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
  }
  public get y() {
    return this._y;
  }
  public set y(value: number) {
    const { canvas } = window;
    this._y = canvas.height - value;
  }

  constructor({ x, y, color, size }: RectOptions) {
    this._x = x;
    const { canvas } = window;
    this._y = canvas.height - y;

    this.color = color;
    if (size) this.size = size;
  }

  public update() {
    this.render();
  }

  protected render() {
    const { ctx } = window;
    ctx.save();

    const halfSize = this.size / 2;
    ctx.rect(this.x - halfSize, this.y - halfSize, this.size, this.size);

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
