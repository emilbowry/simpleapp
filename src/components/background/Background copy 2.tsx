// src/comonents/background/Background.tsx

// import bare from "../../assets/defaulthex.svg";
// import logo from "../../assets/logoshape.svg";
import _logo from "../../assets/logo.svg";
import { getImageEl } from "../../utils/reactUtils";
import React from "react";
import styles from "./Background.module.css";
import { DefaultHexagon as DH, LogoHexagon } from "./svgElements";
import { logo_yellow, logo_blue } from "../../utils/defaultColours";

interface IBackgroundElements {
	elements: readonly [React.ReactNode, React.ReactNode, React.ReactNode];
}

export const DefaultHexagon: React.ReactNode = (
	<svg
		width="300"
		height="300"
		viewBox="0 -150 300 300"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<linearGradient
				id="chevronGradient"
				x1="10%"
				y1="50%"
				x2="100%"
				y2="50%"
			>
				<stop offset="0%" stopColor={logo_yellow} />
				<stop offset="100%" stopColor={logo_blue} />
			</linearGradient>
			<mask id="cutout">
				<rect x="0" y="-150" width="300" height="300" fill="white" />

				<path
					d=" M 25 86.6025 l 50 -86.6025 l -50 -86.6025 h 25 l 50 86.6025 l -50 86.6025 Z"
					fill="black"
				/>

				<path d="M 95 0 v 5 h120 v -10 h-120 v5" fill="black" />
			</mask>
		</defs>

		<path
			d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z"
			mask="url(#cutout)"
			fill="url(#chevronGradient)"
		/>
		<path
			d="M -21.0101 0.0202 L 15.8088 -105.7362 L 89.4466 -0.3715 L 25.2093 85.8005 L -21.2164 0.1027 Z"
			fill={logo_yellow}
			mask="url(#hexCutoutMask)"
		/>

		<path
			d="M 37.8305 -96.7441 L 93.4715 -0.224 L 37.0735 100.4596 L 185.8279 111.8149 L 233.1417 -14.9859 L 191.8841 -96.7441 Z"
			fill="url(#chevronGradient)"
			mask="url(#hexCutoutMask)"
		/>
	</svg>
);

// interface ImageHexagonProps {
// 	imageUrl: string;
// 	// You might want to pass dimensions or calculate them from a parent
// 	// For simplicity, we'll assume standard 300x300 for now, matching your DefaultHexagon viewBox
// 	width?: number;
// 	height?: number;
// 	xOffset?: number; // For fine-tuning image position within the hexagon
// 	yOffset?: number; // For fine-tuning image position within the hexagon
// }

// export const ImageHexagon = ({
// 	imageUrl = "../../assets/mountains.jpg",
// 	width = 300,
// 	height = 300,
// 	xOffset = 0,
// 	yOffset = 0,
// }): React.ReactNode => {
// 	return (
// 		<svg
// 			width={width}
// 			height={height}
// 			viewBox="0 -150 300 300"
// 			xmlns="http://www.w3.org/2000/svg"
// 		>
// 			<defs>
// 				<clipPath id="imageHexClip">
// 					<path d={HexagonPath} />
// 				</clipPath>
// 			</defs>

// 			<image
// 				href={imageUrl}
// 				x={0 + xOffset}
// 				y={-150 + yOffset}
// 				width={300}
// 				height={300}
// 				preserveAspectRatio="xMidYMid slice"
// 				clip-path="url(#imageHexClip)"
// 			/>
// 		</svg>
// 	);
// };
// const HEXAGON_PATH_D =
// 	"M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z";

// // The unstyled React.ReactNode for a text hexagon.
// // This structure is required to overlay HTML on an SVG.
// const TextHex: React.ReactNode = (
// 	<div >
// 		The SVG provides the background shape
// 		<svg className="text-hexagon-svg-background" viewBox="0 -150 300 300">
// 			<path d={HEXAGON_PATH_D} className="text-hexagon-path" />
// 		</svg>

// 		{/* This div holds your HTML text content */}
// 		<div className="text-hexagon-content">
// 			<p>
// 				"Not everyone needs to be an AI expert. But everyone needs to be
// 				AI compatible."
// 			</p>
// 			<p>- Joe Fennell</p>
// 		</div>
// 	</div>
// );

class BackgroundRow extends React.Component<IBackgroundElements> {
	render() {
		const spacing = 50;
		const { elements } = this.props;
		const rowstyle: React.CSSProperties = {
			display: "grid",
			gridTemplateColumns: `${300 + spacing}px ${300 + spacing}px ${
				300 + spacing
			}px`,
			gridTemplateRows: `${300 + spacing}px`,
			justifyContent: "center",

			overflow: "visible",
			alignItems: "center",
		};

		const hexWrap: React.CSSProperties = {
			display: "flex",
			justifyContent: "center",
			overflow: "visible",
			alignItems: "center",
			width: "300px",
			height: "300px",
			border: "1px solid black",
		};

		return (
			<div style={rowstyle}>
				<div
					style={{
						...hexWrap,
						// marginRight: "-100px",
						backgroundColor: "red",
					}}
				>
					{elements[0]}
				</div>
				<div
					style={{
						...hexWrap,
						marginTop: "-350px",
						backgroundColor: "red",
					}}
				>
					{elements[1]}
				</div>
				<div
					style={{
						...hexWrap,
						// marginLeft: "-100px",
						backgroundColor: "red",
					}}
				>
					{elements[2]}
				</div>
			</div>
		);
	}
}
const TextHex: React.ReactNode = <div></div>;
export class Background extends React.Component {
	render() {
		// const topEl = [DefaultHexagon, <svg></svg>, DefaultHexagon] as const;

		// const defaultEl = [<svg></svg>, DefaultHexagon, <svg></svg>] as const;
		// const bottomEl = [<svg></svg>, LogoHexagon, DefaultHexagon] as const;
		const bottomEl = [
			DefaultHexagon,
			DefaultHexagon,
			DefaultHexagon,
		] as const;

		const middleEl = [
			DefaultHexagon,
			DefaultHexagon,
			DefaultHexagon,
		] as const;

		return (
			<div>
				<div
					className="no-aos"
					style={{
						paddingLeft: "100px",
					}}
				>
					<div
						style={{
							overflow: "hidden",
						}}
					>
						<BackgroundRow elements={middleEl} />
						<BackgroundRow elements={middleEl} />

						<BackgroundRow elements={middleEl} />
						<BackgroundRow elements={middleEl} />
					</div>
				</div>
			</div>
		);
	}
}
