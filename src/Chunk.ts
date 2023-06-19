import Block from 'Block';
import { NoiseFunction2D } from 'simplex-noise';

interface ChunkOptions {
  chunkNumber: number;
  noise: NoiseFunction2D;
}

export default class Chunk {
  public static readonly WIDTH = 64;
  private static readonly SAMPLE_SCALE = 0.025;
  private static readonly AMPLITUDE = 15;
  public static readonly WATER_LEVEL = 5;

  public blocks: Block[];
  private heightMap: number[];
  private chunkNumber: number;
  private noise: NoiseFunction2D;

  constructor({ chunkNumber, noise }: ChunkOptions) {
    this.chunkNumber = chunkNumber;
    this.noise = noise;

    this.heightMap = this.generateHeightMap();

    const grassBlocks = this.generateGrass();
    const dirtBlocks = this.generateDirt();
    const waterBlocks = this.generateWater();
    this.blocks = [...grassBlocks, ...dirtBlocks, ...waterBlocks];
  }

  private generateHeightMap(): number[] {
    const heightMap = [];
    const baseSampleX = this.chunkNumber * Chunk.WIDTH * Chunk.SAMPLE_SCALE;
    const halfAmplitude = Chunk.AMPLITUDE / 2;

    for (let block = 0; block < Chunk.WIDTH; block++) {
      const chunkSampleX = block * Chunk.SAMPLE_SCALE;
      const worldSampleX = baseSampleX + chunkSampleX;

      const height = this.noise(worldSampleX, 0);
      const positiveHeight = height * halfAmplitude + halfAmplitude;
      const wholeHeight = Math.round(positiveHeight);
      heightMap.push(wholeHeight);
    }

    return heightMap;
  }

  private generateGrass(): Block[] {
    return this.heightMap.map((height, x) => {
      const worldBlockX = this.chunkNumber * Chunk.WIDTH + x;

      return new Block({
        x: worldBlockX,
        y: height,
        color: 'green',
        isStatic: true
      });
    });
  }

  private generateDirt(): Block[] {
    const blocks: Block[] = [];

    this.heightMap.forEach((height, x) => {
      const worldBlockX = this.chunkNumber * Chunk.WIDTH + x;

      for (let y = 0; y < height; y++) {
        const block = new Block({
          x: worldBlockX,
          y,
          color: 'brown',
          isStatic: true
        });

        blocks.push(block);
      }
    });
    return blocks;
  }

  private generateWater(): Block[] {
    const blocks: Block[] = [];

    this.heightMap.forEach((height, x) => {
      const worldBlockX = this.chunkNumber * Chunk.WIDTH + x;

      for (let y = height + 1; y <= Chunk.WATER_LEVEL; y++) {
        const block = new Block({
          x: worldBlockX,
          y,
          color: 'blue',
          isStatic: true
        });

        blocks.push(block);
      }
    });

    return blocks;
  }
}
