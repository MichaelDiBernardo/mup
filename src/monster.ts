import { OBJECT_PIXEL_SIZE, OBJECT_WORLD_SIZE } from "./constants";
import { EngineObject, Vector2, vec2 } from "./ljs/littlejs";
import { randint } from "./random";

export class Monster extends EngineObject {
  constructor(pos: Vector2) {
    super(pos, OBJECT_WORLD_SIZE, randint(1, 15), OBJECT_PIXEL_SIZE);
    this.pos = pos;
  }
}
