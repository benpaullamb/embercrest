import Block from 'Block';

interface GrassOptions {
  x: number;
  y: number;
}

export default class Grass extends Block {
  constructor({ x, y }: GrassOptions) {
    super({ x, y, color: 'green', isStatic: true });
  }
}
