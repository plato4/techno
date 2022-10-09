import "phaser";
import { PreloadScene, MenuScene, GameScene } from "./scenes";
export class Game {
	public static instance: Phaser.Game;
	public config = {
		type: Phaser.AUTO,
		width: 1920,
		height: 1080,
		backgroundColor: "#0",
		pixelArt: true,
		scale: {
			mode: Phaser.Scale.ScaleModes.ENVELOP,
			autoCenter: Phaser.Scale.Center.CENTER_BOTH,
		},
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	constructor(gameScenes: typeof Phaser.Scene[], parent = "game") {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(this.config as any).scene = gameScenes;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(this.config as any).parent = parent;
		Game.instance = new Phaser.Game(this.config);
	}
}

export const createGame = (parent: string): Game => {
	const s = [PreloadScene, MenuScene, GameScene];
	return new Game(s, parent);
};
