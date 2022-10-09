import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app/App";
import { createGame } from "./game";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<App />);
createGame("game");
