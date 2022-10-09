import React, { useState } from "react";
import { Interpreter } from "../../game/components/Interpreter";
import Instruction from "./Instruction";
import "./menu.css";
import Tab from "./Tab";

export let setInterpreterProxy: (interpreter: Interpreter) => void;

const Menu = () => {
	const [interpreter, setInterpreter] = useState<Interpreter>();
	const [memoryChanged, setMemoryChanged] = useState({});

	interpreter?.observers?.push(() => setMemoryChanged({}));

	setInterpreterProxy = (interpreter) => setInterpreter(interpreter);
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
