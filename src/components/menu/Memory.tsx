import React from "react";
import { Interpreter } from "../../game/components/Interpreter";
import "./memory.css";

interface MemoryProps {
	interpreter?: Interpreter;
}

const Memory: React.FC<MemoryProps> = ({ interpreter }) => {
	return (
		<div className="bit-container memory-container">
			<div className="title">Memory</div>
			<div className="memory-container-inner center">
				{interpreter ? (
					interpreter.getMemory().map((v, i) => (
						<div
							key={i}
							className="bit-text-field centered border shadow-inset memory-element"
						>
							<p className="bit-text">{v}</p>
						</div>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Memory;
