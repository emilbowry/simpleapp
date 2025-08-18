// src/features/hero/Hero.tsx
import React from "react";
import {
	Hexagon,
	LogoHexagon,
	ImageHexagon,
} from "../../../components/hexagons/Hexagons";
import { HexagonRow } from "../../../components/hexagons/HexagonRow";
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

export const Hero: React.FC = () => {
	const firstRow = [
		null,
		null,
		<Hexagon args={{ colour: mix_green }} />,
	] as const;

	const secondRow = [
		null,
		LogoHexagon,
		<ImageHexagon args={{ img: hi1 }} />,
	] as const;
	// const secondRow = [
	// 	null,
	// 	<div style={{ transform: "scaleX(-1)" }}>
	// 		<LogoHexagon />
	// 	</div>,
	// 	<ImageHexagon args={{ img: hi1 }} />,
	// ] as const;

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
					<div>“Not everyone needs to be an AI expert.”</div>
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
	const overlay: ComponentOrStringList = [
		<Hexagon args={{ colour: light_mix_green }} />,
		textEl,
	];
	const thirdRow = [
		<ImageHexagon args={{ img: hi2 }} />,
		overlay,

		<Hexagon args={{ colour: l_midnight_green }} />,
	] as const;
	const fourthRow = [
		<ImageHexagon args={{ img: hi3 }} />,
		<Hexagon args={{ colour: midnight_green }} />,
		<ImageHexagon args={{ img: hi4 }} />,
	] as const;
	const fifthRow = [
		null,
		<Hexagon args={{ colour: purple }} />,
		null,
	] as const;

	return (
		<div>
			<div className="no-aos">
				<div
					style={{
						paddingLeft: "50px",
						opacity: 0.7,
						marginBottom: "-300px",
						transform: "scale(1.5)",
						paddingTop: "650px",
						paddingBottom: "500px",
					}}
				>
					<HexagonRow elements={firstRow} />
					<HexagonRow elements={secondRow} />
					<HexagonRow elements={thirdRow} />
					<HexagonRow elements={fourthRow} />
					<HexagonRow elements={fifthRow} />
				</div>
			</div>
		</div>
	);
};

// import { TimelineRow } from "../../../components/hexagons/HexagonRow";
// export const Hero: React.FC = () => {
// 	const firstRow = [null, <Hexagon args={{ colour: white }} />] as const;

// 	const secondRow = [<ImageHexagon args={{ img: hi1 }} />, null] as const;
// 	const textEl = (
// 		<div
// 			style={{
// 				color: " #066070",
// 				// width: 700,
// 				minHeight: 0,
// 				maxHeight: 0,
// 			}}
// 		>
// 			<div
// 				style={{
// 					fontStyle: "italic",
// 				}}
// 			>
// 				<div>
// 					“Not everyone needs to be an AI expert.
// 					<div>“Not everyone needs to be an AI expert.”</div>
// 				</div>
// 			</div>

// 			<div
// 				style={{
// 					fontWeight: "bold",
// 				}}
// 			>
// 				- Joe Fennel
// 			</div>
// 		</div>
// 	);
// 	const overlay: ComponentOrStringList = [
// 		<Hexagon args={{ colour: light_mix_green }} />,
// 		textEl,
// 	];
// 	const thirdRow = [null, overlay] as const;

// 	return (
// 		<div>
// 			<div className="no-aos">
// 				<div
// 					style={{
// 						paddingLeft: "50px",
// 						opacity: 0.7,
// 						marginBottom: "-300px",
// 						transform: "scale(1.5)",
// 						paddingTop: "650px",
// 						paddingBottom: "500px",
// 					}}
// 				>
// 					<TimelineRow elements={firstRow} />
// 					<TimelineRow elements={secondRow} />
// 					<TimelineRow elements={thirdRow} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
