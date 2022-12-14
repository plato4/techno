import "./menu.css";

import React, { useEffect, useState } from "react";

import * as Scenes from "../../game/scenes/GameScene";
import * as Interpreter from "../../game/components/Interpreter";
import Memory from "./Memory";
import Instructions from "./Instructions";
import Tabs from "./Tabs";
import { useGameContext } from "../app/App";

const Menu: React.FC = () => {
	const [update, setUpdate] = useState({});
	const [interpreter, setInterpreter] = useState<Interpreter.Interpreter>();
	const { game } = useGameContext();

	useEffect(() => {
		if (game) {
			// this delays the use effect until phaser scene manager has fully loaded in the scenes
			game.events.once("poststep", () => {
				if (game && game.scene.getScene("GameScene")) {
					(game.scene.getScene("GameScene") as Scenes.GameScene).setUpdateHook =
						() => setUpdate({});
					(
						game.scene.getScene("GameScene") as Scenes.GameScene
					).setInterpreterHook = (i: Interpreter.Interpreter) =>
						setInterpreter(i);
				}
			});
		}
	}, [game]);

	return interpreter ? (
		<div className="menu-container fly-in">
			<div className="bit-container glow menu">
				<div className="bit-title glow">CODE</div>
				<div className="menu-left">
					<Memory interpreter={interpreter} />
					<Instructions interpreter={interpreter} />
				</div>
				<div className="menu-right">
					<Tabs />
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default Menu;
