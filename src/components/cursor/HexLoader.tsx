import React from "react";

// Props interface to make the loader configurable
interface HexagonLoaderProps {
	color?: string;
	size?: number; // in pixels
	time?: number; // in seconds
}

const HexagonLoader: React.FC<HexagonLoaderProps> = ({
	color = "#fd7000",
	size = 12,
	time = 1,
}) => {
	// Keyframes are embedded as a string in a <style> tag
	const keyframes = `
    @keyframes blink {
      0% { opacity: 0.1; }
      30% { opacity: 1; }
      100% { opacity: 0.1; }
    }
  `;

	// --- Style Objects ---

	const containerStyle: React.CSSProperties = {
		width: "100vw",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		background: "#090707",
	};

	const hexagonLoaderStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	};

	const rowStyle: React.CSSProperties = {
		display: "flex",
	};

	const baseArrowStyle: React.CSSProperties = {
		width: 0,
		height: 0,
		margin: `0 ${-size / 2}px`,
		borderLeft: `${size}px solid transparent`,
		borderRight: `${size}px solid transparent`,
		borderBottom: `${size * 1.8}px solid ${color}`,
		animation: `blink ${time}s infinite`,
		filter: `drop-shadow(0 0 ${size * 1.5}px ${color})`,
	};

	const downArrowStyle: React.CSSProperties = {
		transform: "rotate(180deg)",
	};

	// Helper function to calculate animation delays to keep JSX cleaner
	// This replaces the SCSS @for loops
	const getAnimationDelay = (
		type: "outer" | "inner",
		index: number
	): React.CSSProperties => {
		const delay =
			type === "outer" ? -((time / 18) * index) : -((time / 6) * index);
		return { animationDelay: `${delay}s` };
	};

	return (
		<div style={containerStyle}>
			{/* Inject the keyframes animation into the document */}
			<style>{keyframes}</style>

			<div style={hexagonLoaderStyle}>
				<div style={rowStyle}>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("outer", 18),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("outer", 17),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("outer", 16),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("outer", 15),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("outer", 14),
						}}
					></div>
				</div>
				<div style={rowStyle}>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("outer", 1),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("outer", 2),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("inner", 6),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("inner", 5),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("inner", 4),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("outer", 13),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("outer", 12),
						}}
					></div>
				</div>
				<div style={rowStyle}>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("outer", 3),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("outer", 4),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("inner", 1),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("inner", 2),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("inner", 3),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("outer", 11),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("outer", 10),
						}}
					></div>
				</div>
				<div style={rowStyle}>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("outer", 5),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("outer", 6),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("outer", 7),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...getAnimationDelay("outer", 8),
						}}
					></div>
					<div
						style={{
							...baseArrowStyle,
							...downArrowStyle,
							...getAnimationDelay("outer", 9),
						}}
					></div>
				</div>
			</div>
		</div>
	);
};

export default HexagonLoader;
