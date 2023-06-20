import Block from 'Block';

interface DirtOptions {
  x: number;
  y: number;
}

export default class Dirt extends Block {
  constructor({ x, y }: DirtOptions) {
    super({ x, y, color: 'brown', isStatic: true });
  }
}
