import * as PIXI from 'pixi.js';

const BG_PATH = 'bg.png';

let engine: PIXI.Application;
let bg: PIXI.Sprite | undefined;

async function createBackground(_engine: PIXI.Application) {
    if(!engine) {
        engine = _engine;
    }

    bg = new PIXI.Sprite(PIXI.Texture.from(BG_PATH));
    bg.width = engine.screen.width;
    bg.height = engine.screen.height;
    return bg;
}

function get() {
    return bg;
}

export {
    createBackground,
    get
}