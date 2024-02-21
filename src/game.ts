import { OBJECT_PIXEL_SIZE, OBJECT_WORLD_SIZE } from "./constants";
import {
  Color,
  drawRect,
  drawTile,
  engineInit,
  keyWasPressed,
  setCameraPos,
  setCameraScale,
  setCanvasFixedSize,
  vec2,
} from "./ljs/littlejs";
import { Mu } from "./mu";

const TILES = new URL("tiles.png", import.meta.url);

const mu = new Mu();

function gameInit() {
  // called once after the engine starts up
  // setup the game
  setCanvasFixedSize(vec2(1920, 1080));
  setCameraScale(128);
}

function gameUpdate() {
  // called every frame at 60 frames per second
  // handle input and update the game state
  if (keyWasPressed(37)) {
    mu.handleMovePlayer(vec2(-1, 0));
  } else if (keyWasPressed(39)) {
    mu.handleMovePlayer(vec2(1, 0));
  } else if (keyWasPressed(38)) {
    mu.handleMovePlayer(vec2(0, 1));
  } else if (keyWasPressed(40)) {
    mu.handleMovePlayer(vec2(0, -1));
  }
}

function gameUpdatePost() {
  // called after physics and objects are updated
  // setup camera and prepare for render
  setCameraPos(mu.player.pos);
}

function gameRender() {
  // called before objects are rendered
  // draw any background effects that appear behind objects
  drawRect(vec2(0), vec2(100), new Color(0, 0.2, 0));
  for (let x = 0; x < mu.level.map.length; x++) {
    const row = mu.level.map[x];
    for (let y = 0; y < row.length; y++) {
      const cell = row[y];
      drawTile(cell.pos, OBJECT_WORLD_SIZE, cell.tileIndex, OBJECT_PIXEL_SIZE);
    }
  }
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
