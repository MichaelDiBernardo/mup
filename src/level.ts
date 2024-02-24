import { ASSERT, Vector2, randInt, vec2 } from "./ljs/littlejs";
import { Monster } from "./monster";
import { Player } from "./player";
import { BUMP_WALL_SOUND, MONSTER_DEATH_SOUND } from "./sound";
import { TerrainTile, TerrainType, TerrainTypes } from "./types";
import { Cell, CellMap } from "./cellmap";

export class Level {
  map: CellMap;
  player: Player;
  monsters: Monster[] = [];
  nextMonsterId = 0;

  constructor(player: Player, map: CellMap) {
    this.player = player;
    this.map = map;
  }

  movePlayer(dir: Vector2) {
    const dest = this.player.pos.add(dir);
    const cell = this.map.getCellAt(dest);

    if (cell.terrain.solid) {
      BUMP_WALL_SOUND.play();
    } else if (cell.monster) {
      this.killMonster(cell.monster);
    } else {
      this.player.move(dir);
    }
  }

  private killMonster(monster: Monster): void {
    MONSTER_DEATH_SOUND.play();
    monster.destroy();
    this.monsters = this.monsters.filter((m) => m.id !== monster.id);
    this.removeMonsterAtCell(monster.pos);
  }

  private placeMonster(monster: Monster) {
    const cell = this.map.getCellAt(monster.pos);
    ASSERT(cell.monster === null);
    cell.monster = monster;
  }

  private removeMonsterAtCell(pos: Vector2) {
    const cell = this.map.getCellAt(pos);
    ASSERT(cell.monster !== null);
    cell.monster = null;
  }

  private makeMonster(pos: Vector2): void {
    const monster = new Monster(this.nextMonsterId, pos);
    this.monsters.push(monster);
    this.placeMonster(monster);
    this.nextMonsterId++;
  }

  private placePlayer(pos: Vector2): void {
    this.player.pos = pos;
  }

  static fromString(player, str: string): Level {
    const rows = str.split("\n").filter((row) => row.length !== 0);
    const height = rows.length;
    const width = rows[0].length;

    const map = new CellMap(vec2(width, height));
    const level = new Level(player, map);

    for (let y = 0; y < height; y++) {
      const yPos = height - y - 1;
      const row = rows[y];
      for (let x = 0; x < width; x++) {
        const symbol = row.charAt(x);
        const pos = vec2(x, yPos);
        if (symbol === "#") {
          map.setCellAt(pos, new Cell(pos, TerrainTypes.Wall));
        } else if (symbol === " ") {
          map.setCellAt(pos, new Cell(pos, TerrainTypes.Floor));
        } else if (symbol === "p") {
          map.setCellAt(pos, new Cell(pos, TerrainTypes.Floor));
          level.placePlayer(pos);
        } else if (symbol === "m") {
          map.setCellAt(pos, new Cell(pos, TerrainTypes.Floor));
          level.makeMonster(pos);
        }
      }
    }

    return level;
  }
}
