import { OBJECT_PIXEL_SIZE, OBJECT_WORLD_SIZE } from "./constants";
import { EngineObject, Vector2, vec2 } from "./ljs/littlejs";

export class Level {
  map: Cell[][];

  constructor() {
    this.map = [];
    for (let x = 0; x < 16; x++) {
      this.map[x] = [];
      for (let y = 0; y < 16; y++) {
        this.map[x][y] = new Cell(vec2(x, y));
      }
    }
  }
}

export class Cell {
  pos: Vector2;
  tileIndex: number;

  constructor(pos: Vector2) {
    this.pos = pos;
    this.tileIndex = 512;
  }
}
