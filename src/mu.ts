import { Level } from "./level";
import { Vector2, vec2 } from "./ljs/littlejs";
import { Player } from "./player";

export class Mu {
  level: Level;

  constructor() {
    const player = new Player(vec2(0));
    this.level = new Level(player);
  }

  handleMovePlayer(dir: Vector2): void {
    this.level.movePlayer(dir);
  }
}
