import React, { useEffect } from "react";
import { config, createGame } from "../../game";

const Game: React.FC = () => {
	const [game, setGame] = React.useState<Phaser.Game>();
	useEffect(() => {
		const _game = createGame();
		setGame(_game);
		return (): void => {
			_game.destroy(true);
			setGame(undefined);
		};
	}, []);
	return <div id={config.parent} />;
};

export default Game;
