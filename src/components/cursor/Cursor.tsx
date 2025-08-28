// src/components/cursor/Cursor.tsx

import React, { useEffect, useState } from "react";

const cursorStyles: React.CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	width: "15px",
	height: "15px",
	backgroundColor: "white",
	borderRadius: "50%",
	pointerEvents: "none",
	mixBlendMode: "difference",
	zIndex: 9999,
};

const CustomCursor: React.FC = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updateMousePosition = (e: MouseEvent) => {
			setPosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", updateMousePosition);

		return () => {
			window.removeEventListener("mousemove", updateMousePosition);
		};
	}, []);

	const dynamicCursorStyles: React.CSSProperties = {
		...cursorStyles,
		left: `${position.x}px`,
		top: `${position.y}px`,
	};

	return (
		<div
			// className="custom-cursor"
			style={dynamicCursorStyles}
		/>
	);
};

export default CustomCursor;
