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
			{interpreter ? (
				interpreter
					.getInstructions()
					.map((v, i) => <Instruction key={i} instruction={v} />)
			) : (
				<></>
			)}
		</div>
	);
};

export default Instructions;
