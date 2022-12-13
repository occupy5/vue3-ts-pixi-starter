import * as PIXI from 'pixi.js';
import { Controller } from './controller';

const SPRITE_PATH = 'player.png';

let engine: PIXI.Application;
let hasTicker = false;
let player: PIXI.Sprite | undefined;
let MOVEMENT = {
    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false,
    SPRINT: false,
};

async function createPlayer(_engine: PIXI.Application) {
    if (!engine) {
        engine = _engine;
        // ARROW UP
        Controller.addKeyDownEvent(38, () => (MOVEMENT.UP = true));
        Controller.addKeyUpEvent(38, () => (MOVEMENT.UP = false));
        // ARROW LEFT
        Controller.addKeyDownEvent(37, () => (MOVEMENT.LEFT = true));
        Controller.addKeyUpEvent(37, () => (MOVEMENT.LEFT = false));
        // ARROW LEFT
        Controller.addKeyDownEvent(40, () => (MOVEMENT.DOWN = true));
        Controller.addKeyUpEvent(40, () => (MOVEMENT.DOWN = false));
        // ARROW RIGHT
        Controller.addKeyDownEvent(39, () => (MOVEMENT.RIGHT = true));
        Controller.addKeyUpEvent(39, () => (MOVEMENT.RIGHT = false));
        // LEFT SHIFT
        Controller.addKeyDownEvent(16, () => (MOVEMENT.SPRINT = true));
        Controller.addKeyUpEvent(16, () => (MOVEMENT.SPRINT = false));
    }

    player = new PIXI.Sprite(PIXI.Texture.from(SPRITE_PATH));

    player.anchor.set(0.5);
    player.scale.x = 0.1;
    player.scale.y = 0.1;
    player.position = {
        x: 800 / 2,
        y: 600 / 2,
    };

    engine.stage.addChild(player);

    if (hasTicker) {
        engine.ticker.remove(tick);
        hasTicker = false;
    }

    hasTicker = true;
    engine.ticker.add(tick);
}

function removePlayer() {
    if (typeof player === 'undefined') {
        return;
    }

    engine.stage.removeChild(player);
    player = undefined;
}

function get() {
    return player;
}

function tick(delta: number) {
    if (typeof player === 'undefined') {
        return;
    }

    // player.rotation += 0.1 * delta;

    let speed = 1.25;

    if (MOVEMENT.SPRINT) {
        speed += 0.75;
    }

    if (MOVEMENT.UP) {
        player.position.y -= speed;
    }

    if (MOVEMENT.DOWN) {
        player.position.y += speed;
    }

    if (MOVEMENT.RIGHT) {
        player.position.x += speed;
        player.transform.skew.set(-0.15, 0);
    }

    if (MOVEMENT.LEFT) {
        player.position.x -= speed;
        player.transform.skew.set(0.15, 0);
    }

    if (!MOVEMENT.LEFT && !MOVEMENT.RIGHT) {
        player.transform.skew.set(0, 0);
    }
}

export { createPlayer, removePlayer, get };
