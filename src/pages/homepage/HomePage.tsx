// src/App.tsx
import React, { useEffect, useState } from "react";
import { Hero } from "./parts/Hero";

import { Hexagon } from "../../components/hexagons/Hexagons";

const containerWidth = "100%";
const containerHeight = "100%";

const hexStyle = (x: number, y: number): React.CSSProperties => ({
	// position: "absolute",
	// left: x,
	// top: y,
});
const tpgap = 10;

const sideStyle = (
	spacing: number = 0,
	isLeft: boolean = true
): React.CSSProperties => {
	return {
		overflow: "visible",

		// marginBottom: `${(25 * 2) / Math.sqrt(3)}%`,

		// ...(isLeft
		// 	? { paddingRight: `${spacing}px` }
		// 	: { paddingLeft: `${spacing}px` }),
		// marginTop: `${tpgap}%`,
		...(isLeft
			? { marginLeft: `${25}%`, marginRight: `-${25}%` }
			: { marginRight: `${25}%`, marginLeft: `-${25}%` }),
		// paddingBottom: `${spacing}px`,
	};
};
const _sideStyle = (
	spacing: number = 0,
	isLeft: boolean = true
): React.CSSProperties => {
	return {
		overflow: "visible",

		// marginBottom: `${(25 * 2) / Math.sqrt(3)}%`,

		// ...(isLeft
		// 	? { paddingRight: `${spacing}px` }
		// 	: { paddingLeft: `${spacing}px` }),
		// marginTop: `${tpgap}%`,
		// ...(isLeft
		// 	? { marginLeft: `-${25}%`, marginRight: `${25}%` }
		// 	: { marginRight: `-${25}%`, marginLeft: `${25}%` }),
		// ...(isLeft ? { right: `-${25}%` } : {}),
		// paddingBottom: `${spacing}px`,
	};
};
const midStyle = (spacing: number = 0): React.CSSProperties => {
	return {
		marginTop: `-${25 * Math.sqrt(3)}%`,
		// overflow: "visible",
		// // marginTop: `${tpgap}%`,
		// // overflow: "visible",
		// // paddingBottom: `${600}px`,
		// // marginBottom: `${10 * spacing}px`,
		// // top: `-200px`,
		// paddingLeft: `${spacing}px`,
		// paddingRight: `${spacing}px`,
		// paddingLeft: `${spacing / 3}px`,
		// paddingRight: `${spacing / 3}px`,
	};
};
const _midStyle = (spacing: number = 0): React.CSSProperties => {
	return {
		// marginTop: `-${tpgap}%`,
		// marginBottom: `${tpgap / 2}%`,
		// // paddingLeft: `${tpgap / 2}%`,
		marginTop: `-${spacing}%`,
		// marginRight: `${tpgap / 3}%`,
		// // paddingRight: `${tpgap / 2}%`,
		// overflow: "visible",
		// paddingBottom: `${600}px`,
		// marginBottom: `${10 * spacing}px`,
		// marginTop: `-${testSpacing / 2}px`,
		// top: `-200px`,
		// paddingLeft: `${spacing / 3}px`,
		// paddingRight: `${spacing / 3}px`,
	};
};
const testSpacing = 0;

const container: React.CSSProperties = {
	position: "relative",
	// display: "flex",
	columnGap: `${testSpacing / Math.sqrt(3)}%`,
	rowGap: `${testSpacing}%`,
	display: "grid",
	overflow: "visible",
	// gridTemplateColumns: ` repeat(3, minmax(0, 1fr))`,
	gridTemplateColumns: `repeat(3, 30%)`,
	left: "5% ",
	// alignSelf: "center",
};

const homePage: React.FC = () => {
	return (
		<section className="no-aos">
			<div style={container}>
				<div style={sideStyle(testSpacing, true)}>
					<div style={_sideStyle(testSpacing, true)}>
						<Hexagon />
					</div>
				</div>
				<div style={midStyle(testSpacing)}>
					<div style={_midStyle(testSpacing)}>
						<Hexagon />
					</div>
				</div>
				<div style={sideStyle(testSpacing, false)}>
					<div style={_sideStyle(testSpacing, false)}>
						<Hexagon />
					</div>
				</div>
				<div style={sideStyle(testSpacing, true)}>
					<div style={_sideStyle(testSpacing, true)}>
						<Hexagon />
					</div>
				</div>
				<div style={midStyle(testSpacing)}>
					<div style={_midStyle(testSpacing)}>
						<Hexagon />
					</div>
				</div>
				<div style={sideStyle(testSpacing, false)}>
					<div style={_sideStyle(testSpacing, false)}>
						<Hexagon />
					</div>
				</div>
				{/* <div style={sideStyle(testSpacing, true)}>
					<div style={_sideStyle(testSpacing, true)}>
						<Hexagon />
					</div>
				</div>
				<div style={midStyle(testSpacing)}>
					<div style={_midStyle(testSpacing)}>
						<Hexagon />
					</div>
				</div>
				<div style={sideStyle(testSpacing, false)}>
					<div style={_sideStyle(testSpacing, false)}>
						<Hexagon />
					</div>
				</div> */}
			</div>
		</section>
	);
};

import { Page } from "../page";
// import CustomCursor from "../../components/cursor/Cursor";

export const HomePage = (
	<Page
		page={homePage}
		bg={true}
	/>
);
