import "./tab.css";

import React, { useState } from "react";
import { useGameContext } from "../app/App";
import * as Scenes from "../../game/scenes/GameScene";

const Tab: React.FC<{ label: string }> = ({ label }) => {
	const [clicked, setClicked] = useState(false);
	const { game } = useGameContext();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setClicked(true);
		(game?.scene.getScene("GameScene") as Scenes.GameScene)?.playSound("boop");
	};
	return (
		<div className="bit-button no-pad centered tab" onClick={(e) => onClick(e)}>
			<p className="bit-text">{label}</p>
		</div>
	);
};

export default Tab;
