// src/components/hexagons/Hexagons.tsx

import React from "react";
import {
	logo_yellow,
	logo_blue,
	midnight_green,
} from "../../utils/defaultColours";

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
export class Hexagon
	extends React.Component<any>
	implements IHexagonConstruction
{
	public construct(args?: any) {
		const _args = args || { colour: midnight_green };
		const colour = _args.colour || midnight_green;
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
		const size: number = this.props.size || 500;
		const { defs, paths } = this.construct(args);

		return (
			<svg
				width={size}
				height={size}
				viewBox="0 -100 200 200"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>{defs.map((def, index) => def)}</defs>
				{paths.map((path, index) => path)}
			</svg>
		);
	}
}

export class ImageHexagon extends Hexagon {
	public construct(args: { img: string }) {
		const { img } = args;
		let components = super.construct();
		components.defs.push(
			<pattern
				id="img1"
				patternContentUnits="objectBoundingBox"
				width="1"
				height="1"
			>
				<image
					href={img}
					width="1"
					height="1"
					preserveAspectRatio="xMidYMid slice"
				/>
			</pattern>
		);
		// console.log(components.paths[0].props["fill"]);
		components.paths[0] = React.cloneElement(components.paths[0], {
			fill: "url(#img1)",
		});

		return components;
	}
}
export class LogoHexagon extends Hexagon {
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
