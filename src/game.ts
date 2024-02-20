import {
  Color,
  drawRect,
  engineInit,
  keyWasPressed,
  setCameraPos,
  setCameraScale,
  setCanvasFixedSize,
  vec2,
} from "./ljs/littlejs";
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
  setCanvasFixedSize(vec2(1920, 1080));
  player = new Player(vec2(0));
  for (let i = 0; i < 5; i++) {
    monsters.push(makeMonster());
  }
}

function gameUpdate() {
  // called every frame at 60 frames per second
  // handle input and update the game state
  if (keyWasPressed(37)) {
    player.pos.x -= 1;
  } else if (keyWasPressed(39)) {
    player.pos.x += 1;
  } else if (keyWasPressed(38)) {
    player.pos.y += 1;
  } else if (keyWasPressed(40)) {
    player.pos.y -= 1;
  }
}

function gameUpdatePost() {
  // called after physics and objects are updated
  // setup camera and prepare for render
  setCameraPos(player.pos);
  setCameraScale(128);
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
