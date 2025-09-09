// src/components/cursor/Cursor.tsx

import React, { useEffect, useState } from "react";
import { logo_yellow, logo_blue } from "../../utils/defaultColours";

interface CustomCursorProps {
	hoverTime?: number;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ hoverTime = 1 }) => {
	const HEXAGON_CURSOR_SIZE = 20;

	const TRIANGLE_SIDE_LENGTH = HEXAGON_CURSOR_SIZE / 4;

	const TRIANGLE_HEIGHT = Math.round(TRIANGLE_SIDE_LENGTH * Math.sqrt(3));

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

	const baseCursorStyle: React.CSSProperties = {
		position: "fixed",
		backgroundColor: "white",
		borderRadius: "50%",
		pointerEvents: "none",
		mixBlendMode: "difference",
		zIndex: 9999,
	};

	const s_size = 10;
	const smallCursorStyle: React.CSSProperties = {
		...baseCursorStyle,
		width: `${s_size}px`,
		height: `${s_size}px`,
		left: `${mousePosition.x - s_size / 2}px`,
		top: `${mousePosition.y - s_size / 2}px`,
	};

	const l_size = 30;
	const largeCursorStyle: React.CSSProperties = {
		...baseCursorStyle,
		width: `${l_size}px`,
		height: `${l_size}px`,
		left: `${largerCursorPosition.x - l_size / 2}px`,
		top: `${largerCursorPosition.y - l_size / 2}px`,
	};

	const triangleColors = [
		...Array(12).fill(logo_yellow),
		...Array(12).fill(logo_blue),
	];

	const keyframes = `
    @keyframes blink {
      0% { opacity: 0.1; }
      30% { opacity: 1; }
      100% { opacity: 0.1; }
    }
  `;

	const hexagonContainerStyle: React.CSSProperties = {
		position: "fixed",
		left: `${mousePosition.x}px`,
		top: `${mousePosition.y}px`,
		transform: "translate(-50%, -50%)",
		pointerEvents: "none",
		zIndex: 9999,
		width: `${HEXAGON_CURSOR_SIZE}px`,

		height: `${Math.round(Math.sqrt(3) * (HEXAGON_CURSOR_SIZE / 2))}px`,
	};

	const hexagonLoaderStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		height: "100%",
	};

	const rowStyle: React.CSSProperties = {
		display: "flex",
	};

	const baseArrowStyle: React.CSSProperties = {
		width: 0,
		height: 0,
		margin: `0 ${-TRIANGLE_SIDE_LENGTH / 2}px`,
		borderLeft: `${TRIANGLE_SIDE_LENGTH}px solid transparent`,
		borderRight: `${TRIANGLE_SIDE_LENGTH}px solid transparent`,
		borderBottom: `${TRIANGLE_HEIGHT}px solid transparent`,
		animation: `blink ${hoverTime}s infinite`,
	};

	const downArrowStyle: React.CSSProperties = {
		transform: "rotate(180deg)",
	};

	const getAnimationDelay = (
		type: "outer" | "inner",
		index: number
	): React.CSSProperties => {
		const delay =
			type === "outer"
				? -((hoverTime / 18) * index)
				: -((hoverTime / 6) * index);
		return { animationDelay: `${delay}s` };
	};

	const renderHexagonCursor = () => {
		let tri_idx = 0;
		return (
			<>
				<style>{keyframes}</style>
				<div style={hexagonContainerStyle}>
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
				<div style={smallCursorStyle} />
				<div style={largeCursorStyle} />
			</>
		);
	};

	return isHoveringLink ? renderHexagonCursor() : renderDefaultCursor();
};

export default CustomCursor;
