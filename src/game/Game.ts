import "phaser";
import { PreloadScene, MenuScene, GameScene } from "./scenes";

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
	scene: typeof PreloadScene[];
	parent: string;
}

export const config: IConfig = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	backgroundColor: "#0",
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.ScaleModes.ENVELOP,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH,
	},
	scene: [PreloadScene, MenuScene, GameScene],
	parent: "game",
};

export const createGame = () => new Phaser.Game(config);
