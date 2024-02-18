import { EngineObject, vec2 } from "./ljs/littlejs";

export class Player extends EngineObject {
  constructor() {
    super(vec2(0, 0), vec2(1, 1), 0, vec2(8));
  }
}
