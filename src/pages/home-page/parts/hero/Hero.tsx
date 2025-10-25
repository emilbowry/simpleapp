// src/pages/home-page/parts/hero/Hero.tsx

import React from "react";
import hi1 from "../../../../assets/heroimage1.jpg";
import hi2 from "../../../../assets/heroimage2.jpg";
import hi3 from "../../../../assets/heroimage3.jpg";
import { Hexagon } from "../../../../components/hexagons/Hexagons";
import { ImageHexagon } from "../../../../components/hexagons/ImageHexagon";
import { LogoHexagon } from "../../../../components/hexagons/LogoHexagon";
import { HexagonGrid } from "../../../../components/hexagons/hexagon-grid/honeycomb/HexagonRow";
import { light_mix_green } from "../../../../utils/defaultColours";

const textEl = (
	<div
		style={{
			color: " #066070",
			textAlign: "center",
		}}
	>
		<div
			style={{
				fontStyle: "italic",
				fontSize: "1.6vw",
				width: "120%",
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
			- Joe Fennell
		</div>
	</div>
);
const firstRow = [
	null,
	null,
	<ImageHexagon
		img={hi3}
		opacity={0.6}
	/>,
] as const;
const secondRow = [
	<ImageHexagon
		img={hi1}
		opacity={0.6}
	/>,
	<LogoHexagon
		args={{ withGap: false }}
		opacity={1}
		filter="drop-shadow(rgba(0, 0, 0, 0.2)  2px 2px 3px)  drop-shadow(rgba(255, 255, 255, 0.4)  3px 3px 3px)"
	/>,

	<ImageHexagon
		img={hi2}
		opacity={0.6}
	/>,
] as const;

const thirdRow = [
	null,
	<Hexagon
		args={{ colour: light_mix_green }}
		element={textEl}
		useVerticalAlignment={true}
		opacity={0.6}
	/>,
	<Hexagon opacity={0.6} />,
] as const;

const r = [
	{ elements: firstRow },

	{ elements: secondRow },
	{ elements: thirdRow },
];
const Hero: React.FC = () => {
	return (
		<div
			style={{
				// height: "100%",
				margin: "5% 0",
				// marginTop: `calc(10%)`,
			}}
		>
			<HexagonGrid
				rows={r}
				relative_spacing={10}
			/>
		</div>
	);
};
export { Hero };
