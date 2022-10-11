import "./menu.css";

import React, { useEffect, useState } from "react";

import Instruction from "./Instruction";
import Tab from "./Tab";
import * as Scenes from "../../game/scenes/GameScene";
import * as Interpreter from "../../game/components/Interpreter";

export interface MenuProps {
	game?: Phaser.Game;
}

const Menu: React.FC<MenuProps> = ({ game }) => {
	const [update, setUpdate] = useState({});
	const [interpreter, setInterpreter] = useState<Interpreter.Interpreter>();

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
	});

	return (
		<div className="menu flyin">
			<div className="menu-left">
				<div className="menu-memory">
					{interpreter ? (
						interpreter.getMemory().map((v, i) => (
							<div key={i} className="menu-memory-element">
								{v}
							</div>
						))
					) : (
						<></>
					)}
				</div>
				<div className="menu-instructions">
					<div className="instructions-line-number"></div>
					<div className="instructions">
						{interpreter ? (
							interpreter
								.getInstructions()
								.map((v, i) => <Instruction key={i} instruction={v} />)
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
			<div className="menu-right">
				<div className="menu-right-padding" />
				<div className="menu-right-tab-container">
					{[
						"LBL",
						"SET",
						"ADD",
						"SUB",
						"CMP",
						"JMP",
						"JET",
						"JNE",
						"JGT",
						"JLT",
					].map((v, i) => (
						<Tab key={i} label={v} />
					))}
				</div>
				<div className="menu-right-padding" />
			</div>
		</div>
	);
};

export default Menu;
