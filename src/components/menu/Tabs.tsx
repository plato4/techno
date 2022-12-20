import React, { useContext } from "react";
import Tab from "./Tab";
import "./tabs.css";
import * as Scenes from "../../game/scenes/GameScene";
import { GameContext } from "../app/App";

const tabs = () => {
	const { game } = useContext(GameContext);
	return (
		<div className="tab-container">
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
				<Tab
					key={i}
					label={v}
					onButtonDown={(e) => {
						(game?.scene.getScene("GameScene") as Scenes.GameScene)?.playSound(
							"boop",
							{ detune: 0 - i * 100 }
						);
					}}
					onButtonPopped={(e) => {
						(game?.scene.getScene("GameScene") as Scenes.GameScene)?.playSound(
							"pop"
						);
					}}
				/>
			))}
		</div>
	);
};
export default tabs;
