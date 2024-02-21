import { Level } from "./level";
import { Vector2, vec2, randInt, ASSERT } from "./ljs/littlejs";
import { Monster } from "./monster";
import { Player } from "./player";
import { MONSTER_DEATH_SOUND } from "./sound";

export class Mu {
  player: Player;
  level: Level;
  monsters: Array<Monster>;
  nextMonsterId = 0;

  constructor() {
    this.player = new Player(vec2(8));
    this.level = new Level();
    this.monsters = Array<Monster>();
    for (let i = 0; i < 5; i++) {
      this.makeMonster();
    }
  }

  handleMovePlayer(dir: Vector2): void {
    const dest = this.player.pos.add(dir);
    const monster = this.getMonsterAt(dest);

    if (monster) {
      this.handlePlayerAttack(monster);
    } else {
      this.player.move(dir);
    }
  }

  handlePlayerAttack(monster: Monster): void {
    MONSTER_DEATH_SOUND.play();
    monster.destroy();
    this.monsters = this.monsters.filter((m) => m.id !== monster.id);
  }

  makeMonster(): void {
    let pos: Vector2;
    while (true) {
      pos = vec2(randInt(0, 16), randInt(0, 16));
      if (!this.getMonsterAt(pos) && !(pos.x === 0 && pos.y === 0)) {
        break;
      }
    }
    this.monsters.push(new Monster(this.nextMonsterId, pos));
    this.nextMonsterId++;
  }

  getMonsterAt(pos: Vector2): Monster | null {
    const found = this.monsters.filter(
      (monster) => monster.pos.distance(pos) < 1
    );

    ASSERT(found.length <= 1);

    if (found.length === 1) {
      return found[0];
    } else {
      return null;
    }
  }
}
