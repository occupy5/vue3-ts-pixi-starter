import * as PIXI from 'pixi.js';
import { createBackground } from './background';
import { createPlayer } from './player';

let engine: PIXI.Application;

export async function initContainer(_engine: PIXI.Application) {
    if (!engine) {
        engine = _engine;
    }

    let container = new PIXI.Container();
    engine.stage.addChild(container)
    container.addChild(await createBackground(engine))
    container.addChild(await createPlayer(engine));
}