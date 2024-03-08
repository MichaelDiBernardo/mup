import { TEST_MAP } from "./fixedlevels";
import { Level } from "./level";
import { Vector2, vec2 } from "./ljs/littlejs";
import { Player } from "./player";

export type GameState = "playingEffects" | "playerTurn" | "readyForEvolve";

export class Mu {
  level: Level;

  constructor() {
    const player = new Player(vec2(0));
    this.level = Level.fromString(player, TEST_MAP);
  }

  handleMovePlayer(dir: Vector2): void {
    this.level.movePlayer(dir);
  }

  state(): GameState {
    return "playerTurn";
  }

  evolve(): void {}
}
