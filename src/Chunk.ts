import { NoiseFunction2D } from 'simplex-noise';
import Block from 'Block';
import Dirt from 'blocks/Dirt';
import Grass from 'blocks/Grass';
import Water from 'blocks/Water';

interface ChunkOptions {
  chunkNumber: number;
  noise: NoiseFunction2D;
}

export default class Chunk {
  public heightMap: number[];

  public static readonly WIDTH = 64;

  private static readonly WATER_LEVEL = 5;
  private static readonly SAMPLE_SCALE = 0.025;
  private static readonly AMPLITUDE = 15;

  private blocks: Block[];
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

  public fromChunkToWorldBlock(chunkX: number): number {
    return this.chunkNumber * Chunk.WIDTH + chunkX;
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

  private generateGrass(): Grass[] {
    return this.heightMap.map((height, chunkX) => {
      const worldX = this.fromChunkToWorldBlock(chunkX);
      return new Grass({ x: worldX, y: height });
    });
  }

  private generateDirt(): Dirt[] {
    const blocks: Dirt[] = [];

    this.heightMap.forEach((height, chunkX) => {
      const worldX = this.fromChunkToWorldBlock(chunkX);

      for (let y = 0; y < height; y++) {
        blocks.push(new Dirt({ x: worldX, y }));
      }
    });
    return blocks;
  }

  private generateWater(): Water[] {
    const blocks: Water[] = [];

    this.heightMap.forEach((height, chunkX) => {
      const worldX = this.fromChunkToWorldBlock(chunkX);

      for (let y = height + 1; y <= Chunk.WATER_LEVEL; y++) {
        blocks.push(new Water({ x: worldX, y }));
      }
    });

    return blocks;
  }
}
