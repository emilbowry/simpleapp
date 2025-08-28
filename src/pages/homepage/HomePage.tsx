// src/App.tsx
import React, { useEffect, useState } from "react";
import { Hero } from "./parts/Hero";

// const cursorStyles: React.CSSProperties = {
// 	position: "fixed",
// 	top: 0,
// 	left: 0,
// 	width: "30px",
// 	height: "30px",
// 	backgroundColor: "white",
// 	borderRadius: "50%",
// 	pointerEvents: "none",

// 	mixBlendMode: "difference",
// 	zIndex: 9999,
// };

// const CustomCursor: React.FC = () => {
// 	const [position, setPosition] = useState({ x: 0, y: 0 });

// 	useEffect(() => {
// 		const updateMousePosition = (e: MouseEvent) => {
// 			setPosition({ x: e.clientX, y: e.clientY });
// 		};

// 		window.addEventListener("mousemove", updateMousePosition);

// 		return () => {
// 			window.removeEventListener("mousemove", updateMousePosition);
// 		};
// 	}, []);

// 	const dynamicCursorStyles: React.CSSProperties = {
// 		...cursorStyles,
// 		left: `${position.x}px`,
// 		top: `${position.y}px`,
// 	};

// 	return (
// 		<div
// 			className="custom-cursor"
// 			style={dynamicCursorStyles}
// 		/>
// 	);
// };

// export default CustomCursor;
const homePage: React.FC = () => {
	return (
		<section>
			<Hero />
		</section>
	);
};

import { Page } from "../page";
// import CustomCursor from "../../components/cursor/Cursor";

export const HomePage = (
	<Page
		page={homePage}
		bg={true}
	/>
);
