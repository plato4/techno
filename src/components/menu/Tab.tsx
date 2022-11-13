import "./tab.css";

import React, { useState } from "react";

const Tab: React.FC<{ label: string }> = ({ label }) => {
	const [clicked, setClicked] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setClicked(true);
	};
	return (
		<div
			className="bit-container no-pad centered emboss tab"
			onClick={(e) => onClick(e)}
		>
			<text className="bit-text">{label}</text>
		</div>
	);
};

export default Tab;
