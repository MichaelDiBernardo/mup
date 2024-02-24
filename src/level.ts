import { ASSERT, Vector2, randInt, vec2 } from "./ljs/littlejs";
import { Monster } from "./monster";
import { Player } from "./player";
import { MONSTER_DEATH_SOUND } from "./sound";
import { TerrainTile, TerrainType } from "./types";
import { TEST_MAP } from "./fixedlevels";
import { CellMap } from "./cellmap";

export class Level {
  map: CellMap;
  player: Player;
  monsters = new Array<Monster>();
  nextMonsterId = 0;

  constructor(player: Player) {
    this.player = player;
    this.map = CellMap.fromString(TEST_MAP);
    this.placePlayer();
  }

  movePlayer(dir: Vector2) {
    const dest = this.player.pos.add(dir);
    const monster = this.map.getCellAt(dest).monster;

    if (monster) {
      this.killMonster(monster);
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

  private getMonsterAt(pos: Vector2): Monster | null {
    return this.map[pos.x][pos.y].monster;
  }

  private placeMonster(monster: Monster) {
    const cell = this.map[monster.pos.x][monster.pos.y];
    ASSERT(cell.monster === null);
    cell.monster = monster;
  }

  private removeMonsterAtCell(pos: Vector2) {
    const cell = this.map.getCellAt(pos);
    ASSERT(cell.monster !== null);
    cell.monster = null;
  }

  // private makeMonster(pos?: Vector2): void {
  //   if (!pos) {
  //     while (true) {
  //       pos = vec2(randInt(1, this.size.x), randInt(1, this.size.y));
  //       if (!this.getMonsterAt(pos) && !(pos.x === 0 && pos.y === 0)) {
  //         break;
  //       }
  //     }
  //   }
  //   const monster = new Monster(this.nextMonsterId, pos);
  //   this.monsters.push(monster);
  //   this.placeMonster(monster);
  //   this.nextMonsterId++;
  // }

  private placePlayer(pos?: Vector2): void {
    if (!pos) {
      pos = vec2(8);
    }
    this.player.pos = pos;
  }
}
