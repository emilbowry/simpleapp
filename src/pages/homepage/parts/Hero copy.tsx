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
	const contentRef = useRef<HTMLDivElement>(null);
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
			const unscaledHeight = contentRef.current.scrollHeight;
			const sf = windowWidth / 1500;
			setScaledContentHeight(unscaledHeight * sf);
		}
	}, [windowWidth]);
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

	return (
		<div style={{ minHeight: `${scaledContentHeight}px` }}>
			<div className="no-aos">
				<div
					ref={contentRef}
					style={{
						transformOrigin: " center",
						marginRight: "50px",
						opacity: 0.7,
						transform: `scale(${sf})`,

						height: "auto",
					}}
				>
					<HexagonRow elements={firstRow} />
					<HexagonRow elements={secondRow} />
					<HexagonRow elements={thirdRow} />
				</div>
			</div>
		</div>
	);
};
