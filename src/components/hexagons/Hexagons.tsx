// src/components/hexagons/Hexagons.tsx

import React from "react";
import {
	logo_yellow,
	logo_blue,
	midnight_green,
} from "../../utils/defaultColours";
import { IHexagonConstruction } from "./Hexagons.types";
import { formatComponent } from "../../utils/reactUtils";
import {
	containerStyle,
	svgStyle,
	horizontalContentStyle,
	verticalContentStyle,
} from "./Hexagons.styles";

//
// ===== Hexagon =====
//

export class Hexagon
	extends React.Component<any>
	implements IHexagonConstruction
{
	static useVert = false;
	static defaultHexPath =
		"M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 Z";
	static vertHexPath =
		"M 13.3975 -50 l 0 100 l 86.6025 50 l 86.6025 -50 l -0 -100 l -86.6025 -50 Z";
	static get HexPath() {
		return this.useVert ? this.vertHexPath : this.defaultHexPath;
	}
	hexPath: string;
	constructor(props: any) {
		super(props);
		const ctor = this.constructor as typeof Hexagon;

		this.hexPath = ctor.HexPath;
	}

	public construct(args?: any) {
		const _args = args || { colour: midnight_green };
		const colour = _args.colour || midnight_green;
		return {
			defs: [
				<mask id="hexagon">
					<path
						d={this.hexPath}
						fill="white"
					/>
				</mask>,
			],
			paths: [
				<path
					d={this.hexPath}
					mask="url(#hexagon)"
					fill={colour}
				/>,
			],
		};
	}

	render() {
		const {
			args,
			element = <></>,
			useVert = false,
			...styleProps
		} = this.props;
		const { defs, paths } = this.construct(args);

		return (
			<div
				className="no-aos"
				style={containerStyle(styleProps)}
			>
				<svg
					style={svgStyle(styleProps)}
					viewBox="0 -100 200 200"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>{defs.map((def, i) => def)}</defs>
					{paths.map((path, i) => path)}
				</svg>

				{element && (
					<div style={horizontalContentStyle()}>
						{formatComponent(element)}
					</div>
				)}
			</div>
		);
	}
}

//
// ===== VertHexagon =====
//

export class VertHexagon extends Hexagon {
	static useVert = true;
}

//
// ===== ImageHexagon =====
//

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
		components.paths[0] = React.cloneElement(components.paths[0], {
			fill: "url(#img1)",
		});
		return components;
	}
}

//
// ===== LogoHexagon =====
//
export class LogoHexagon extends Hexagon {
	public construct(withGap = false) {
		const chevCutour =
			"M 25 86.6025 l 50 -86.6025 l -50 -86.6025 h 25 l 50 86.6025 l -50 86.6025 Z";
		const chevColour =
			"M 37.8305 -96.7441 L 93.4715 -0.224 L 37.0735 100.4596 L 185.8279 111.8149 L 233.1417 -14.9859 L 191.8841 -96.7441 Z";
		const diamondColour =
			"M -21.0101 0.0202 L 15.8088 -105.7362 L 89.4466 -0.3715 L 25.2093 85.8005 L -21.2164 0.1027 Z";
		const chevSplit = "M 95 0 v 5 h120 v -10 h-120 v5";

		const components = {
			defs: [
				<linearGradient
					id="chevronGradient"
					x1="10%"
					y1="50%"
					x2="100%"
					y2="50%"
				>
					<stop
						offset="0%"
						stopColor={logo_yellow}
					/>
					<stop
						offset="100%"
						stopColor={logo_blue}
					/>
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
					<path
						d={this.hexPath}
						fill="white"
					/>
					<path
						d={chevCutour}
						fill="black"
					/>
					<path
						d={chevSplit}
						fill="black"
					/>
				</mask>
			);
		} else {
			components.defs.push(
				<mask id="logoCutout">
					<path
						d={this.hexPath}
						fill="white"
					/>
					<path
						d={chevCutour}
						fill="black"
					/>
				</mask>
			);
		}
		return components;
	}
}

//
// ===== CutHexagon =====
//
export class CutHexagon extends Hexagon {
	public construct({ isLeftHanded = true, colour = midnight_green } = {}) {
		const flip = isLeftHanded ? -1 : 100;
		const cutPath = `M ${flip} 0 l 50 -86.6025 h1 l 50 86.6025  l -50 86.6025  h -1 z`;

		return {
			defs: [
				<mask id="cutoutMask">
					<path
						d={this.hexPath}
						fill="white"
					/>
					<path
						d={cutPath}
						fill="black"
					/>
				</mask>,
				<linearGradient
					id="chevronGradient"
					x1="10%"
					y1="50%"
					x2="100%"
					y2="50%"
				>
					<stop
						offset="0%"
						stopColor={logo_yellow}
					/>
					<stop
						offset="100%"
						stopColor={logo_blue}
					/>
				</linearGradient>,
			],
			paths: [
				<path
					d={this.hexPath}
					mask="url(#cutoutMask)"
					fill={colour}
				/>,
			],
		};
	}
}
