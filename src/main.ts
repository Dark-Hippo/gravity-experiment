import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 600,
    height: 300,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0},
            debug: false
        }
    },
    scene: [
        Boot,
        Preloader,
        // MainMenu,
        MainGame,
        // GameOver
    ]
};

export default new Game(config);
