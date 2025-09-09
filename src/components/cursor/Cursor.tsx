// src/components/cursor/Cursor.tsx

import React, { useEffect, useState } from "react";

const cursorStyles: React.CSSProperties = {
	position: "fixed",
	backgroundColor: "white",
	borderRadius: "50%",
	pointerEvents: "none",
	mixBlendMode: "difference",
	zIndex: 9999,
};

const CustomCursor: React.FC = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [largerCursorPosition, setLargerCursorPosition] = useState({
		x: 0,
		y: 0,
	});

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

	const s_size = 10;
	const dynamicCursorStyles: React.CSSProperties = {
		...cursorStyles,
		width: `${s_size}px`,
		height: `${s_size}px`,
		left: `${mousePosition.x - s_size / 2}px`,
		top: `${mousePosition.y - s_size / 2}px`,
	};

	const l_size = 30;
	const larger: React.CSSProperties = {
		...cursorStyles,
		width: `${l_size}px`,
		height: `${l_size}px`,
		left: `${largerCursorPosition.x - l_size / 2}px`,
		top: `${largerCursorPosition.y - l_size / 2}px`,
	};

	return (
		<>
			<div style={dynamicCursorStyles} />
			<div style={larger} />
		</>
	);
};

export default CustomCursor;
// src/components/cursor/Cursor.tsx

// import React, { useEffect, useState } from "react";

// const cursorStyles: React.CSSProperties = {
// 	position: "fixed",
// 	backgroundColor: "white",
// 	borderRadius: "50%",
// 	pointerEvents: "none",
// 	mixBlendMode: "difference",
// 	zIndex: 9999,
// };

// const CustomCursor: React.FC = () => {
// 	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// 	const [largerCursorPosition, setLargerCursorPosition] = useState({
// 		x: 0,
// 		y: 0,
// 	});
// 	const [isHoveringLink, setIsHoveringLink] = useState(false);

// 	const trailSpeed = 0.15;

// 	// This useEffect for mousemove tracking remains the same
// 	useEffect(() => {
// 		const updateMousePosition = (e: MouseEvent) => {
// 			setMousePosition({ x: e.clientX, y: e.clientY });
// 		};
// 		window.addEventListener("mousemove", updateMousePosition);
// 		return () => {
// 			window.removeEventListener("mousemove", updateMousePosition);
// 		};
// 	}, []);

// 	// This useEffect for the trailing animation remains the same
// 	useEffect(() => {
// 		let animationFrameId: number;
// 		const animateLargerCursor = () => {
// 			setLargerCursorPosition((prevPos) => ({
// 				x: prevPos.x + (mousePosition.x - prevPos.x) * trailSpeed,
// 				y: prevPos.y + (mousePosition.y - prevPos.y) * trailSpeed,
// 			}));
// 			animationFrameId = requestAnimationFrame(animateLargerCursor);
// 		};
// 		animationFrameId = requestAnimationFrame(animateLargerCursor);
// 		return () => {
// 			cancelAnimationFrame(animationFrameId);
// 		};
// 	}, [mousePosition, trailSpeed]);

// 	// This useEffect for listening to link hovers remains the same
// 	useEffect(() => {
// 		const handleMouseOver = (e: MouseEvent) => {
// 			if ((e.target as HTMLElement).tagName === "A") {
// 				setIsHoveringLink(true);
// 			}
// 		};
// 		const handleMouseOut = (e: MouseEvent) => {
// 			if ((e.target as HTMLElement).tagName === "A") {
// 				setIsHoveringLink(false);
// 			}
// 		};
// 		window.addEventListener("mouseover", handleMouseOver);
// 		window.addEventListener("mouseout", handleMouseOut);
// 		return () => {
// 			window.removeEventListener("mouseover", handleMouseOver);
// 			window.removeEventListener("mouseout", handleMouseOut);
// 		};
// 	}, []);

// 	// --- STYLES FOR THE DEFAULT CURSOR ---
// 	const s_size = 10;
// 	const dynamicCursorStyles: React.CSSProperties = {
// 		...cursorStyles,
// 		width: `${s_size}px`,
// 		height: `${s_size}px`,
// 		left: `${mousePosition.x - s_size / 2}px`,
// 		top: `${mousePosition.y - s_size / 2}px`,
// 	};

// 	const l_size = 30;
// 	const larger: React.CSSProperties = {
// 		...cursorStyles,
// 		width: `${l_size}px`,
// 		height: `${l_size}px`,
// 		left: `${largerCursorPosition.x - l_size / 2}px`,
// 		top: `${largerCursorPosition.y - l_size / 2}px`,
// 	};

// 	// --- 1. DEFINE THE NEW STYLE FOR THE LINK HOVER CURSOR ---
// 	const linkHoverSize = 20;
// 	const linkHoverCursorStyles: React.CSSProperties = {
// 		// Use some base styles but override what's needed
// 		position: "fixed",
// 		pointerEvents: "none",
// 		zIndex: 9999,
// 		backgroundColor: "red",
// 		width: `${linkHoverSize}px`,
// 		height: `${linkHoverSize}px`,
// 		// Position it directly under the mouse
// 		left: `${mousePosition.x - linkHoverSize / 2}px`,
// 		top: `${mousePosition.y - linkHoverSize / 2}px`,
// 	};

// 	// --- 2. USE CONDITIONAL RENDERING IN THE JSX ---
// 	return (
// 		<>
// 			{isHoveringLink ? (
// 				// If hovering a link, render only the red square
// 				<div style={linkHoverCursorStyles} />
// 			) : (
// 				// Otherwise, render the default two-circle cursor
// 				<>
// 					<div style={dynamicCursorStyles} />
// 					<div style={larger} />
// 				</>
// 			)}
// 		</>
// 	);
// };

// export default CustomCursor;
