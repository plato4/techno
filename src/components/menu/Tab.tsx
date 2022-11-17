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
			className="bit-container button no-pad centered tab"
			onClick={(e) => onClick(e)}
		>
			<p className="bit-text">{label}</p>
		</div>
	);
};

export default Tab;
