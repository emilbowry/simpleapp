// // // // src/components/cursor/Cursor.tsx

// // // import React, { useEffect, useState } from "react";

// // // import { logo_yellow, logo_blue } from "../../utils/defaultColours";

// // // interface CustomCursorProps {
// // // 	hoverSize?: number;
// // // 	hoverTime?: number;
// // // }

// // // const CustomCursor: React.FC<CustomCursorProps> = ({
// // // 	hoverSize = 5,
// // // 	hoverTime = 1,
// // // }) => {
// // // 	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// // // 	const [largerCursorPosition, setLargerCursorPosition] = useState({
// // // 		x: 0,
// // // 		y: 0,
// // // 	});
// // // 	const [isHoveringLink, setIsHoveringLink] = useState(false);

// // // 	const trailSpeed = 0.15;

// // // 	useEffect(() => {
// // // 		const updateMousePosition = (e: MouseEvent) => {
// // // 			setMousePosition({ x: e.clientX, y: e.clientY });
// // // 		};
// // // 		window.addEventListener("mousemove", updateMousePosition);
// // // 		return () => {
// // // 			window.removeEventListener("mousemove", updateMousePosition);
// // // 		};
// // // 	}, []);

// // // 	useEffect(() => {
// // // 		let animationFrameId: number;
// // // 		const animateLargerCursor = () => {
// // // 			setLargerCursorPosition((prevPos) => ({
// // // 				x: prevPos.x + (mousePosition.x - prevPos.x) * trailSpeed,
// // // 				y: prevPos.y + (mousePosition.y - prevPos.y) * trailSpeed,
// // // 			}));
// // // 			animationFrameId = requestAnimationFrame(animateLargerCursor);
// // // 		};
// // // 		animationFrameId = requestAnimationFrame(animateLargerCursor);
// // // 		return () => {
// // // 			cancelAnimationFrame(animationFrameId);
// // // 		};
// // // 	}, [mousePosition, trailSpeed]);

// // // 	useEffect(() => {
// // // 		const handleMouseOver = (e: MouseEvent) => {
// // // 			if ((e.target as HTMLElement).tagName === "A") {
// // // 				setIsHoveringLink(true);
// // // 			}
// // // 		};
// // // 		const handleMouseOut = (e: MouseEvent) => {
// // // 			if ((e.target as HTMLElement).tagName === "A") {
// // // 				setIsHoveringLink(false);
// // // 			}
// // // 		};
// // // 		window.addEventListener("mouseover", handleMouseOver);
// // // 		window.addEventListener("mouseout", handleMouseOut);
// // // 		return () => {
// // // 			window.removeEventListener("mouseover", handleMouseOut);
// // // 			window.removeEventListener("mouseout", handleMouseOut);
// // // 		};
// // // 	}, []);

// // // 	const baseCursorStyle: React.CSSProperties = {
// // // 		position: "fixed",
// // // 		backgroundColor: "white",
// // // 		borderRadius: "50%",
// // // 		pointerEvents: "none",
// // // 		mixBlendMode: "difference",
// // // 		zIndex: 9999,
// // // 	};

// // // 	const s_size = 10;
// // // 	const smallCursorStyle: React.CSSProperties = {
// // // 		...baseCursorStyle,
// // // 		width: `${s_size}px`,
// // // 		height: `${s_size}px`,
// // // 		left: `${mousePosition.x - s_size / 2}px`,
// // // 		top: `${mousePosition.y - s_size / 2}px`,
// // // 	};

// // // 	const l_size = 30;
// // // 	const largeCursorStyle: React.CSSProperties = {
// // // 		...baseCursorStyle,
// // // 		width: `${l_size}px`,
// // // 		height: `${l_size}px`,
// // // 		left: `${largerCursorPosition.x - l_size / 2}px`,
// // // 		top: `${largerCursorPosition.y - l_size / 2}px`,
// // // 	};

// // // 	const triangleColors = [
// // // 		...Array(12).fill(logo_yellow),
// // // 		...Array(12).fill(logo_blue),
// // // 	];

// // // 	const keyframes = `
// // //     @keyframes blink {
// // //       0% { opacity: 0.1; }
// // //       30% { opacity: 1; }
// // //       100% { opacity: 0.1; }
// // //     }
// // //   `;

// // // 	const hexagonContainerStyle: React.CSSProperties = {
// // // 		position: "fixed",
// // // 		left: `${mousePosition.x}px`,
// // // 		top: `${mousePosition.y}px`,
// // // 		transform: "translate(-50%, -50%)",
// // // 		pointerEvents: "none",
// // // 		zIndex: 9999,
// // // 	};

// // // 	const hexagonLoaderStyle: React.CSSProperties = {
// // // 		display: "flex",
// // // 		flexDirection: "column",
// // // 		alignItems: "center",
// // // 	};

// // // 	const rowStyle: React.CSSProperties = {
// // // 		display: "flex",
// // // 	};

// // // 	const baseArrowStyle: React.CSSProperties = {
// // // 		width: 0,
// // // 		height: 0,
// // // 		margin: `0 ${-hoverSize / 2}px`,
// // // 		borderLeft: `${hoverSize}px solid transparent`,
// // // 		borderRight: `${hoverSize}px solid transparent`,

// // // 		borderBottom: `${hoverSize * Math.sqrt(3)}px solid transparent`,
// // // 		animation: `blink ${hoverTime}s infinite`,
// // // 	};

// // // 	const downArrowStyle: React.CSSProperties = {
// // // 		transform: "rotate(180deg)",
// // // 	};

// // // 	const getAnimationDelay = (
// // // 		type: "outer" | "inner",
// // // 		index: number
// // // 	): React.CSSProperties => {
// // // 		const delay =
// // // 			type === "outer"
// // // 				? -((hoverTime / 18) * index)
// // // 				: -((hoverTime / 6) * index);
// // // 		return { animationDelay: `${delay}s` };
// // // 	};

// // // 	const renderHexagonCursor = () => {
// // // 		let tri_idx = 0;
// // // 		return (
// // // 			<>
// // // 				<style>{keyframes}</style>
// // // 				<div style={hexagonContainerStyle}>
// // // 					<div style={hexagonLoaderStyle}>
// // // 						<div style={rowStyle}>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("outer", 18),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("outer", 17),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("outer", 16),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("outer", 15),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("outer", 14),
// // // 								}}
// // // 							></div>
// // // 						</div>
// // // 						<div style={rowStyle}>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("outer", 1),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("outer", 2),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("inner", 6),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("inner", 5),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("inner", 4),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("outer", 13),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("outer", 12),
// // // 								}}
// // // 							></div>
// // // 						</div>
// // // 						<div style={rowStyle}>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("outer", 3),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("outer", 4),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("inner", 1),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("inner", 2),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("inner", 3),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("outer", 11),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("outer", 10),
// // // 								}}
// // // 							></div>
// // // 						</div>
// // // 						<div style={rowStyle}>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("outer", 5),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("outer", 6),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("outer", 7),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...getAnimationDelay("outer", 8),
// // // 								}}
// // // 							></div>
// // // 							<div
// // // 								style={{
// // // 									...baseArrowStyle,
// // // 									borderBottomColor:
// // // 										triangleColors[tri_idx++],
// // // 									...downArrowStyle,
// // // 									...getAnimationDelay("outer", 9),
// // // 								}}
// // // 							></div>
// // // 						</div>
// // // 					</div>
// // // 				</div>
// // // 			</>
// // // 		);
// // // 	};

// // // 	const renderDefaultCursor = () => {
// // // 		return (
// // // 			<>
// // // 				<div style={smallCursorStyle} />
// // // 				<div style={largeCursorStyle} />
// // // 			</>
// // // 		);
// // // 	};

// // // 	return isHoveringLink ? renderHexagonCursor() : renderDefaultCursor();
// // // };

// // // export default CustomCursor;
// // import React, { useEffect, useState } from "react";
// // import { logo_yellow, logo_blue } from "../../utils/defaultColours";

// // interface CustomCursorProps {
// // 	// hoverSize prop removed as it's now hardcoded
// // 	hoverTime?: number;
// // }

// // const CustomCursor: React.FC<CustomCursorProps> = ({
// // 	// hoverSize is no longer destructured
// // 	hoverTime = 1,
// // }) => {
// // 	// Hardcoded hexagon size
// // 	const HEXAGON_SIZE = 20; // Hardcoded at 20px

// // 	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// // 	const [largerCursorPosition, setLargerCursorPosition] = useState({
// // 		x: 0,
// // 		y: 0,
// // 	});
// // 	const [isHoveringLink, setIsHoveringLink] = useState(false);

// // 	const trailSpeed = 0.15;

// // 	// --- MOUSE TRACKING & ANIMATION LOGIC ---
// // 	useEffect(() => {
// // 		const updateMousePosition = (e: MouseEvent) => {
// // 			setMousePosition({ x: e.clientX, y: e.clientY });
// // 		};
// // 		window.addEventListener("mousemove", updateMousePosition);
// // 		return () => {
// // 			window.removeEventListener("mousemove", updateMousePosition);
// // 		};
// // 	}, []);

// // 	useEffect(() => {
// // 		let animationFrameId: number;
// // 		const animateLargerCursor = () => {
// // 			setLargerCursorPosition((prevPos) => ({
// // 				x: prevPos.x + (mousePosition.x - prevPos.x) * trailSpeed,
// // 				y: prevPos.y + (mousePosition.y - prevPos.y) * trailSpeed,
// // 			}));
// // 			animationFrameId = requestAnimationFrame(animateLargerCursor);
// // 		};
// // 		animationFrameId = requestAnimationFrame(animateLargerCursor);
// // 		return () => {
// // 			cancelAnimationFrame(animationFrameId);
// // 		};
// // 	}, [mousePosition, trailSpeed]);

// // 	useEffect(() => {
// // 		const handleMouseOver = (e: MouseEvent) => {
// // 			if ((e.target as HTMLElement).tagName === "A") {
// // 				setIsHoveringLink(true);
// // 			}
// // 		};
// // 		const handleMouseOut = (e: MouseEvent) => {
// // 			if ((e.target as HTMLElement).tagName === "A") {
// // 				setIsHoveringLink(false);
// // 			}
// // 		};
// // 		window.addEventListener("mouseover", handleMouseOver);
// // 		window.addEventListener("mouseout", handleMouseOut);
// // 		return () => {
// // 			window.removeEventListener("mouseover", handleMouseOut);
// // 			window.removeEventListener("mouseout", handleMouseOut);
// // 		};
// // 	}, []);

// // 	// --- STYLES FOR THE DEFAULT CURSOR ---
// // 	const baseCursorStyle: React.CSSProperties = {
// // 		position: "fixed",
// // 		backgroundColor: "white",
// // 		borderRadius: "50%",
// // 		pointerEvents: "none",
// // 		mixBlendMode: "difference",
// // 		zIndex: 9999,
// // 	};

// // 	const s_size = 10;
// // 	const smallCursorStyle: React.CSSProperties = {
// // 		...baseCursorStyle,
// // 		width: `${s_size}px`,
// // 		height: `${s_size}px`,
// // 		left: `${mousePosition.x - s_size / 2}px`,
// // 		top: `${mousePosition.y - s_size / 2}px`,
// // 	};

// // 	const l_size = 30;
// // 	const largeCursorStyle: React.CSSProperties = {
// // 		...baseCursorStyle,
// // 		width: `${l_size}px`,
// // 		height: `${l_size}px`,
// // 		left: `${largerCursorPosition.x - l_size / 2}px`,
// // 		top: `${largerCursorPosition.y - l_size / 2}px`,
// // 	};

// // 	// --- LOGIC AND STYLES FOR THE HEXAGON (LINK HOVER) CURSOR ---

// // 	// Array to distribute colors across the triangles (24 total)
// // 	const triangleColors = [
// // 		...Array(12).fill(logo_yellow), // First 12 triangles are yellow
// // 		...Array(12).fill(logo_blue), // Next 12 triangles are blue
// // 	];

// // 	const keyframes = `
// //     @keyframes blink {
// //       0% { opacity: 0.1; }
// //       30% { opacity: 1; }
// //       100% { opacity: 0.1; }
// //     }
// //   `;

// // 	const hexagonContainerStyle: React.CSSProperties = {
// // 		position: "fixed",
// // 		left: `${mousePosition.x}px`,
// // 		top: `${mousePosition.y}px`,
// // 		transform: "translate(-50%, -50%)",
// // 		pointerEvents: "none",
// // 		zIndex: 9999,
// // 	};

// // 	const hexagonLoaderStyle: React.CSSProperties = {
// // 		display: "flex",
// // 		flexDirection: "column",
// // 		alignItems: "center",
// // 	};

// // 	const rowStyle: React.CSSProperties = {
// // 		display: "flex",
// // 	};

// // 	const baseArrowStyle: React.CSSProperties = {
// // 		width: 0,
// // 		height: 0,
// // 		margin: `0 ${-HEXAGON_SIZE / 2}px`,
// // 		borderLeft: `${HEXAGON_SIZE}px solid transparent`,
// // 		borderRight: `${HEXAGON_SIZE}px solid transparent`,
// // 		// Adjusted borderBottom to be a whole pixel value for HEXAGON_SIZE = 20
// // 		borderBottom: `${35}px solid transparent`, // 20px * 1.75 = 35px
// // 		animation: `blink ${hoverTime}s infinite`,
// // 	};

// // 	const downArrowStyle: React.CSSProperties = {
// // 		transform: "rotate(180deg)",
// // 	};

// // 	const getAnimationDelay = (
// // 		type: "outer" | "inner",
// // 		index: number
// // 	): React.CSSProperties => {
// // 		const delay =
// // 			type === "outer"
// // 				? -((hoverTime / 18) * index)
// // 				: -((hoverTime / 6) * index);
// // 		return { animationDelay: `${delay}s` };
// // 	};

// // 	// --- RENDER HELPER FUNCTIONS ---

// // 	const renderHexagonCursor = () => {
// // 		let tri_idx = 0; // Index to pick color from triangleColors array
// // 		return (
// // 			<>
// // 				<style>{keyframes}</style>
// // 				<div style={hexagonContainerStyle}>
// // 					<div style={hexagonLoaderStyle}>
// // 						<div style={rowStyle}>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("outer", 18),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("outer", 17),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("outer", 16),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("outer", 15),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("outer", 14),
// // 								}}
// // 							></div>
// // 						</div>
// // 						<div style={rowStyle}>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("outer", 1),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("outer", 2),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("inner", 6),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("inner", 5),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("inner", 4),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("outer", 13),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("outer", 12),
// // 								}}
// // 							></div>
// // 						</div>
// // 						<div style={rowStyle}>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("outer", 3),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("outer", 4),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("inner", 1),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("inner", 2),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("inner", 3),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("outer", 11),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("outer", 10),
// // 								}}
// // 							></div>
// // 						</div>
// // 						<div style={rowStyle}>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("outer", 5),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("outer", 6),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("outer", 7),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...getAnimationDelay("outer", 8),
// // 								}}
// // 							></div>
// // 							<div
// // 								style={{
// // 									...baseArrowStyle,
// // 									borderBottomColor:
// // 										triangleColors[tri_idx++],
// // 									...downArrowStyle,
// // 									...getAnimationDelay("outer", 9),
// // 								}}
// // 							></div>
// // 						</div>
// // 					</div>
// // 				</div>
// // 			</>
// // 		);
// // 	};

// // 	const renderDefaultCursor = () => {
// // 		return (
// // 			<>
// // 				<div style={smallCursorStyle} />
// // 				<div style={largeCursorStyle} />
// // 			</>
// // 		);
// // 	};

// // 	// --- MAIN RENDER LOGIC ---
// // 	return isHoveringLink ? renderHexagonCursor() : renderDefaultCursor();
// // };

// // export default CustomCursor;
// import React, { useEffect, useState } from "react";
// import { logo_yellow, logo_blue } from "../../utils/defaultColours";

// interface CustomCursorProps {
//   hoverTime?: number;
// }

// const CustomCursor: React.FC<CustomCursorProps> = ({
//   hoverTime = 1,
// }) => {
//   // --- Define overall hexagon cursor dimensions ---
//   const HEXAGON_CURSOR_SIZE = 40; // Overall width of the hexagon cursor (e.g., 40px)

//   // Derived triangle dimensions based on the overall cursor size
//   // The widest row has 7 triangles, and each triangle's 'side' (border-left/right)
//   // contributes to the overall width. A rough estimate for scaling.
//   const TRIANGLE_SIDE_LENGTH = HEXAGON_CURSOR_SIZE / 7;
//   // Ensure borderBottom is a whole pixel value for better rendering at 100%
//   const TRIANGLE_HEIGHT = Math.round(TRIANGLE_SIDE_LENGTH * Math.sqrt(3));

//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [largerCursorPosition, setLargerCursorPosition] = useState({ x: 0, y: 0 });
//   const [isHoveringLink, setIsHoveringLink] = useState(false);

//   const trailSpeed = 0.15;

//   // --- MOUSE TRACKING & ANIMATION LOGIC (UNCHANGED) ---
//   useEffect(() => { /* ... */ }, []);
//   useEffect(() => { /* ... */ }, [mousePosition, trailSpeed]);
//   useEffect(() => { /* ... */ }, []);

//   // --- STYLES FOR THE DEFAULT CURSOR (UNCHANGED, except small/large sizes) ---
//   const baseCursorStyle: React.CSSProperties = { /* ... */ };

//   const s_size = 10; // Small cursor size
//   const smallCursorStyle: React.CSSProperties = { /* ... */ };

//   const l_size = 30; // Large cursor size
//   const largeCursorStyle: React.CSSProperties = { /* ... */ };

//   // --- LOGIC AND STYLES FOR THE HEXAGON (LINK HOVER) CURSOR ---

//   const triangleColors = [ /* ... */ ]; // Unchanged

//   const keyframes = `
//     @keyframes blink {
//       0% { opacity: 0.1; }
//       30% { opacity: 1; }
//       100% { opacity: 0.1; }
//     }
//   `;

//   const hexagonContainerStyle: React.CSSProperties = {
//     position: 'fixed',
//     left: `${mousePosition.x}px`,
//     top: `${mousePosition.y}px`,
//     transform: 'translate(-50%, -50%)',
//     pointerEvents: 'none',
//     zIndex: 9999,
//     // Set overall width and height for the entire hexagon cursor
//     width: `${HEXAGON_CURSOR_SIZE}px`,
//     // Height of a hexagon is roughly (sqrt(3)/2) * width * 2 = sqrt(3) * width
//     // Or, more accurately for our triangle stack: 4 rows of triangles, each (TRIANGLE_HEIGHT)
//     // with some overlap. Let's approximate it for now.
//     height: `${TRIANGLE_HEIGHT * 4 * 0.8}px`, // Rough estimate for height based on 4 rows and overlap
//   };

//   const hexagonLoaderStyle: React.CSSProperties = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     // Ensure the loader itself takes up the container space
//     width: '100%',
//     height: '100%',
//   };

//   const rowStyle: React.CSSProperties = {
//     display: 'flex',
//   };

//   const baseArrowStyle: React.CSSProperties = {
//     width: 0,
//     height: 0,
//     // Use the derived TRIANGLE_SIDE_LENGTH
//     margin: `0 ${-TRIANGLE_SIDE_LENGTH / 2}px`,
//     borderLeft: `${TRIANGLE_SIDE_LENGTH}px solid transparent`,
//     borderRight: `${TRIANGLE_SIDE_LENGTH}px solid transparent`,
//     borderBottom: `${TRIANGLE_HEIGHT}px solid transparent`, // Use derived and rounded height
//     animation: `blink ${hoverTime}s infinite`,
//   };

//   const downArrowStyle: React.CSSProperties = {
//     transform: 'rotate(180deg)',
//   };

//   const getAnimationDelay = (type: 'outer' | 'inner', index: number): React.CSSProperties => {
//     const delay = type === 'outer' ? -((hoverTime / 18) * index) : -((hoverTime / 6) * index);
//     return { animationDelay: `${delay}s` };
//   };

//   // --- RENDER HELPER FUNCTIONS (UNCHANGED, except using new constants) ---
//   const renderHexagonCursor = () => { /* ... */ };
//   const renderDefaultCursor = () => { /* ... */ };

//   // --- MAIN RENDER LOGIC (UNCHANGED) ---
//   return isHoveringLink ? renderHexagonCursor() : renderDefaultCursor();
// };

// export default CustomCursor;
import React, { useEffect, useState } from "react";
import { logo_yellow, logo_blue } from "../../utils/defaultColours";

interface CustomCursorProps {
	hoverTime?: number;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ hoverTime = 1 }) => {
	// --- Define overall hexagon cursor dimensions ---
	const HEXAGON_CURSOR_SIZE = 20; // Overall width of the hexagon cursor (e.g., 40px)

	// Corrected geometric derivation for individual triangle dimensions
	// Based on the widest part of the hexagon being 4 * TRIANGLE_SIDE_LENGTH
	const TRIANGLE_SIDE_LENGTH = HEXAGON_CURSOR_SIZE / 4;
	// Height of an equilateral triangle with 'side' as TRIANGLE_SIDE_LENGTH
	// We round to the nearest whole pixel for better rendering at 100% zoom
	const TRIANGLE_HEIGHT = Math.round(TRIANGLE_SIDE_LENGTH * Math.sqrt(3));

	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [largerCursorPosition, setLargerCursorPosition] = useState({
		x: 0,
		y: 0,
	});
	const [isHoveringLink, setIsHoveringLink] = useState(false);

	const trailSpeed = 0.15;

	// --- MOUSE TRACKING & ANIMATION LOGIC ---
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

	// --- STYLES FOR THE DEFAULT CURSOR ---
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

	// --- LOGIC AND STYLES FOR THE HEXAGON (LINK HOVER) CURSOR ---

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
		// The height of the hexagon is roughly 2 * TRIANGLE_HEIGHT (for the middle section)
		// plus the height of the top and bottom rows.
		// A regular hexagon's height is (sqrt(3)) * R, where R is the side length.
		// Here, R = HEXAGON_CURSOR_SIZE / 2.
		// So, height = Math.sqrt(3) * (HEXAGON_CURSOR_SIZE / 2)
		height: `${Math.round(Math.sqrt(3) * (HEXAGON_CURSOR_SIZE / 2))}px`,
	};

	const hexagonLoaderStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%", // Ensure the loader fills its container
		height: "100%", // Ensure the loader fills its container
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

	// --- RENDER HELPER FUNCTIONS ---

	const renderHexagonCursor = () => {
		let tri_idx = 0; // Index to pick color from triangleColors array
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

	// --- MAIN RENDER LOGIC ---
	return isHoveringLink ? renderHexagonCursor() : renderDefaultCursor();
};

export default CustomCursor;
