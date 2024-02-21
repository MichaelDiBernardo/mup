import { ASSERT, Vector2, randInt, vec2 } from "./ljs/littlejs";
import { Monster } from "./monster";
import { Player } from "./player";
import { MONSTER_DEATH_SOUND } from "./sound";

export class Cell {
  pos: Vector2;
  tileIndex: number;
  monster: Monster | null;

  constructor(pos: Vector2) {
    this.pos = pos;
    this.tileIndex = 512;
    this.monster = null;
  }
}

export class Level {
  player: Player;
  map: Cell[][];
  monsters: Array<Monster>;
  nextMonsterId = 0;

  constructor(player: Player) {
    this.player = player;
    this.makeMap();
    this.makeMonsters();
    this.placePlayer();
  }

  movePlayer(dir: Vector2) {
    const dest = this.player.pos.add(dir);
    const monster = this.getMonsterAt(dest);

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
    const cell = this.map[pos.x][pos.y];
    ASSERT(cell.monster !== null);
    cell.monster = null;
  }

  private makeMap(): void {
    this.map = [];

    for (let x = 0; x < 16; x++) {
      this.map[x] = [];
      for (let y = 0; y < 16; y++) {
        this.map[x][y] = new Cell(vec2(x, y));
      }
    }
  }

  private makeMonsters(): void {
    this.monsters = Array<Monster>();
    for (let i = 0; i < 5; i++) {
      this.makeMonster();
    }
  }

  private makeMonster(): void {
    let pos: Vector2;
    while (true) {
      pos = vec2(randInt(0, 16), randInt(0, 16));
      if (!this.getMonsterAt(pos) && !(pos.x === 0 && pos.y === 0)) {
        break;
      }
    }
    const monster = new Monster(this.nextMonsterId, pos);
    this.monsters.push(monster);
    this.placeMonster(monster);
    this.nextMonsterId++;
  }

  private placePlayer(): void {
    this.player.pos = vec2(8);
  }
}
