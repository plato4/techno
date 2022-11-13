/* eslint-disable @typescript-eslint/no-empty-function */
import "phaser";
import { GameObjects } from "phaser";
import * as Interpreter from "../components/Interpreter";

export class GameScene extends Phaser.Scene {
	public interpreter?: Interpreter.Interpreter;
	public setUpdateHook?: () => void;
	public setInterpreterHook?: (interpreter: Interpreter.Interpreter) => void;

	constructor() {
		super("GameScene");
	}

	public init(): void {}
	public preload(): void {}
	public create(): void {
		this.interpreter = new Interpreter.Interpreter(
			new GameObjects.GameObject(this, "interpreter"),
			"interpreter"
		);

		this.interpreter.addInstruction(0, new Interpreter.Lbl());
		const opr = new Interpreter.Opr();
		opr.action = Interpreter.Action.ADD;
		opr.location = { type: Interpreter.ParamterType.Memory, value: 0 };
		opr.value = { type: Interpreter.ParamterType.Constant, value: 1 };
		this.interpreter.addInstruction(1, opr);
		this.interpreter.addInstruction(2, new Interpreter.Jmp());

		if (this.setInterpreterHook) this.setInterpreterHook(this.interpreter);
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public update(time: number, delta: number): void {
		this.interpreter?.step();

		if (this.setUpdateHook) {
			this.setUpdateHook();
		}
	}
}
