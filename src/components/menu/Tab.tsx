import React, { useState } from "react";
import "./tab.css";

const Tab: React.FC<{ label: string }> = ({ label }) => {
	const [clicked, setClicked] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setClicked(true);
	};
	return (
		<div
			className={clicked ? "tab tab-clicked" : "tab tab-unclicked"}
			onClick={(e) => onClick(e)}
		>
			{label}
		</div>
	);
};

export default Tab;
