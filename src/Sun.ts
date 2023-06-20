import Rect from 'Rect';

export default class Sun extends Rect {
  constructor() {
    const { canvas } = window;
    super({ x: 30, y: canvas.height - 30, size: 60, color: 'yellow' });
  }
}
