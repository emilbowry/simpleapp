import React, { useEffect, useState } from "react";
import { Hero } from "./parts/Hero";

import { Hexagon } from "../../components/hexagons/Hexagons";

const aspace = 40;
const testSpacing = 5;

const sideStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0,
	isLeft: boolean = true
): React.CSSProperties => {
	return {
		...(isLeft
			? { marginLeft: `${25}%`, marginRight: `-${25}%` }
			: { marginRight: `${25}%`, marginLeft: `-${25}%` }),
		...(isLeft
			? { paddingRight: `${(absolute_spacing * Math.sqrt(3)) / 2}px` }
			: { paddingLeft: `${(absolute_spacing * Math.sqrt(3)) / 2}px` }),

		paddingTop: `${absolute_spacing / 2}px`,
	};
};
const midStyle = (
	relative_spacing: number = 0,
	absolute_spacing: number = 0
): React.CSSProperties => {
	return {
		marginTop: `-${25 * Math.sqrt(3) + relative_spacing}%`,
		paddingTop: `${absolute_spacing / 2}px`,

		paddingLeft: `${(absolute_spacing * Math.sqrt(3)) / 4}px`,
		paddingRight: `${(absolute_spacing * Math.sqrt(3)) / 4}px`,
	};
};

const container = (relative_spacing: number = 0): React.CSSProperties => {
	return {
		position: "relative",

		columnGap: `${relative_spacing / Math.sqrt(3)}%`,
		rowGap: `${relative_spacing}%`,
		display: "grid",
		gridTemplateColumns: `repeat(3, minmax(0, 1fr))`,

		margin: "0 auto",
		width: "80%",
	};
};

const homePage: React.FC = () => {
	return (
		<section className="no-aos">
			<Hero />
		</section>
	);
};

import { Page } from "../page";

export const HomePage = (
	<Page
		page={homePage}
		bg={true}
	/>
);
