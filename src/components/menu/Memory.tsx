import React from "react";
import { Interpreter } from "../../game/components/Interpreter";
import "./memory.css";

interface MemoryProps {
	interpreter?: Interpreter;
}

const Memory: React.FC<MemoryProps> = ({ interpreter }) => {
	return (
		<div className="bit-container memory-container">
			<div className="bit-title">MEMORY</div>
			<div className="memory-container-inner center">
				{interpreter ? (
					interpreter.getMemory().map((v, i) => (
						<div
							key={i}
							className="bit-container indent centered memory-element"
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
