import "./app.css";

import { useState } from "react";
import React from "react";

import Menu from "../menu/Menu";
import Game from "../game/Game";

//document.addEventListener("contextmenu", (event) => event.preventDefault());

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
		<div className="ui-layer-container">
			<Menu game={game} />
			<Game onGameCreate={(g) => setGame(g)} />
			{windowTooSmall ? (
				<div className="window-too-small">The window is too small.</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default App;
