// src/comonents/background/Background.tsx

import React from "react";
import globalstyles from "../../GlobalStyles.module.css";
import backgroundPattern from "../../assets/bavkground.png";

export const Background: React.FC = () => (
	<div
		className={globalstyles.backgroundPattern}
		style={{ backgroundImage: `url(${backgroundPattern})` }}
	></div>
);
