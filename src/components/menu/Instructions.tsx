import React from "react";
import { Interpreter } from "../../game/components/Interpreter";
import Instruction from "./Instruction";
import "./instructions.css";

interface InstructionsProps {
	interpreter?: Interpreter;
}

const Instructions: React.FC<InstructionsProps> = ({ interpreter }) => {
	return (
		<div className="instructions-container">
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
	);
};

export default Instructions;
