// // // src/components/cursor/Cursor.tsx

// // import React, { useEffect, useState } from "react";

// // const cursorStyles: React.CSSProperties = {
// // 	position: "fixed",
// // 	backgroundColor: "white",
// // 	borderRadius: "50%",
// // 	pointerEvents: "none",
// // 	mixBlendMode: "difference",
// // 	zIndex: 9999,
// // };

// // const CustomCursor: React.FC = () => {
// // 	const [position, setPosition] = useState({ x: 0, y: 0 });

// // 	useEffect(() => {
// // 		const updateMousePosition = (e: MouseEvent) => {
// // 			setPosition({ x: e.clientX, y: e.clientY });
// // 		};

// // 		window.addEventListener("mousemove", updateMousePosition);

// // 		return () => {
// // 			window.removeEventListener("mousemove", updateMousePosition);
// // 		};
// // 	}, []);
// // 	const s_size = 15;

// // 	const dynamicCursorStyles: React.CSSProperties = {
// // 		...cursorStyles,
// // 		width: `${s_size}px`,
// // 		height: `${s_size}px`,
// // 		left: `${position.x - s_size / 2}px`,
// // 		top: `${position.y - s_size / 2}px`,
// // 	};
// // 	const l_size = 50;

// // 	const larger: React.CSSProperties = {
// // 		...cursorStyles,
// // 		width: `${l_size}px`,
// // 		height: `${l_size}px`,
// // 		left: `${position.x - l_size / 2}px`,
// // 		top: `${position.y - l_size / 2}px`,
// // 	};
// // 	return (
// // 		<>
// // 			<div style={dynamicCursorStyles} />
// // 			<div style={larger} />
// // 		</>
// // 	);
// // };

// // export default CustomCursor;
// // src/components/cursor/Cursor.tsx

// import React, { useEffect, useState, useRef } from "react";

// const cursorStyles: React.CSSProperties = {
// 	position: "fixed",
// 	backgroundColor: "white",
// 	borderRadius: "50%",
// 	pointerEvents: "none",
// 	mixBlendMode: "difference",
// 	zIndex: 9999,
// };

// const CustomCursor: React.FC = () => {
// 	// State for the smaller, immediately following cursor
// 	const [position, setPosition] = useState({ x: 0, y: 0 });

// 	// Ref for the larger cursor's position. Using a ref here because we'll update it
// 	// directly in the animation loop without triggering re-renders on every update.
// 	const largerCursorPosition = useRef({ x: 0, y: 0 });
// 	// State to actually render the larger cursor at the ref's position.
// 	// We'll update this state less frequently.
// 	const [renderedLargerCursorPosition, setRenderedLargerCursorPosition] =
// 		useState({ x: 0, y: 0 });

// 	const s_size = 15;
// 	const l_size = 50;

// 	// Easing factor for the lagging effect (0 to 1, higher means less lag)
// 	const easing = 0.1; // Adjust this value to control the lag: 0.1 is quite laggy, 0.5 is less so.

// 	useEffect(() => {
// 		const updateMousePosition = (e: MouseEvent) => {
// 			setPosition({ x: e.clientX, y: e.clientY });
// 		};

// 		window.addEventListener("mousemove", updateMousePosition);

// 		let animationFrameId: number;

// 		const animateLargerCursor = () => {
// 			// Interpolate the larger cursor's position towards the current mouse position
// 			largerCursorPosition.current.x +=
// 				(position.x - largerCursorPosition.current.x) * easing;
// 			largerCursorPosition.current.y +=
// 				(position.y - largerCursorPosition.current.y) * easing;

// 			// Update the state that actually renders the larger cursor.
// 			// This will trigger a re-render. You can control the refresh rate
// 			// here by only updating if a certain distance has been covered or
// 			// after a specific time interval if you want a more "stepped" lag.
// 			// For a smooth "viscous" feel, updating on every rAF is fine.
// 			setRenderedLargerCursorPosition({
// 				x: largerCursorPosition.current.x,
// 				y: largerCursorPosition.current.y,
// 			});

// 			animationFrameId = requestAnimationFrame(animateLargerCursor);
// 		};

// 		// Start the animation loop
// 		animationFrameId = requestAnimationFrame(animateLargerCursor);

// 		return () => {
// 			window.removeEventListener("mousemove", updateMousePosition);
// 			cancelAnimationFrame(animationFrameId); // Clean up the animation frame
// 		};
// 	}, [position, easing]); // Re-run effect if 'position' or 'easing' changes

// 	const dynamicCursorStyles: React.CSSProperties = {
// 		...cursorStyles,
// 		width: `${s_size}px`,
// 		height: `${s_size}px`,
// 		left: `${position.x - s_size / 2}px`,
// 		top: `${position.y - s_size / 2}px`,
// 	};

// 	const larger: React.CSSProperties = {
// 		...cursorStyles,
// 		width: `${l_size}px`,
// 		height: `${l_size}px`,
// 		left: `${renderedLargerCursorPosition.x - l_size / 2}px`,
// 		top: `${renderedLargerCursorPosition.y - l_size / 2}px`,
// 	};

// 	return (
// 		<>
// 			<div style={dynamicCursorStyles} />
// 			<div style={larger} />
// 		</>
// 	);
// };

// export default CustomCursor;
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

	// Configuration for the trailing effect
	const trailSpeed = 0.15; // Lower values mean more "viscous" trailing

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
	}, [mousePosition, trailSpeed]); // Re-run effect if mouse position or trail speed changes

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
