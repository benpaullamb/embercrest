import Block from 'Block';

export function worldSpace(coord: number) {
  return coord * Block.SIZE;
}

export function blockSpace(coord: number) {
  return coord / Block.SIZE;
}

export function descY(y: number) {
  const { canvas } = window;
  return canvas.height - y;
}

export function ascY(y: number) {
  return descY(y);
}
