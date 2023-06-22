import Chunk from 'Chunk';
import Cloud from 'level/Cloud';
import Sun from 'level/Sun';
import { NoiseFunction2D, createNoise2D } from 'simplex-noise';
import { topBlock } from 'utils';

interface LevelOptions {
  chunkWidth: number;
}

export default class Level {
  private chunks: Chunk[];
  private chunkWidth: number;
  private sun: Sun;
  private clouds: Cloud[];
  private noise: NoiseFunction2D;

  public get width() {
    return this.chunkWidth * Chunk.WIDTH;
  }

  constructor({ chunkWidth }: LevelOptions) {
    this.chunkWidth = chunkWidth;
    this.noise = createNoise2D();
    this.chunks = this.generateChunks();

    this.sun = new Sun();
    this.clouds = this.generateClouds();
  }

  public update() {
    this.chunks.forEach(chunk => chunk.update());
    this.sun.update();
    this.clouds.forEach(cloud => cloud.update());
  }

  private generateChunks(): Chunk[] {
    const chunks: Chunk[] = [];
    for (let i = 0; i < this.chunkWidth; i++) {
      const chunk = new Chunk({ chunkNumber: i, noise: this.noise });
      chunks.push(chunk);
    }
    return chunks;
  }

  private generateClouds(): Cloud[] {
    const clouds: Cloud[] = [];
    for (let i = 0; i < 10; i++) {
      const yOffset = Math.round(Math.random() * 5);
      const x = Math.round(Math.random() * this.chunkWidth * Chunk.WIDTH);

      clouds.push(new Cloud({ x: x, y: topBlock() - yOffset, speed: 0.00005 }));
    }
    return clouds;
  }
}
