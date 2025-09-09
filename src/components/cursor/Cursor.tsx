// src/components/cursor/Cursor.tsx

import React, { useEffect, useState } from "react";
import {
	keyframes,
	hexagonContainerStyle,
	hexagonLoaderStyle,
	rowStyle,
	baseArrowStyle,
	triangleColors,
	getAnimationDelay,
	downArrowStyle,
	smallCursorStyle,
	largeCursorStyle,
} from "./Cursor.styles";

const CustomCursor: React.FC = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [largerCursorPosition, setLargerCursorPosition] = useState({
		x: 0,
		y: 0,
	});
	const [isHoveringLink, setIsHoveringLink] = useState(false);

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

	const renderHexagonCursor = () => {
		let tri_idx = 0;
		return (
			<>
				<style>{keyframes}</style>
				<div style={hexagonContainerStyle(mousePosition)}>
					<div style={hexagonLoaderStyle}>
						<div style={rowStyle}>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("outer", 18),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("outer", 17),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("outer", 16),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("outer", 15),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("outer", 14),
								}}
							></div>
						</div>
						<div style={rowStyle}>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("outer", 1),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("outer", 2),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("inner", 6),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("inner", 5),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("inner", 4),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("outer", 13),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("outer", 12),
								}}
							></div>
						</div>
						<div style={rowStyle}>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("outer", 3),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("outer", 4),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("inner", 1),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("inner", 2),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("inner", 3),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("outer", 11),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("outer", 10),
								}}
							></div>
						</div>
						<div style={rowStyle}>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("outer", 5),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("outer", 6),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("outer", 7),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...getAnimationDelay("outer", 8),
								}}
							></div>
							<div
								style={{
									...baseArrowStyle,
									borderBottomColor:
										triangleColors[tri_idx++],
									...downArrowStyle,
									...getAnimationDelay("outer", 9),
								}}
							></div>
						</div>
					</div>
				</div>
			</>
		);
	};

	const renderDefaultCursor = () => {
		return (
			<>
				<div style={smallCursorStyle(mousePosition)} />
				<div style={largeCursorStyle(largerCursorPosition)} />
			</>
		);
	};

	return isHoveringLink ? renderHexagonCursor() : renderDefaultCursor();
};

export default CustomCursor;

// CursorProps or State x,y. State: type of cursor
