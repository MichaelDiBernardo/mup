import { EngineObject, Vector2, vec2 } from "./ljs/littlejs";
import { OBJECT_PIXEL_SIZE, OBJECT_WORLD_SIZE } from "./constants";

export class Player extends EngineObject {
  constructor(pos: Vector2) {
    super(pos, OBJECT_WORLD_SIZE, 0, OBJECT_PIXEL_SIZE);
    this.pos = pos;
  }

  move(dir: Vector2) {
    this.pos = this.pos.add(dir);
  }
}
