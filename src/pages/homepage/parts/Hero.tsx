// src/features/hero/Hero.tsx
import React, { useEffect, useState, useRef } from "react";
import {
	Hexagon,
	LogoHexagon,
	ImageHexagon,
} from "../../../components/hexagons/Hexagons";
import { HexagonRow } from "../../../components/hexagons/hexagonRow/HexagonRow";
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
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		// Function to update state
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		// Add event listener
		window.addEventListener("resize", handleResize);

		// Clean up event listener on component unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty dependency array ensures this runs only on mount and unmount

	const firstRow = [
		null,
		null,
		<Hexagon args={{ colour: mix_green }} />,
	] as const;

	const secondRow = [
		null,
		// <LogoHexagon />,
		<LogoHexagon args={{ withGap: false }} />,

		<ImageHexagon args={{ img: hi1 }} />,
	] as const;

	const overlay: ComponentOrStringList = [
		<Hexagon args={{ colour: light_mix_green }} />,
		textEl,
	];

	const thirdRow = [
		<ImageHexagon args={{ img: hi2 }} />,
		<Hexagon
			args={{ colour: light_mix_green }}
			element={textEl}
		/>,
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
	// window.innerWidth
	// const w = window.innerWidth
	const sf = windowWidth / 1500;
	return (
		<div>
			<div className="no-aos">
				<div
					ref={containerRef}
					style={{
						// height: "100%",
						// width: "70vw",
						// display: "flex",
						// top: 0,
						transformOrigin: "top center",
						// paddingLeft: "50px",
						opacity: 0.7,
						marginBottom: "-300px",
						transform: `scale(${sf})`,
						// paddingTop: "650px",
						paddingBottom: "1000px",
					}}
				>
					<HexagonRow elements={firstRow} />
					<HexagonRow elements={secondRow} />
					<HexagonRow elements={thirdRow} />
					{/* <HexagonRow elements={fourthRow} /> */}
					{/* <HexagonRow elements={fifthRow} /> */}
				</div>
			</div>
		</div>
	);
};
