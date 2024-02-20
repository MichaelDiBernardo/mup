import { OBJECT_PIXEL_SIZE, OBJECT_WORLD_SIZE } from "./constants";
import { EngineObject, Vector2, randInt } from "./ljs/littlejs";

export class Monster extends EngineObject {
  constructor(pos: Vector2) {
    super(pos, OBJECT_WORLD_SIZE, randInt(1, 16), OBJECT_PIXEL_SIZE);
    this.pos = pos;
  }
}
