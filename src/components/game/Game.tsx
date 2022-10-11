import React, { useEffect } from "react";
import { config, createGame } from "../../game";

export interface GameProps {
	onGameCreate: (game: Phaser.Game) => void;
}

const Game: React.FC<GameProps> = ({ onGameCreate }) => {
	useEffect(() => {
		const _game = createGame();
		onGameCreate(_game);
		return (): void => {
			_game.destroy(true);
		};
	}, []);
	return <div id={config.parent} />;
};

export default Game;
