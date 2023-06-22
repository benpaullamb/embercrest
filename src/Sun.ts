import Block from 'Block';
import Rect from 'Rect';

export default class Sun extends Rect {
  constructor() {
    const { canvas } = window;
    const size = Block.SIZE * 3;
    const halfSize = size / 2;

    super({
      x: halfSize,
      y: canvas.height - halfSize,
      width: size,
      height: size,
      color: 'yellow'
    });
  }
}
