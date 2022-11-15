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
			renderable = <Compare instruction={instruction as Interpreter.Cmp} />;
			break;
		case Interpreter.Opr:
			renderable = <Operation instruction={instruction as Interpreter.Opr} />;
			break;
		case Interpreter.Nop:
			renderable = <></>;
			break;
	}

	return (
		<div className="bit-button no-pad centered border emboss instruction">
			{renderable}
		</div>
	);
};

export interface CompareProps {
	instruction: Interpreter.Cmp;
}

const Compare: React.FC<CompareProps> = ({ instruction }) => {
	return (
		<div>
			{"CMP" +
				["", "#", ">#"][instruction.value1.type] +
				+instruction.value1.value +
				" " +
				["", "#", ">#"][instruction.value2.type] +
				+instruction.value2.value}
		</div>
	);
};

export interface OperationProps {
	instruction: Interpreter.Opr;
}

const Operation: React.FC<OperationProps> = ({ instruction }) => {
	return (
		<div>
			{["ADD", "SUB", "SET"][instruction.action] +
				" " +
				["", "#", ">#"][instruction.location.type] +
				+instruction.location.value +
				" " +
				["", "#", ">#"][instruction.value.type] +
				+instruction.value.value}
		</div>
	);
};

export interface LabelProps {
	instruction: Interpreter.Lbl;
}
const Label: React.FC<LabelProps> = ({ instruction }) => {
	return <div>{"LBL " + instruction.value}</div>;
};

export interface JumpProps {
	instruction: Interpreter.Jmp;
}
const Jump: React.FC<JumpProps> = ({ instruction }) => {
	return (
		<div>
			{["JMP", "JET", "JGT", "JLT", "JNE"][instruction.jump] +
				" " +
				["", "#", ">#"][instruction.value.type] +
				+instruction.value.value}
		</div>
	);
};

export default Instruction;
