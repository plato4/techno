import "./app.css";
import "../../css/bit.css";

import { createContext, useContext, useState } from "react";
import React from "react";

import Menu from "../menu/Menu";
import Game from "../game/Game";

//document.addEventListener("contextmenu", (event) => event.preventDefault());

export type GameContextType = {
	game: Phaser.Game | undefined;
	setGame: (game: Phaser.Game) => void;
};

export const GameContext = createContext<GameContextType>({
	game: undefined,
	setGame: (game) => console.warn("no game provider"),
});

export const useGameContext = () => useContext(GameContext);

const App: React.FC = () => {
	const [windowTooSmall, setWindowTooSmall] = useState(false);
	const [game, setGame] = useState<Phaser.Game>();

	const onResize = () =>
		setWindowTooSmall(
			document.documentElement.clientHeight <= 600 ||
				document.documentElement.clientWidth <= 840
		);

	window.addEventListener("resize", onResize);

	return (
		<GameContext.Provider value={{ game, setGame }}>
			<div>
				<div className="game-layer-container">
					<Game onGameCreate={(g) => setGame(g)} />
				</div>
				<div className="ui-layer-container">
					<Menu game={game} />
				</div>
				{windowTooSmall ? (
					<div className="window-too-small">The window is too small.</div>
				) : (
					<></>
				)}
			</div>
		</GameContext.Provider>
	);
};

export default App;
