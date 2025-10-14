import type * as CSS from "csstype";
import React, { useId } from "react";
import { Page } from "../../features/page/Page";
// import { K } from "../../components/hexagons/hexagon-row/HexagonRow.styles";
const cssPropertiesToString = (style: Record<string, string>): string => {
	return Object.keys(style).reduce(
		(acc, key) =>
			acc +
			key
				.split(/(?=[A-Z])/) // Converts camelCase to kebab-case
				.join("-")
				.toLowerCase() +
			":" +
			style[key] +
			";",
		""
	);
};

const stylesToCssString = (styles: any): string => {
	return Object.entries(styles)
		.map(([selector, properties]) => {
			const propertiesString = cssPropertiesToString(properties);
			return `${selector}{${propertiesString}}`;
		})
		.join(""); // Join all the rules together
};
const complexStyles = {
	body: {
		margin: "0",
		fontFamily: "Arial, sans-serif", // camelCase will be converted
		backgroundColor: "#f0f0f0",
	},
	".container a": {
		color: "blue",
		[":hover"]: {
			display: "flex",
		},
	},
};
const styleObjectToString = (styleObject: Record<string, any>): string => {
	let cssString = "";

	for (const key in styleObject) {
		const value = styleObject[key];

		if (typeof value === "object" && value !== null) {
			cssString += `${key}{${styleObjectToString(value)}}`;
		} else {
			const propertyName = key.replace(
				/[A-Z]/g,
				(letter) => `-${letter.toLowerCase()}`
			);
			cssString += `${propertyName}:${value};`;
		}
	}

	return cssString;
};
const b = { "p:hover": { textDecoration: "underline" } };
const pseudos: { [P in CSS.SimplePseudos]?: CSS.Properties } = {
	":hover": {
		display: "flex",
	},
};
const TestStyle: React.FC = () => {
	const id = useId();
	const s = `h1#${id} { color: red; }`;
	const y = { [`h1#${id}`]: { color: "red" } };

	return (
		<>
			{/* <style precedence={"medium"}>{JSON.stringify(b, null, 2)}</style> */}
			<div style={{ backgroundColor: "white" }}>
				<p>{styleObjectToString(complexStyles)}</p>
				<h1 id={id}>bye</h1>
				<div className="test-box">
					This box is lightblue by default. It should turn red if the
					screen is wider than 600px.
				</div>
			</div>
		</>
	);
};
const homePage: React.FC = () => {
	return (
		<div style={{ display: "grid", gridTemplateColumns: "100%" }}>
			<TestStyle />
			{/* <Hero />
			<OurTeam />
			<AboutUsCallingCard />
			<ImpactCC /> */}
		</div>
	);
};

export const HomePage = (
	<Page
		page={homePage}
		bg={true}
	/>
);
