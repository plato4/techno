import "./app.css";
import { useState } from "react";
import React from "react";
import Menu from "../menu/Menu";

//document.addEventListener("contextmenu", (event) => event.preventDefault());

export const App: React.FC = () => {
	const [windowTooSmall, setWindowTooSmall] = useState(false);

	const onResize = () =>
		setWindowTooSmall(
			document.documentElement.clientHeight <= 600 ||
				document.documentElement.clientWidth <= 840
		);

	window.addEventListener("resize", onResize);

	return (
		<>
			<Menu />
			{windowTooSmall ? (
				<div className="window-too-small">The window is too small.</div>
			) : (
				<></>
			)}
		</>
	);
};
