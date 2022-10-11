import "./instruction.css";

import React from "react";

import * as Interpreter from "../../game/components/Interpreter";

export interface InstrucionProps {
	instruction: Interpreter.Instruction;
}

const Instruction: React.FC<InstrucionProps> = ({ instruction }) => {
	let renderable = <></>;

	switch (instruction.constructor) {
		case Interpreter.Lbl:
			renderable = <Label instruction={instruction as Interpreter.Lbl} />;
			break;
		case Interpreter.Jmp:
			renderable = <Jump instruction={instruction as Interpreter.Jmp} />;
			break;
		case Interpreter.Cmp:
			renderable = <></>;
			break;
		case Interpreter.Opr:
			renderable = <></>;
			break;
		case Interpreter.Nop:
			renderable = <></>;
			break;
	}

	return <div className="instruction">{renderable}</div>;
};

export interface LabelProps {
	instruction: Interpreter.Lbl;
}
const Label: React.FC<LabelProps> = ({ instruction }) => {
	return <div>{"LBL " + instruction.value.value}</div>;
};

export interface JumpProps {
	instruction: Interpreter.Jmp;
}
const Jump: React.FC<JumpProps> = ({ instruction }) => {
	let text = "JMP";

	switch (instruction.jump) {
		case Interpreter.Jump.JMP:
			text = "JMP";
			break;
		case Interpreter.Jump.JET:
			text = "JET";
			break;
		case Interpreter.Jump.JNE:
			text = "JNE";
			break;
		case Interpreter.Jump.JLT:
			text = "JLT";
			break;
		case Interpreter.Jump.JGT:
			text = "JGT";
			break;
	}

	return <div>{text + " " + instruction.value.value}</div>;
};

export default Instruction;
