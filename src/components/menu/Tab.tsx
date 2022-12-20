import "./tab.css";

import React, { useState } from "react";

const Tab: React.FC<{
	label: string;
	onButtonDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	onButtonPopped: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ label, onButtonDown, onButtonPopped }) => {
	const [isDragged, setIsDragged] = useState(false);

	const buttonDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		onButtonDown(e);
		let drag = false;
		document.onmousemove = (ee) => {
			if (
				!drag &&
				((ee.clientX - e.clientX) ** 2 + (ee.clientY - e.clientY) ** 2) ** 0.5 >
					32
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
	};

	return (
		<div
			className={"bit-button no-pad centered tab".concat(
				isDragged ? " is-dragged" : ""
			)}
			onMouseDown={(e) => buttonDown(e)}
		>
			<p className="bit-text">{label}</p>
		</div>
	);
};

export const FloatingTab: React.FC<{
	label: string;
	pos: [number, number];
}> = ({ label, pos }) => {
	return (
		<div
			className="bit-button no-pad centered tab floating"
			style={{ left: pos[0], top: pos[1] }}
		>
			<p className="bit-text">{label}</p>
		</div>
	);
};

export default Tab;
