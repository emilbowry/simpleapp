// src/comonents/background/Background.tsx

// import bare from "../../assets/defaulthex.svg";
// import logo from "../../assets/logoshape.svg";
import _logo from "../../assets/logo.svg";
import { getImageEl } from "../../utils/reactUtils";
import React from "react";
import styles from "./Background.module.css";

interface IBackgroundElements {
	elements: readonly [React.ReactNode, React.ReactNode, React.ReactNode];
}

const DefaultHexagon: React.ReactNode = (
	<svg
		width="300"
		height="300"
		viewBox="0 -150 300 300"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<mask id="cutout">
				<path
					d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z"
					fill="white"
				/>
			</mask>
		</defs>

		<path
			d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z"
			mask="url(#cutout)"
		/>
	</svg>
);

const LogoHexagon: React.ReactNode = (
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
				<stop offset="0%" stop-color="#FFDE59" />
				<stop offset="100%" stop-color="#0CC0DF" />
			</linearGradient>
			<mask id="hexCutoutMask">
				<path
					d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 Z"
					fill="white"
				/>
				<path
					d="m 25 86.6025 l 50 -86.6025 l -50 -86.6025 h 25 l 50 86.6025 l -50 86.6025 Z"
					fill="black"
				/>
			</mask>
		</defs>

		<path
			d="M -21.0101 0.0202 L 15.8088 -105.7362 L 89.4466 -0.3715 L 25.2093 85.8005 L -21.2164 0.1027 Z"
			fill="#FFDE59"
			mask="url(#hexCutoutMask)"
		/>

		<path
			d="M 37.8305 -96.7441 L 93.4715 -0.224 L 37.0735 100.4596 L 185.8279 111.8149 L 233.1417 -14.9859 L 191.8841 -96.7441 Z"
			fill="url(#chevronGradient)"
			mask="url(#hexCutoutMask)"
		/>
	</svg>
);

class BackgroundRow extends React.Component<IBackgroundElements> {
	render() {
		const { elements } = this.props;
		const rowstyle: React.CSSProperties = {
			display: "grid",
			gridTemplateColumns: "1fr 1fr 1fr",
			justifyContent: "center",

			overflow: "visible",
			alignItems: "center", // make sure vertical centering happens
		};

		const hexWrap: React.CSSProperties = {
			display: "flex",
			justifyContent: "center",
			overflow: "visible",
			alignItems: "center",
		};

		return (
			<div style={rowstyle}>
				<div style={{ ...hexWrap, marginRight: "-100px" }}>
					{elements[0]}
				</div>
				<div
					style={{
						...hexWrap,
						marginTop: "-300px",
					}}
				>
					{elements[1]}
				</div>
				<div style={{ ...hexWrap, marginLeft: "-100px" }}>
					{elements[2]}
				</div>
			</div>
		);
	}
}

export class Background extends React.Component {
	render() {
		const topEl = [DefaultHexagon, <svg></svg>, DefaultHexagon] as const;

		const defaultEl = [<svg></svg>, DefaultHexagon, <svg></svg>] as const;
		// const bottomEl = [<svg></svg>, LogoHexagon, DefaultHexagon] as const;
		const bottomEl = [DefaultHexagon, LogoHexagon, DefaultHexagon] as const;

		const middleEl = [
			DefaultHexagon,
			DefaultHexagon,
			DefaultHexagon,
		] as const;

		return (
			<div
				style={{
					overflow: "hidden",
					paddingLeft: "100px",
				}}
			>
				<BackgroundRow elements={topEl} />
				<BackgroundRow elements={bottomEl} />

				<BackgroundRow elements={defaultEl} />
				<BackgroundRow elements={middleEl} />
				<BackgroundRow elements={bottomEl} />

				<BackgroundRow elements={middleEl} />

				<BackgroundRow elements={defaultEl} />
				<BackgroundRow elements={middleEl} />
				<BackgroundRow elements={middleEl} />

				<BackgroundRow elements={defaultEl} />
				<BackgroundRow elements={middleEl} />
				<BackgroundRow elements={middleEl} />
			</div>
		);
	}
}
