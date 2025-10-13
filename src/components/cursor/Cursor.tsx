// src/components/cursor/Cursor.tsx

import React, { useEffect, useState } from "react";
import { largeCursorStyle, smallCursorStyle } from "./Cursor.styles";

const CustomCursor: React.FC = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [largerCursorPosition, setLargerCursorPosition] = useState({
		x: 0,
		y: 0,
	});
	/* const [isHoveringLink, setIsHoveringLink] = useState(false); */

	const trailSpeed = 0.15;

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
				x: prevPos.x + (mousePosition.x - prevPos.x) * trailSpeed,
				y: prevPos.y + (mousePosition.y - prevPos.y) * trailSpeed,
			}));
			animationFrameId = requestAnimationFrame(animateLargerCursor);
		};
		animationFrameId = requestAnimationFrame(animateLargerCursor);
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [mousePosition, trailSpeed]);
	/* 
	useEffect(() => {
		const handleMouseOver = (e: MouseEvent) => {
			if ((e.target as HTMLElement).tagName === "A") {
				setIsHoveringLink(true);
			}
		};
		const handleMouseOut = (e: MouseEvent) => {
			if ((e.target as HTMLElement).tagName === "A") {
				setIsHoveringLink(false);
			}
		};
		window.addEventListener("mouseover", handleMouseOver);
		window.addEventListener("mouseout", handleMouseOut);
		return () => {
			window.removeEventListener("mouseover", handleMouseOut);
			window.removeEventListener("mouseout", handleMouseOut);
		};
	}, []);
 */
	const renderDefaultCursor = () => {
		return (
			<>
				<div style={smallCursorStyle(mousePosition)} />
				<div style={largeCursorStyle(largerCursorPosition)} />
			</>
		);
	};

	return renderDefaultCursor();
};

export { CustomCursor };
