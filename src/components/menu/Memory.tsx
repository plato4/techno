import React from "react";
import { Interpreter } from "../../game/components/Interpreter";
import "./memory.css";

interface MemoryProps {
	interpreter?: Interpreter;
}

const Memory: React.FC<MemoryProps> = ({ interpreter }) => {
	return (
		<div className="memory-container">
			{interpreter ? (
				interpreter.getMemory().map((v, i) => (
					<div key={i} className="memory-element">
						{v}
					</div>
				))
			) : (
				<></>
			)}
		</div>
	);
};

export default Memory;
