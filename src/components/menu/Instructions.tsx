import React from "react";
import { Interpreter } from "../../game/components/Interpreter";
import Instruction from "./Instruction";
import "./instructions.css";

interface InstructionsProps {
	interpreter?: Interpreter;
}

const Instructions: React.FC<InstructionsProps> = ({ interpreter }) => {
	return (
		<div className="bit-container instructions-container">
			<div className="bit-title">INSTRUCTIONS</div>
			<div className="bit-container indent instructions-container-inner center">
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
