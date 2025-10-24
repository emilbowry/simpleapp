// src/components/cursor/Cursor.tsx

import React, { useEffect, useState } from "react";
import { TRAIL_SPEED } from "./Cursor.consts";
import { largeCursorStyle, smallCursorStyle } from "./Cursor.styles";

const CustomCursor: React.FC = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [largerCursorPosition, setLargerCursorPosition] = useState({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const updateMousePosition = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", updateMousePosition);
		return () => {
			window.removeEventListener("mousemove", updateMousePosition);
		};
	}, []);

	useEffect(() => {
		let animationFrameId: number;
		const animateLargerCursor = () => {
			setLargerCursorPosition((prevPos) => ({
				x: prevPos.x + (mousePosition.x - prevPos.x) * TRAIL_SPEED,
				y: prevPos.y + (mousePosition.y - prevPos.y) * TRAIL_SPEED,
			}));
			animationFrameId = requestAnimationFrame(animateLargerCursor);
		};
		animationFrameId = requestAnimationFrame(animateLargerCursor);
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [mousePosition, TRAIL_SPEED]);
	// const cursorStyle:React.CSSProperties = {cursor:"none !important"}
	return (
		<>
			<style>{`* {cursor: none !important;}`}</style>
			<div style={smallCursorStyle(mousePosition)} />
			<div style={largeCursorStyle(largerCursorPosition)} />
		</>
	);
};

export { CustomCursor };
