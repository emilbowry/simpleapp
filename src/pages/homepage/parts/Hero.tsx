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
// export const Hero: React.FC = () => {
// 	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	useEffect(() => {
// 		const handleResize = () => {
// 			setWindowWidth(window.innerWidth);
// 		};

// 		window.addEventListener("resize", handleResize);

// 		return () => window.removeEventListener("resize", handleResize);
// 	}, []);

// 	const firstRow = [
// 		null,
// 		null,
// 		<Hexagon args={{ colour: mix_green }} />,
// 	] as const;

// 	const secondRow = [
// 		null,

// 		<LogoHexagon args={{ withGap: false }} />,

// 		<ImageHexagon args={{ img: hi1 }} />,
// 	] as const;

// 	const overlay: ComponentOrStringList = [
// 		<Hexagon args={{ colour: light_mix_green }} />,
// 		textEl,
// 	];

// 	const thirdRow = [
// 		<ImageHexagon args={{ img: hi2 }} />,
// 		<Hexagon
// 			args={{ colour: light_mix_green }}
// 			element={textEl}
// 		/>,
// 		<Hexagon args={{ colour: l_midnight_green }} />,
// 	] as const;

// 	const sf = windowWidth / 1500;
// 	return (
// 		<div>
// 			<div className="no-aos">
// 				<div
// 					// ref={containerRef} //Works equaly fine without it
// 					style={{
// 						height: "100%",

// 						transformOrigin: "top center",
// 						marginRight: "50px",
// 						opacity: 0.7,

// 						transform: `scale(${sf})`,

// 						paddingBottom: "1000px",
// 					}}
// 				>
// 					<HexagonRow elements={firstRow} />
// 					<HexagonRow elements={secondRow} />
// 					<HexagonRow elements={thirdRow} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
export const Hero: React.FC = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const contentRef = useRef<HTMLDivElement>(null); // Ref for the actual content that scales
	const [scaledContentHeight, setScaledContentHeight] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (contentRef.current) {
			// Get the unscaled height of the content
			const unscaledHeight = contentRef.current.scrollHeight; // or clientHeight
			const sf = windowWidth / 1500;
			setScaledContentHeight(unscaledHeight * sf);
		}
	}, [windowWidth]); // Recalculate when windowWidth changes
	const firstRow = [
		null,
		null,
		<Hexagon args={{ colour: mix_green }} />,
	] as const;

	const secondRow = [
		null,

		<LogoHexagon args={{ withGap: false }} />,

		<ImageHexagon args={{ img: hi1 }} />,
	] as const;

	const thirdRow = [
		<ImageHexagon args={{ img: hi2 }} />,
		<Hexagon
			args={{ colour: light_mix_green }}
			element={textEl}
		/>,
		<Hexagon args={{ colour: l_midnight_green }} />,
	] as const;

	const sf = windowWidth / 1500;
	const r = [
		{ elements: firstRow },
		{ elements: secondRow },
		{ elements: thirdRow },
	];
	// const r = {rows:firstRow},{elements:secondRow},{elements:thirdRow}]};

	return (
		<div>
			<HexagonGrid rows={r} />

			{/* <div
				className="no-aos"
				style={{ display: "flex", flexDirection: "row" }}
			>
				<div
					ref={contentRef} // Attach ref to the element whose content's unscaled height we measure
					style={{
						transformOrigin: " center",
						// marginRight: "50px",
						opacity: 0.7,
						// flexShrink: 1,
						// flexGrow: 1,

						// maxWidth: "70%",
						width: "80%",
						alignItems: "center",
						// transform: `scale(${sf})`,
						// overflow: "visible",
						height: "auto",
					}}
				>
					<HexagonRow elements={firstRow} />
					<HexagonRow elements={secondRow} />
					<HexagonRow elements={thirdRow} />
				</div>
			</div> */}
		</div>
	);
};
