/* eslint-disable @typescript-eslint/no-empty-function */
import Component from "../Component";

export interface IInterpreterStatus {
	line: number;
	msg: string;
	error: boolean;
}

export interface IParameter {
	value: number;
	type: ParamterType;
}

export type Memory = Array<number>;

export enum ParamterType {
	Constant,
	Memory,
	Indirect,
}

enum Comparison {
	NO,
	ET,
	GT,
	LT,
}

export enum Jump {
	JMP,
	JET,
	JGT,
	JLT,
	JNE,
}

export enum Action {
	ADD,
	SUB,
	SET,
}

export class Interpreter extends Component {
	private pointer = 1;
	private instructions: Instruction[] = [];
	private memory: Memory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	private comparison = Comparison.NO;
	public observers: { (interpreter: Interpreter): void }[] = [];
	public onStart(): void {}
	public onUpdate(): void {}
	public onDestroy(): void {}

	public step(): IInterpreterStatus {
		if (this.pointer >= this.instructions.length)
			return { line: this.pointer, msg: "EOP", error: true };

		const instruction = this.instructions[this.pointer];

		if (instruction instanceof Nop || instruction instanceof Lbl)
			this.pointer++;
		else if (instruction instanceof Cmp) {
			if (!this.handleCompare(instruction))
				return { line: this.pointer, msg: "cmp error", error: true };
			this.pointer++;
		} else if (instruction instanceof Jmp) {
			if (!this.handleJump(instruction))
				return { line: this.pointer, msg: "jmp error", error: true };
		} else if (instruction instanceof Opr) {
			if (!this.handleOperation(instruction))
				return { line: this.pointer, msg: "opr error", error: true };
			this.pointer++;
		}

		this.observers?.forEach((v) => {
			v(this);
		});

		return { line: this.pointer, msg: "OK", error: false };
	}

	public getMemory(): Memory {
		return this.memory;
	}

	public getInstructions(): Instruction[] {
		return this.instructions;
	}

	public addInstruction(index: number, instruction: Instruction) {
		this.instructions.splice(index, 0, instruction);
	}

	public removeInstruction(index: number) {
		this.instructions.splice(index, 1);
	}

	private handleJump(jmp: Jmp): boolean {
		const value = this.resolveValue(jmp.value);
		if (value === undefined) return false;

		if (
			jmp.jump === Jump.JMP ||
			(jmp.jump === Jump.JET && this.comparison === Comparison.ET) ||
			(jmp.jump === Jump.JGT && this.comparison === Comparison.GT) ||
			(jmp.jump === Jump.JLT && this.comparison === Comparison.LT) ||
			(jmp.jump === Jump.JNE && this.comparison !== Comparison.ET)
		) {
			const index = this.instructions.findIndex(
				(v) => v instanceof Lbl && v.value === value
			);
			if (index === -1) return false;
			this.pointer = index;
		} else this.pointer++;

		return true;
	}

	private handleCompare(cmp: Cmp): boolean {
		const value1 = this.resolveValue(cmp.value1);
		const value2 = this.resolveValue(cmp.value2);

		if (value1 === undefined || value2 === undefined) return false;

		if (value1 === value2) this.comparison = Comparison.ET;
		else if (value1 > value2) this.comparison = Comparison.GT;
		else this.comparison = Comparison.LT;

		return true;
	}

	private handleOperation(opr: Opr): boolean {
		const value1Loc = this.resolveValue(opr.location, true);
		const value1 = this.resolveValue(opr.location);
		const value2 = this.resolveValue(opr.value);

		if (value1Loc === undefined || value1 === undefined || value2 === undefined)
			return false;
		if (value1Loc > this.memory.length || value1Loc < 0) return false;

		this.memory[value1Loc] =
			opr.action === Action.SET
				? value2
				: opr.action === Action.ADD
				? value1 + value2
				: value1 - value2;
		return true;
	}

	private resolveValue(
		param: IParameter,
		isMemoryLoc = false
	): number | undefined {
		switch (param.type) {
			case ParamterType.Constant:
				return !isMemoryLoc ? param.value : undefined;
			case ParamterType.Memory:
				return !isMemoryLoc ? this.memory[param.value] : param.value;
			case ParamterType.Indirect:
				return !isMemoryLoc
					? this.memory[this.memory[param.value]]
					: this.memory[param.value];
		}
	}
}

export class Instruction {}
export class Nop extends Instruction {}
export class Opr extends Instruction {
	public action = Action.SET;
	public location: IParameter = { value: 0, type: ParamterType.Memory };
	public value: IParameter = { value: 0, type: ParamterType.Constant };
}
export class Cmp extends Instruction {
	public value1: IParameter = { value: 0, type: ParamterType.Constant };
	public value2: IParameter = { value: 0, type: ParamterType.Constant };
}
export class Lbl extends Instruction {
	public value = 0;
}
export class Jmp extends Instruction {
	public jump = Jump.JMP;
	public value: IParameter = { value: 0, type: ParamterType.Constant };
}
