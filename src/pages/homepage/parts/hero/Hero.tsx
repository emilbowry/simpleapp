import React from "react";
import {
	Hexagon,
	LogoHexagon,
	ImageHexagon,
} from "../../../../components/hexagons/Hexagons";
import { HexagonGrid } from "../../../../components/hexagons/hexagonRow/HexagonRow";
import {
	purple,
	l_midnight_green,
	light_mix_green,
	light_grey,
} from "../../../../utils/defaultColours";
import hi1 from "../../../../assets/heroimage1.jpg";
import hi2 from "../../../../assets/heroimage2.jpg";
import hi3 from "../../../../assets/heroimage3.jpg";

const textEl = (
	<div
		style={{
			color: " #066070",
		}}
	>
		<div
			style={{
				fontStyle: "italic",
				fontSize: "1.6vw",
				width: "120%",
				marginLeft: "-10%",
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
				fontSize: "1.6vw",
			}}
		>
			- Joe Fennel
		</div>
	</div>
);

const tl_textEl1 = (
	<div
		style={{
			color: " #066070",
		}}
	>
		<div
			style={{
				fontStyle: "italic",
				fontSize: "1.6vw",
				width: "120%",
				marginLeft: "-10%",
			}}
		>
			<h2>Nov 2022</h2>
		</div>

		<div
			style={{
				fontWeight: "bold",
				fontSize: "1.6vw",
			}}
		>
			<p>ChatGPT 3.5 is rek</p>
		</div>
	</div>
);
export const Hero: React.FC = () => {
	const firstRow = [
		null,
		// <Hexagon args={{ colour: light_grey }} />,
		null,
		<ImageHexagon args={{ img: hi3 }} />, //subclass of Hexagon
	] as const;
	const secondRow = [
		<ImageHexagon args={{ img: hi1 }} />,
		<LogoHexagon args={{ withGap: false }} />, // other subclass of Hexagon

		<ImageHexagon args={{ img: hi2 }} />, //subclass of Hexagon
	] as const;

	const thirdRow = [
		null,
		<Hexagon
			args={{ colour: light_mix_green }}
			element={textEl}
		/>,
		null,
	] as const;

	const r = [
		{ elements: firstRow },

		{ elements: secondRow },
		{ elements: thirdRow },
	];
	const tl_FirstRow = [
		<Hexagon
			args={{ colour: light_mix_green }}
			element={textEl}
		/>,
		<Hexagon />,
		null,
	];
	const tl_SecondRow = [null, <Hexagon />, null];
	return (
		<div
			style={{
				height: "100%",
				margin: "auto 10%",
				marginTop: `calc(10%)`,
				// paddingTop: "10%",
			}}
		>
			<HexagonGrid rows={r} />
		</div>
	);
};
