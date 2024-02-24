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
  map: Cell[][];
  size: Vector2;

  constructor(map: Cell[][], size: Vector2) {
    this.map = map;
    this.size = size;
  }

  getCellAt(pos: Vector2) {
    return this.map[pos.y][pos.x];
  }

  static fromString(str: string): CellMap {
    const map: Cell[][] = [];
    const rows = str.split("\n").filter((row) => row.length !== 0);
    const height = rows.length;
    const width = rows[0].length;
    console.log(dump(rows));

    for (let y = 0; y < height; y++) {
      const yPos = height - y - 1;
      map[yPos] = [];
      const row = rows[y];
      for (let x = 0; x < row.length; x++) {
        const symbol = row.charAt(x);
        const pos = vec2(x, yPos);
        if (symbol === "#") {
          map[yPos][x] = new Cell(pos, TerrainType.Wall, TerrainTile.Rock);
        } /*if (symbol === " " || symbol === "p" || symbol === "m")*/ else {
          map[yPos][x] = new Cell(pos, TerrainType.Floor, TerrainTile.Grass);
        }
      }
    }

    return new CellMap(map, vec2(map[0].length, map.length));
  }
}
