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
					<text
						key={i}
						className="bit-text-field bit-text is-center memory-element"
					>
						{v}
					</text>
				))
			) : (
				<></>
			)}
		</div>
	);
};

export default Memory;
