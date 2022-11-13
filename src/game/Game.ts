import "phaser";

import * as Scenes from "./scenes";

export interface IConfig {
	type: number;
	width: number;
	height: number;
	backgroundColor: string;
	pixelArt: boolean;
	scale: {
		mode: Phaser.Scale.ScaleModes;
		autoCenter: Phaser.Scale.Center;
	};
	scene: typeof Phaser.Scene[];
	parent: string;
}

export const config: IConfig = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	backgroundColor: "#333333",
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.ScaleModes.ENVELOP,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH,
	},
	scene: [Scenes.PreloadScene, Scenes.MenuScene, Scenes.GameScene],
	parent: "game",
};

export const createGame = () => new Phaser.Game(config);
