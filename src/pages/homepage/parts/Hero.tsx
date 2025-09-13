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
	// white,
} from "../../../utils/defaultColours";
import hi1 from "../../../assets/heroimage1.jpg";
import hi2 from "../../../assets/heroimage2.jpg";
// import hi3 from "../../../assets/heroimage3.jpg";
// import hi4 from "../../../assets/heroimage4.jpg";
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
		null,
		<Hexagon args={{ colour: light_mix_green }} />,

		<Hexagon args={{ colour: l_midnight_green }} />,
	] as const;
	const secondRow = [
		<ImageHexagon args={{ img: hi1 }} />,
		<LogoHexagon args={{ withGap: false }} />,

		<ImageHexagon args={{ img: hi2 }} />,
	] as const;

	const thirdRow = [
		null,
		<Hexagon
			args={{ colour: purple }}
			element={textEl}
		/>,
		null,
	] as const;

	const r = [
		{ elements: firstRow },

		{ elements: secondRow },
		{ elements: thirdRow },
	];
	return (
		<div
			style={{
				height: "100%",
				margin: "auto 10%",
				marginTop: `calc(10%)`,
			}}
		>
			<HexagonGrid rows={r} />
		</div>
	);
};
