import { EngineObject, Vector2 } from "./ljs/littlejs";
import { OBJECT_PIXEL_SIZE, OBJECT_WORLD_SIZE } from "./constants";
import { Stats, StatKey } from "./stats";

export class Player extends EngineObject {
  stats: Stats;
  isPlayer = true as const;

  constructor(pos: Vector2) {
    super(pos, OBJECT_WORLD_SIZE, 0, OBJECT_PIXEL_SIZE);
    this.pos = pos;
    this.stats = new Stats({
      [StatKey.HP]: 10,
      [StatKey.ATK]: 2,
      [StatKey.DEF]: 1,
      [StatKey.SPD]: 1,
      [StatKey.INS]: 1,
    });
  }

  move(dir: Vector2) {
    this.pos = this.pos.add(dir);
  }
}
