import { Color, drawRect, engineInit, vec2 } from "./ljs/littlejs";
import { Monster } from "./monster";
import { Player } from "./player";
import { randint } from "./random";

const TILES = new URL("tiles.png", import.meta.url);

let player: Player;
const monsters = Array<Monster>();

function makeMonster(): Monster {
  while (true) {
    const pos = vec2(randint(0, 5), randint(0, 5));
    if (pos.x !== 0 || pos.y !== 0) {
      return new Monster(pos);
    }
  }
}

function gameInit() {
  // called once after the engine starts up
  // setup the game
  player = new Player(vec2(0));
  for (let i = 0; i < 5; i++) {
    monsters.push(makeMonster());
  }
}

function gameUpdate() {
  // called every frame at 60 frames per second
  // handle input and update the game state
}

function gameUpdatePost() {
  // called after physics and objects are updated
  // setup camera and prepare for render
}

function gameRender() {
  // called before objects are rendered
  // draw any background effects that appear behind objects
  drawRect(vec2(0), vec2(100), new Color(0, 0.2, 0));
}

function gameRenderPost() {
  // called after objects are rendered
  // draw effects or hud that appear above all objects
}

// Startup LittleJS Engine
engineInit(
  gameInit,
  gameUpdate,
  gameUpdatePost,
  gameRender,
  gameRenderPost,
  TILES.toString()
);
