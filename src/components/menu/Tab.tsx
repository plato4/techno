import "./tab.css";

import React, { useState } from "react";

const Tab: React.FC<{
	label: string;
	onButtonDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	onButtonPopped: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ label, onButtonDown, onButtonPopped }) => {
	const [isDragged, setIsDragged] = useState(false);
	return (
		<div
			className={"bit-button no-pad centered tab".concat(
				isDragged ? " is-dragged" : ""
			)}
			onMouseDown={(e) => {
				onButtonDown(e);
				let drag = false;
				document.onmousemove = (ee) => {
					if (
						!drag &&
						Math.abs(e.clientX - ee.clientX + (e.clientY - ee.clientY)) > 15
					) {
						drag = true;
						setIsDragged(true);
						onButtonPopped(e);
					}
				};
				document.onmouseup = () => {
					setIsDragged(false);
					document.onmousemove = null;
					document.onmouseup = null;
				};
			}}
		>
			<p className="bit-text">{label}</p>
		</div>
	);
};

export default Tab;
