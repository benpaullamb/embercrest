import Block from 'Block';
import Dirt from 'blocks/Dirt';
import Grass from 'blocks/Grass';
import Water from 'blocks/Water';
import { NoiseFunction2D } from 'simplex-noise';

interface ChunkOptions {
  chunkNumber: number;
  noise: NoiseFunction2D;
}

export default class Chunk {
  public static readonly WIDTH = 64;
  private static readonly SAMPLE_SCALE = 0.025;
  private static readonly AMPLITUDE = 300;
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

  public update() {
    this.blocks.forEach(block => block.update());
  }

  public toWorldSpace(chunkBlockX: number): number {
    return (this.chunkNumber * Chunk.WIDTH + chunkBlockX) * Block.SIZE + Block.SIZE / 2;
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
      const blockyHeight = Math.floor(positiveHeight / Block.SIZE) * Block.SIZE;
      const offsetHeight = blockyHeight + Block.SIZE / 2;
      heightMap.push(offsetHeight);
    }

    return heightMap;
  }

  private generateGrass(): Grass[] {
    return this.heightMap.map((height, x) => {
      const worldX = this.toWorldSpace(x);
      return new Grass({ x: worldX, y: height });
    });
  }

  private generateDirt(): Dirt[] {
    const blocks: Dirt[] = [];

    this.heightMap.forEach((height, x) => {
      const worldX = this.toWorldSpace(x);

      for (let y = Block.SIZE / 2; y < height; y += Block.SIZE) {
        const block = new Dirt({ x: worldX, y });
        blocks.push(block);
      }
    });

    return blocks;
  }

  private generateWater(): Water[] {
    const blocks: Water[] = [];

    this.heightMap.forEach((height, x) => {
      const worldX = this.toWorldSpace(x);

      for (let y = height + Block.SIZE; y <= Chunk.WATER_LEVEL * Block.SIZE; y += Block.SIZE) {
        const water = new Water({ x: worldX, y });
        blocks.push(water);
      }
    });

    return blocks;
  }
}
