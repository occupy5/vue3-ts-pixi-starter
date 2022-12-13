import * as PIXI from 'pixi.js';

const BG_PATH = 'bg.png';

let engine: PIXI.Application;
let bg: PIXI.Sprite | undefined;

export async function createBackground(_engine: PIXI.Application) {
    if(!engine) {
        engine = _engine;
    }

    bg = new PIXI.Sprite(PIXI.Texture.from(BG_PATH));
    bg.width = engine.screen.width;
    bg.height = engine.screen.height;
    engine.stage.addChild(bg);
}