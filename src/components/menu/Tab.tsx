import "./tab.css";

import React from "react";

const Tab: React.FC<{
	label: string;
	onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ label, onClick }) => {
	return (
		<div className="bit-button no-pad centered tab" onClick={(e) => onClick(e)}>
			<p className="bit-text">{label}</p>
		</div>
	);
};

export default Tab;
