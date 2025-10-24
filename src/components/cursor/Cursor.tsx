// src/components/cursor/Cursor.tsx

import React, { useEffect, useState } from "react";
import { TRAIL_SPEED } from "./Cursor.consts";
import { largeCursorStyle, smallCursorStyle } from "./Cursor.styles";
import { IPosition } from "./Cursor.types";

const useMousePosition = (): IPosition => {
	const [mouse_position, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updateMousePosition = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", updateMousePosition);
		return () => {
			window.removeEventListener("mousemove", updateMousePosition);
		};
	}, []);
	return mouse_position;
};

const useTrailingPosition = (
	target_position: IPosition,
	trail_speed = TRAIL_SPEED
) => {
	const [trailing_position, setTrailingCursorPosition] =
		useState(target_position);

	useEffect(() => {
		let animationFrameId: number;
		const animateLargerCursor = () => {
			setTrailingCursorPosition((prevPos) => ({
				x: prevPos.x + (target_position.x - prevPos.x) * trail_speed,
				y: prevPos.y + (target_position.y - prevPos.y) * trail_speed,
			}));
			animationFrameId = requestAnimationFrame(animateLargerCursor);
		};
		animationFrameId = requestAnimationFrame(animateLargerCursor);
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [target_position, trail_speed]);

	return trailing_position;
};
const CustomCursor: React.FC = () => {
	const mouse_position = useMousePosition();
	const trailing_position = useTrailingPosition(mouse_position);

	return (
		<>
			<style>{`* {cursor: none !important;}`}</style>
			<div style={smallCursorStyle(mouse_position)} />
			<div style={largeCursorStyle(trailing_position)} />
		</>
	);
};

export { CustomCursor };
