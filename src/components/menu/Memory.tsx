import React from "react";
import { Interpreter } from "../../game/components/Interpreter";
import "./memory.css";

interface MemoryProps {
	interpreter?: Interpreter;
}

const Memory: React.FC<MemoryProps> = ({ interpreter }) => {
	return (
		<div className="bit-container memory-container">
			{interpreter ? (
				interpreter.getMemory().map((v, i) => (
					<div
						key={i}
						className="bit-text-field centered shadow-inset memory-element"
					>
						<text className="bit-text">{v}</text>
					</div>
				))
			) : (
				<></>
			)}
		</div>
	);
};

export default Memory;
