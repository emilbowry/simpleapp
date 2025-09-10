import React, { useEffect, useState, useRef } from "react";
import {
	Hexagon,
	LogoHexagon,
	ImageHexagon,
} from "../../../components/hexagons/Hexagons";
import {
	HexagonGrid,
	HexagonRow,
} from "../../../components/hexagons/hexagonRow/HexagonRow";
import { ComponentOrStringList } from "../../../utils/reactUtils";
import {
	purple,
	midnight_green,
	l_midnight_green,
	mix_green,
	light_mix_green,
	white,
} from "../../../utils/defaultColours";
import hi1 from "../../../assets/heroimage1.jpg";
import hi2 from "../../../assets/heroimage2.jpg";
import hi3 from "../../../assets/heroimage3.jpg";
import hi4 from "../../../assets/heroimage4.jpg";
import { IHexagonGridElements } from "../../../components/hexagons/hexagonRow/HexagonRow.types";
const textEl = (
	<div
		style={{
			color: " #066070",
		}}
	>
		<div
			style={{
				fontStyle: "italic",
			}}
		>
			<div>
				“Not everyone needs to be an AI expert.
				<br />
				<br />
				But everyone needs to be AI compatible.”
			</div>
		</div>

		<div
			style={{
				fontWeight: "bold",
			}}
		>
			- Joe Fennel
		</div>
	</div>
);

export const Hero: React.FC = () => {
	const firstRow = [
		<ImageHexagon args={{ img: hi1 }} />,
		<Hexagon args={{ colour: purple }} />,
		<ImageHexagon args={{ img: hi2 }} />,
	] as const;

	const secondRow = [
		null,
		<Hexagon args={{ colour: light_mix_green }} />,
		null,
	] as const;
	const thirdRow = [
		null,
		<LogoHexagon args={{ withGap: false }} />,

		<Hexagon args={{ colour: l_midnight_green }} />,
	] as const;

	const demo_row = [<Hexagon />, <Hexagon />, <Hexagon />] as const;

	const r = [
		{ elements: secondRow },
		{ elements: thirdRow },
		{ elements: firstRow },
	];
	// const r = [
	// 	{ elements: demo_row },
	// 	{ elements: demo_row },
	// 	{ elements: demo_row },
	// ];
	return (
		<div style={{ marginTop: "-10%", maxHeight: "50vh" }}>
			{/* TEMPOARY */}
			<HexagonGrid rows={r} />
		</div>
	);
};
