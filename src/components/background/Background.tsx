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
			<div>
				<div className="no-aos">
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
				</div>
			</div>
		);
	}
}
