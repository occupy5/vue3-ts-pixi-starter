import * as PIXI from 'pixi.js';
import { createBackground } from '../pixi/background';
import { createPlayer } from '../pixi/player';
import { PixiEngine } from '../pixi/engine';
import { Scenes } from '../pixi/scenes';

const SCENE_NAME = 'Main';
let engine: PIXI.Application;

function SceneMain() {
    console.log(`LOADED MAIN SCENE`);
    if (!engine) {
        engine = PixiEngine.get();
    }
    createBackground(engine)
    createPlayer(engine);
}

function SceneMainUnload() {
    if (!engine) {
        engine = PixiEngine.get();
    }
}

function init() {
    Scenes.addScene(SCENE_NAME, SceneMain, SceneMainUnload);
    Scenes.loadScene(SCENE_NAME);
}

export const MainScene = {
    init,
};
