import { NoiseFunction2D, createNoise2D } from 'simplex-noise';
import Block from 'Block';

export default class Terrain {
  static readonly AMPLITUDE = 10;
  static readonly INTERVAL = 0.05;
  static readonly WIDTH = 64;

  noise: NoiseFunction2D;

  constructor() {
    this.noise = createNoise2D();
    const heightMap = this.generateHeightMap();
    this.generateBlocks(heightMap);
  }

  generateHeightMap(): number[] {
    const heightMap = [];
    const halfAmplitude = Terrain.AMPLITUDE / 2;

    for (let i = 0; i < Terrain.WIDTH * Terrain.INTERVAL; i += Terrain.INTERVAL) {
      const y = Math.round(this.noise(i, 0) * halfAmplitude + halfAmplitude);
      heightMap.push(y);
    }

    return heightMap;
  }

  generateBlocks(heightMap: number[]) {
    this.generateGrass(heightMap);
    this.generateDirt(heightMap);
  }

  generateGrass(heightMap: number[]) {
    heightMap.forEach((y, x) => {
      new Block({
        x,
        y,
        color: 'green',
        isStatic: true
      });
    });
  }

  generateDirt(heightMap: number[]) {
    heightMap.forEach((y, x) => {
      for (let i = 0; i < y; i++) {
        new Block({
          x,
          y: i,
          color: 'brown',
          isStatic: true
        });
      }
    });
  }
}
