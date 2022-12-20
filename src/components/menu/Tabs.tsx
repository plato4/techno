import React, { useContext, useState } from "react";
import Tab, { FloatingTab } from "./Tab";
import "./tabs.css";
import * as Scenes from "../../game/scenes/GameScene";
import { GameContext } from "../app/App";

const tabs = () => {
	const { game } = useContext(GameContext);
	const [floatingTabText, setFloatingTabText] = useState<string>();
	const [xy, setXY] = useState<[number, number]>([0, 0]);

	const pop = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		text: string
	) => {
		(game?.scene.getScene("GameScene") as Scenes.GameScene)?.playSound("pop");
		setFloatingTabText(text);
		document.onmousemove = (ee) => {
			setXY([
				ee.clientX - (e.target as HTMLDivElement).clientWidth,
				ee.clientY - (e.target as HTMLDivElement).clientHeight,
			]);
		};
		document.onmouseup = (ee) => {
			setXY([0, 0]);
			setFloatingTabText(undefined);
		};
	};

	const boop = (i: number) => {
		(game?.scene.getScene("GameScene") as Scenes.GameScene)?.playSound("boop", {
			detune: 0 - i * 100,
		});
	};

	return (
		<div className="tab-container">
			{floatingTabText ? (
				<FloatingTab label={floatingTabText} pos={xy} />
			) : (
				<></>
			)}
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
					onButtonDown={() => boop(i)}
					onButtonPopped={(e) => pop(e, v)}
				/>
			))}
		</div>
	);
};
export default tabs;
