import Block from 'Block';
import { NoiseFunction2D } from 'simplex-noise';

interface ChunkOptions {
  chunkNumber: number;
  noise: NoiseFunction2D;
}

export default class Chunk {
  public static readonly WIDTH = 64;
  private static readonly SAMPLE_SCALE = 0.05;
  private static readonly AMPLITUDE = 10;

  private chunkNumber: number;
  private noise: NoiseFunction2D;
  private heightMap: number[];

  constructor({ chunkNumber, noise }: ChunkOptions) {
    this.chunkNumber = chunkNumber;
    this.noise = noise;
    this.heightMap = this.generateHeightMap();
    this.generateGrass();
  }

  private generateHeightMap(): number[] {
    const heightMap = [];
    const baseSampleX = this.chunkNumber * Chunk.WIDTH * Chunk.SAMPLE_SCALE;
    const halfAmplitude = Chunk.AMPLITUDE / 2;

    // For each block
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

  // generateDirt(startX: number, heightMap: number[]) {
  //   heightMap.forEach((y, x) => {
  //     for (let i = 0; i < y; i++) {
  //       new Block({
  //         x: startX + x,
  //         y: i,
  //         color: 'brown',
  //         isStatic: true,
  //         timeScale: 0,
  //         slop: 0
  //       });
  //     }
  //   });
  // }
}
