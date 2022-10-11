/* eslint-disable @typescript-eslint/no-empty-function */
import "phaser";
import { GameObjects } from "phaser";
import { setInterpreterProxy } from "../../components/menu/Menu";
import {
	Action,
	Interpreter,
	Jmp,
	Lbl,
	Opr,
	ParamterType,
} from "../components/Interpreter";

export class GameScene extends Phaser.Scene {
	public interpreter?: Interpreter;
	public date: Date;
	constructor() {
		super("GameScene");
		this.date = new Date();
	}

	public init(): void {}
	public preload(): void {}
	public create(): void {
		this.interpreter = new Interpreter(
			new GameObjects.GameObject(this, "interpreter"),
			"interpreter"
		);
		setInterpreterProxy(this.interpreter);

		this.interpreter.addInstruction(0, new Lbl());
		const opr = new Opr();
		opr.action = Action.ADD;
		opr.location = { type: ParamterType.Memory, value: 0 };
		opr.value = { type: ParamterType.Constant, value: 1 };
		this.interpreter.addInstruction(1, opr);
		this.interpreter.addInstruction(2, new Jmp());
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public update(time: number, delta: number): void {
		//console.log(this.interpreter?.step());
		console.log(this.date);
	}
}
