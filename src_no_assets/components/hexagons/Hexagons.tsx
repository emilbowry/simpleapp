// src/components/hexagons/Hexagons.tsx

import React from "react";
import {
	logo_yellow,
	logo_blue,
	midnight_green,
} from "../../utils/defaultColours";
import { IHexagonConstruction, IComponentDefinitions } from "./Hexagons.types";
import { formatComponent } from "../../utils/reactUtils";
const hexPath =
	"M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 Z";

const chevColour =
	"M 37.8305 -96.7441 L 93.4715 -0.224 L 37.0735 100.4596 L 185.8279 111.8149 L 233.1417 -14.9859 L 191.8841 -96.7441 Z";
const diamondColour =
	"M -21.0101 0.0202 L 15.8088 -105.7362 L 89.4466 -0.3715 L 25.2093 85.8005 L -21.2164 0.1027 Z";
const chevCutour =
	"M 25 86.6025 l 50 -86.6025 l -50 -86.6025 h 25 l 50 86.6025 l -50 86.6025 Z";
const chevSplit = "M 95 0 v 5 h120 v -10 h-120 v5";
const vertHexPath =
	"M 13.3975 -50 l 0 100 l 86.6025 50 l 86.6025 -50 l -0 -100 l -86.6025 -50 Z";
const horizontalSafeZoneCoords = {
	minX: 50,
	maxX: 150,
	minY: -86.6025,
	maxY: 86.6025,
	width: 100,
	height: 173.205, // 86.6025 * 2
};

const vertSafeZoneCoords = {
	minX: 13.3975,
	maxX: 186.6025,
	minY: -50,
	maxY: 50,
	width: 173.205, // 186.6025 - 13.3975
	height: 100, // 50 * 2
};

export class VertHexagon
	extends React.Component<any>
	implements IHexagonConstruction
{
	public construct(args?: any) {
		const _args = args || { colour: midnight_green };

		const colour = _args.colour || midnight_green;

		const components = {
			defs: [
				<mask id="verthexagon">
					<path
						d={vertHexPath}
						fill="white"
					/>
				</mask>,
			],
			paths: [
				<path
					d={vertHexPath}
					mask="url(#verthexagon)"
					fill={colour}
				/>,
			],
		};
		return components;
	}
	render() {
		const { args } = this.props;

		const element = this.props.element || <></>;

		const size: number = this.props.size || 500;
		const scale: number = this.props.scale || 1;
		const opacity: number = this.props.opacity || 1;
		console.log(`opacity: ${opacity}`);
		const { defs, paths } = this.construct(args);
		const finalWidth = size * scale;
		const finalHeight = size * scale;

		const contentLeft = `${((vertSafeZoneCoords.minX - 0) / 200) * 100}%`;
		const contentTop = `${((vertSafeZoneCoords.minY - -100) / 200) * 100}%`;
		const contentWidth = `${(vertSafeZoneCoords.width / 200) * 100}%`;
		const contentHeight = `${(vertSafeZoneCoords.height / 200) * 100}%`;

		return (
			<div
				className="no-aos"
				style={{
					position: "relative",
					width: finalWidth,
					height: finalHeight,
					opacity: opacity,
				}}
			>
				<svg
					width={finalWidth}
					height={finalHeight}
					viewBox="0 -100 200 200"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>{defs.map((def, index) => def)}</defs>
					{paths.map((path, index) => path)}
				</svg>

				{element && (
					<div
						style={{
							position: "absolute",
							left: contentLeft,
							top: contentTop,
							width: contentWidth,
							height: contentHeight,
							overflow: "hidden",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{formatComponent(element)}
					</div>
				)}
			</div>
		);
	}
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
					<path
						d={hexPath}
						fill="white"
					/>
				</mask>,
			],
			paths: [
				<path
					d={hexPath}
					mask="url(#hexagon)"
					fill={colour}
				/>,
			],
		};
		return components;
	}
	render() {
		const { args } = this.props;
		const element = this.props.element || <></>;

		const size: number = this.props.size || 500;
		const scale: number = this.props.scale || 1;
		const { defs, paths } = this.construct(args);
		const finalWidth = size * scale;
		const finalHeight = size * scale;

		const contentLeft = `${
			((horizontalSafeZoneCoords.minX - 0) / 200) * 100
		}%`;
		const contentTop = `${
			((horizontalSafeZoneCoords.minY - -100) / 200) * 100
		}%`;
		const contentWidth = `${(horizontalSafeZoneCoords.width / 200) * 100}%`;
		const contentHeight = `${
			(horizontalSafeZoneCoords.height / 200) * 100
		}%`;

		return (
			<div
				className="no-aos"
				style={{
					position: "relative",
					width: finalWidth,
					height: finalHeight,
				}}
			>
				<svg
					width={finalWidth}
					height={finalHeight}
					viewBox="0 -100 200 200"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>{defs.map((def, index) => def)}</defs>
					{paths.map((path, index) => path)}
				</svg>

				{element && (
					<div
						style={{
							position: "absolute",
							left: contentLeft,
							top: contentTop,
							width: contentWidth,
							height: contentHeight,
							overflow: "hidden",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{formatComponent(element)}
					</div>
				)}
			</div>
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
						d={hexPath}
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
						d={hexPath}
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

export class CutHexagon extends Hexagon {
	public construct({ isLeftHanded = true, colour = midnight_green } = {}) {
		const flip = isLeftHanded ? -1 : 100;
		const cutPath = `M ${flip} 0 l 50 -86.6025 h1 l 50 86.6025  l -50 86.6025  h -1 z`;

		const components = {
			defs: [
				<mask id="cutoutMask">
					<path
						d={hexPath}
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
			// paths: [<path d={hexPath} mask="url(#cutoutMask)" fill={colour} />],
			paths: [
				<path
					d={hexPath}
					mask="url(#cutoutMask)"
					// fill="url(#chevronGradient)"
					fill={colour}
				/>,
			],
		};
		return components;
	}
}
