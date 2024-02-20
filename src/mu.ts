import { Vector2, vec2 } from "./ljs/littlejs";
import { Monster } from "./monster";
import { Player } from "./player";
import { randint } from "./random";

function makeMonster(): Monster {
  while (true) {
    const pos = vec2(randint(0, 5), randint(0, 5));
    if (pos.x !== 0 || pos.y !== 0) {
      return new Monster(pos);
    }
  }
}

export class Mu {
  player: Player;
  monsters: Array<Monster>;

  constructor() {
    this.player = new Player(vec2(0));
    this.monsters = Array<Monster>();
    for (let i = 0; i < 5; i++) {
      this.monsters.push(makeMonster());
    }
  }

  handleMovePlayer(dir: Vector2) {
    this.player.move(dir);
  }
}
