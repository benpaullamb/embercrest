import Block from 'Block';
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
  private noise: NoiseFunction2D;

  private sun: Sun;
  private clouds: Cloud[];
  private boundaries: Block[];

  public get width() {
    return this.numChunks * Chunk.WIDTH;
  }

  constructor({ numChunks }: LevelOptions) {
    this.numChunks = numChunks;
    this.noise = createNoise2D();
    this.chunks = this.generateChunks();

    this.sun = new Sun();
    this.clouds = this.generateClouds();
    this.boundaries = this.generateBoundaries();
  }

  public update() {
    this.chunks.forEach(chunk => chunk.update());
    this.sun.update();
    this.clouds.forEach(cloud => cloud.update());
    this.boundaries.forEach(boundary => boundary.update());
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

  private generateBoundaries(): Block[] {
    const leftFloorHeight = this.chunks[0].heightMap[0];
    const leftWallHeight = topBlock() - leftFloorHeight;
    const leftWallY = leftFloorHeight + leftWallHeight / 2 + 0.5;
    const leftWall = new Block({
      x: 0,
      y: leftWallY,
      color: 'darkgrey',
      height: leftWallHeight,
      isStatic: true
    });

    const rightFloorHeight = this.chunks[this.numChunks - 1].heightMap[Chunk.WIDTH - 1];
    const rightWallHeight = topBlock() - rightFloorHeight;
    const rightWallX = this.numChunks * Chunk.WIDTH - 1;
    const rightWallY = rightFloorHeight + rightWallHeight / 2 + 0.5;
    const rightWall = new Block({
      x: rightWallX,
      y: rightWallY,
      color: 'darkgrey',
      height: rightWallHeight,
      isStatic: true
    });

    const ceilingWidth = this.numChunks * Chunk.WIDTH;
    const ceilingX = ceilingWidth / 2 - 0.5;
    const ceiling = new Block({
      x: ceilingX,
      y: topBlock() + 1,
      color: 'darkgrey',
      width: ceilingWidth,
      isStatic: true
    });

    return [leftWall, rightWall, ceiling];
  }
}
