import { Enemy } from "./enemy";
import { Cannon } from "./cannon";

export class GameState {
    level = 0;
    demonPalette = 0;
    demonType = 0;
    backgroundColor = 0;
    baseColor = 0;
    bunkers = 3;
    bunkerColor = 0;
    score = 0;
    cannon = new Cannon();
    enemies = new Array<Enemy>();

    setLevel(level: number) {
        this.level = level;
        this.demonPalette = level % 7;
        this.demonType = (level >> 1) % 6;
    }
}

export const state = new GameState();