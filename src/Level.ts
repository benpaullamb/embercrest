import Chunk from 'Chunk';
import Sun from 'Sun';
import { NoiseFunction2D, createNoise2D } from 'simplex-noise';

interface LevelOptions {
  width: number;
}

export default class Level {
  public chunks: Chunk[];
  public width: number;
  public sun: Sun;
  private noise: NoiseFunction2D;

  constructor({ width }: LevelOptions) {
    this.width = width;
    this.noise = createNoise2D();
    this.chunks = this.generateChunks();
    this.sun = new Sun();
  }

  public update() {
    this.chunks.forEach(chunk => chunk.update());
    this.sun.update();
  }

  private generateChunks(): Chunk[] {
    const chunks: Chunk[] = [];
    for (let i = 0; i < this.width; i++) {
      const chunk = new Chunk({ chunkNumber: i, noise: this.noise });
      chunks.push(chunk);
    }
    return chunks;
  }
}
