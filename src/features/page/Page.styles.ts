import React from "react";

const pageStyle: React.CSSProperties = {
	flexGrow: "1",
	position: "relative",
	flexDirection: "column", // Have to do both
};
const mainStyle: React.CSSProperties = {
	position: "relative",
	height: "100%",
	maxWidth: "100%",
	overflow: "clip",
	display: "flex",
	flexDirection: "column",
	zIndex: "5",
};

export { mainStyle, pageStyle };
