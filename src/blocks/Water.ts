import Block from 'Block';

interface WaterOptions {
  x: number;
  y: number;
}

export default class Water extends Block {
  constructor({ x, y }: WaterOptions) {
    super({ x, y, color: 'blue', isStatic: true, isSensor: true });
  }
}
