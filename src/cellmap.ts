import { Vector2, vec2 } from "./ljs/littlejs";
import { Monster } from "./monster";
import { TerrainTile, TerrainType } from "./types";
import { dump } from "./utils";

/**
 * Single location in a map. Called "Cell" because "Tile" is used by littlejs,
 * and it would be confusing to overload the term.
 */
export class Cell {
  pos: Vector2;
  monster: Monster | null;
  terrainType: TerrainType;
  terrainTile: TerrainTile;

  constructor(
    pos: Vector2,
    terrainType: TerrainType,
    terrainTile: TerrainTile
  ) {
    this.pos = pos;
    this.monster = null;
    this.terrainType = terrainType;
    this.terrainTile = terrainTile;
  }
}

/**
 * A map of the cells in a level. Called "CellMap" instead of Map because
 * typescript has a dictionary type called Map and it would be confusing to
 * overload the term.
 */
export class CellMap {
  private map: Cell[][] = [];
  size: Vector2;

  constructor(size: Vector2) {
    this.size = size;
    for (let y = 0; y < size.y; y++) {
      this.map[y] = [];
    }
  }

  getCellAt(pos: Vector2): Cell {
    return this.map[pos.y][pos.x];
  }

  setCellAt(pos: Vector2, cell: Cell) {
    this.map[pos.y][pos.x] = cell;
  }
}
