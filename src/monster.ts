import { OBJECT_PIXEL_SIZE, OBJECT_WORLD_SIZE } from "./constants";
import { EngineObject, Vector2, randInt } from "./ljs/littlejs";
import { Stats, StatKey } from "./stats";

export class Monster extends EngineObject {
  id: number;
  stats: Stats;

  constructor(id: number, pos: Vector2) {
    super(pos, OBJECT_WORLD_SIZE, randInt(1, 16), OBJECT_PIXEL_SIZE);
    this.id = id;
    this.stats = new Stats({
      [StatKey.HP]: 2,
      [StatKey.ATK]: 1,
      [StatKey.DEF]: 1,
      [StatKey.SPD]: 1,
      [StatKey.INS]: 1,
    });
  }
}
