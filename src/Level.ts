import Chunk from 'Chunk';
import Cloud from 'level/Cloud';
import Sun from 'level/Sun';
import { NoiseFunction2D, createNoise2D } from 'simplex-noise';
import { random, topBlock } from 'utils';

interface LevelOptions {
  numChunks: number;
}

export default class Level {
  private chunks: Chunk[];
  private numChunks: number;
  private sun: Sun;
  private clouds: Cloud[];
  private noise: NoiseFunction2D;

  public get width() {
    return this.numChunks * Chunk.WIDTH;
  }

  constructor({ numChunks }: LevelOptions) {
    this.numChunks = numChunks;
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
    for (let i = 0; i < this.numChunks; i++) {
      const chunk = new Chunk({ chunkNumber: i, noise: this.noise });
      chunks.push(chunk);
    }
    return chunks;
  }

  private generateClouds(): Cloud[] {
    const clouds: Cloud[] = [];

    const numClouds = random(1, 20, true);
    for (let i = 0; i < numClouds; i++) {
      const topY = random(0, 5, true);
      const x = random(0, this.numChunks * Chunk.WIDTH, true);
      const speed = random(0.00004, 0.00006);

      clouds.push(new Cloud({ x: x, y: topBlock() - topY, speed }));
    }
    return clouds;
  }
}
