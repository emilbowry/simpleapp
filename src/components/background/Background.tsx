// src/comonents/background/Background.tsx

// import bare from "../../assets/defaulthex.svg";
// import logo from "../../assets/logoshape.svg";
import _logo from "../../assets/logo.svg";
import React from "react";
import mountains from "../../assets/mountains.jpg";
import {
	logo_yellow,
	logo_blue,
	stormy_blue,
	stormy_light_green,
} from "../../utils/defaultColours";

interface IBackgroundElements {
	elements: readonly [ValidComponent, ValidComponent, ValidComponent];
}

const hexPath =
	"M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 Z";

const chevColour =
	"M 37.8305 -96.7441 L 93.4715 -0.224 L 37.0735 100.4596 L 185.8279 111.8149 L 233.1417 -14.9859 L 191.8841 -96.7441 Z";
const diamondColour =
	"M -21.0101 0.0202 L 15.8088 -105.7362 L 89.4466 -0.3715 L 25.2093 85.8005 L -21.2164 0.1027 Z";
const chevCutour =
	"M 25 86.6025 l 50 -86.6025 l -50 -86.6025 h 25 l 50 86.6025 l -50 86.6025 Z";
const chevSplit = "M 95 0 v 5 h120 v -10 h-120 v5";

interface IHexagonConstruction {
	construct(args?: any): IComponentDefinitions;
}

interface IComponentDefinitions {
	defs: React.ReactNode[];
	paths: React.ReactNode[];
}
class Hexagon extends React.Component<any> implements IHexagonConstruction {
	public construct(args?: any) {
		const _args = args || { colour: stormy_blue };
		const colour = _args.colour || stormy_blue;
		const components = {
			defs: [
				<mask id="hexagon">
					<path d={hexPath} fill="white" />
				</mask>,
			],
			paths: [<path d={hexPath} mask="url(#hexagon)" fill={colour} />],
		};
		return components;
	}
	render() {
		const { args } = this.props;
		const { defs, paths } = this.construct(args);

		return (
			<svg
				width="500"
				height="500"
				viewBox="0 -100 200 200"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>{defs.map((def, index) => def)}</defs>
				{paths.map((path, index) => path)}
			</svg>
		);
	}
}

class ImageHexagon extends Hexagon {
	public construct(args: { img: string }) {
		const { img } = args;
		let components = super.construct();
		components.defs.push(
			<pattern
				id="img1"
				patternUnits="userSpaceOnUse"
				width="100"
				height="100"
			>
				<image href={img} x="0" y="0" width="100" height="100" />
			</pattern>
		);
		console.log(components.paths[0].props["fill"]);
		components.paths[0] = React.cloneElement(components.paths[0], {
			fill: "url(#img1)",
		});

		return components;
	}
}
class LogoHexagon extends Hexagon {
	public construct(withGap = false) {
		const components = {
			defs: [
				<linearGradient
					id="chevronGradient"
					x1="10%"
					y1="50%"
					x2="100%"
					y2="50%"
				>
					<stop offset="0%" stopColor={logo_yellow} />
					<stop offset="100%" stopColor={logo_blue} />
				</linearGradient>,

				<mask id="hexagon"></mask>,
			],
			paths: [
				<path
					d={diamondColour}
					fill={logo_yellow}
					mask="url(#logoCutout)"
				/>,

				<path
					d={chevColour}
					fill="url(#chevronGradient)"
					mask="url(#logoCutout)"
				/>,
			],
		};

		if (withGap) {
			components.defs.push(
				<mask id="logoCutout">
					<path d={hexPath} fill="white" />
					<path d={chevCutour} fill="black" />
					<path d={chevSplit} fill="black" />
				</mask>
			);
		} else {
			components.defs.push(
				<mask id="logoCutout">
					<path d={hexPath} fill="white" />
					<path d={chevCutour} fill="black" />
				</mask>
			);
		}
		return components;
	}
}

type ComponentOrString = React.ComponentType | string;
type ComponentOrStringList = ComponentOrString[];
type ValidComponent =
	| React.ReactElement
	| ComponentOrString
	| ComponentOrStringList
	| null;

class BackgroundRow extends React.Component<IBackgroundElements> {
	private emptyEl: React.ReactNode = (<svg></svg>);

	private formatComponent = (
		component: ValidComponent
	): React.ReactNode | string => {
		if (component === null) {
			return this.emptyEl;
		} else if (component instanceof String) {
			return component;
		} else if (React.isValidElement(component)) {
			return component;
		} else if (Array.isArray(component)) {
			return component.map((Comp, index) => (
				<div style={{ position: "absolute" }} key={index}>
					{this.formatComponent(Comp)}
				</div>
			));
		} else {
			const SingleComponent = component;
			return <SingleComponent />;
		}
	};
	render() {
		const spacing = -20;
		const { elements } = this.props;
		const rowstyle: React.CSSProperties = {
			display: "grid",
			gridTemplateColumns: `${500 + spacing}px ${500 + spacing}px ${
				500 + spacing
			}px`,
			gridTemplateRows: `${500 + spacing}px`,
			justifyContent: "center",

			overflow: "visible",
			alignItems: "center",
		};

		const hexWrap: React.CSSProperties = {
			display: "flex",
			justifyContent: "center",
			overflow: "visible",
			alignItems: "center",
			width: "500px",
			height: "500px",
		};

		const hexWrap_middle: React.CSSProperties = {
			...hexWrap,
			marginTop: "-550px",
		};

		return (
			<div style={rowstyle}>
				<div style={hexWrap}>{this.formatComponent(elements[0])}</div>
				<div style={hexWrap_middle}>
					{this.formatComponent(elements[1])}
				</div>
				<div style={hexWrap}>{this.formatComponent(elements[2])}</div>
			</div>
		);
	}
}
export class Background extends React.Component {
	render() {
		const topEl = [
			LogoHexagon,
			<Hexagon args={{ colour: stormy_light_green }} />,

			<ImageHexagon args={{ img: mountains }} />,
		] as const;

		const defaultEl = [
			null,
			<Hexagon args={{ colour: stormy_light_green }} />,
			null,
		] as const;
		const a: ComponentOrStringList = [Hexagon, "hello"];

		const bottomEl = [Hexagon, a, Hexagon] as const;
		const middleEl = [Hexagon, Hexagon, Hexagon] as const;

		return (
			<div>
				<div className="no-aos">
					<div
						style={{
							paddingLeft: "50px",
						}}
					>
						{/* <BackgroundRow elements={topEl} /> */}
						<BackgroundRow elements={bottomEl} />

						<BackgroundRow elements={bottomEl} />
						{/* <BackgroundRow elements={middleEl} />
						<BackgroundRow elements={bottomEl} />

						<BackgroundRow elements={middleEl} />

						<BackgroundRow elements={defaultEl} />
						<BackgroundRow elements={middleEl} />
						<BackgroundRow elements={middleEl} />

						<BackgroundRow elements={defaultEl} />
						<BackgroundRow elements={middleEl} />
						<BackgroundRow elements={middleEl} /> */}
					</div>
				</div>
			</div>
		);
	}
}
