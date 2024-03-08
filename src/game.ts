import { OBJECT_PIXEL_SIZE, OBJECT_WORLD_SIZE } from "./constants";
import {
  Color,
  cameraPos,
  drawRect,
  drawText,
  drawTile,
  engineInit,
  keyWasPressed,
  setCameraPos,
  setCameraScale,
  setCanvasFixedSize,
  vec2,
} from "./ljs/littlejs";
import { Mu } from "./mu";
import { ALL_STATS, StatKey } from "./stats";

const TILES = new URL("tiles.png", import.meta.url);

const mu = new Mu();

const Directions = {
  UP: vec2(0, 1),
  DOWN: vec2(0, -1),
  LEFT: vec2(-1, 0),
  RIGHT: vec2(1, 0),
};

function gameInit() {
  // called once after the engine starts up
  // setup the game
  setCanvasFixedSize(vec2(1920, 1080));
  setCameraScale(128);
}

function gameUpdate() {
  // called every frame at 60 frames per second
  // handle input and update the game state

  const state = mu.state();
  if (state === "playingEffects") {
    return;
  } else if (state === "playerTurn") {
    _checkInput();
  } else {
    mu.evolve();
  }
}

function gameUpdatePost() {
  // called after physics and objects are updated
  // setup camera and prepare for render
  setCameraPos(mu.level.player.pos);
}

function gameRender() {
  // called before objects are rendered
  // draw any background effects that appear behind objects
  drawRect(vec2(0), vec2(100), new Color(0, 0, 0));

  const map = mu.level.map;
  for (let x = 0; x < map.size.x; x++) {
    for (let y = 0; y < map.size.y; y++) {
      const cell = map.getCellAt(vec2(x, y));
      drawTile(
        cell.pos,
        OBJECT_WORLD_SIZE,
        cell.terrain.tile,
        OBJECT_PIXEL_SIZE
      );
    }
  }
}

function gameRenderPost() {
  // called after objects are rendered
  // draw effects or hud that appear above all objects
  const statColor = new Color();
  const fontSize = 0.4;

  ALL_STATS.forEach((key, i) => {
    drawText(
      `${key.toLocaleUpperCase()}: ${mu.level.player.stats.get(key).current}`,
      cameraPos.add(vec2(-7.2, 3.7 - i / 2)),
      fontSize,
      statColor,
      0,
      new Color(),
      "left",
      "Courier"
    );
  });
}

function _checkInput(): void {
  if (keyWasPressed(37)) {
    mu.handleMovePlayer(Directions.LEFT);
  } else if (keyWasPressed(39)) {
    mu.handleMovePlayer(Directions.RIGHT);
  } else if (keyWasPressed(38)) {
    mu.handleMovePlayer(Directions.UP);
  } else if (keyWasPressed(40)) {
    mu.handleMovePlayer(Directions.DOWN);
  }
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
