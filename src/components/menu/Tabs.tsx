import React from "react";
import Tab from "./Tab";
import "./tabs.css";

const tabs = () => {
	return (
		<div className="bit-container no-border no-pad tab-container">
			{[
				"LBL",
				"SET",
				"ADD",
				"SUB",
				"CMP",
				"JMP",
				"JET",
				"JNE",
				"JGT",
				"JLT",
			].map((v, i) => (
				<Tab key={i} label={v} />
			))}
		</div>
	);
};

export default tabs;
