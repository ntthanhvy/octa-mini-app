import React from "react";
import ReactDOM from "react-dom/client";
import MyApp from "./components/App";

// CSS
import "./index.css";
import "zmp-ui/zaui.css";

// app-config
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
	window.APP_CONFIG = appConfig;
}

var root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(React.createElement(MyApp));
