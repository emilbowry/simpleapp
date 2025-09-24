// src/components/hexagons/Hexagons.tsx

import React, { useLayoutEffect, useRef, useState } from "react";
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
	verticalContentStyle,
	hexagonalContentStyle,
	textSec,
	RightCutout,
	LeftCutout,
	textSex,
	_contentSection,
} from "./Hexagons.styles";
import { genericSectionStyle } from "../../styles";

//
// ===== Hexagon =====
//
/**
@improvement 
- Integrate some vertical alignment logic for hexagonalContentStyle
- If that vertical alignment logic solved, integrate verticalContentStyle into the shape-outside bounding logic
					 */

// src/components/hexagons/HexagonContent.tsx (New or updated file)
// src/components/hexagons/HexagonContent.tsx

interface HexagonContentProps {
	element: React.ReactNode;
	useVert: boolean;
	contentRef: (node: HTMLDivElement | null) => void;
	contentHeight: number;
	containerHeight: number;
}

export const HexagonContent: React.FC<HexagonContentProps> = ({
	element,
	useVert,
	contentRef,
	contentHeight,
	containerHeight,
}) => {
	const ref = useRef<HTMLInputElement | null>(null);
	const [tooltipHeight, setTooltipHeight] = useState(0);
	useLayoutEffect(() => {
		const height = ref.current
			? ref.current.getBoundingClientRect().height
			: 0;
		setTooltipHeight(height);
		console.log(height);
	}, []);
	if (!element) {
		return null;
	}

	if (useVert) {
		// This part remains unchanged
		return (
			<div style={verticalContentStyle()}>{formatComponent(element)}</div>
		);
	}
	let paddingTop = contentHeight > 0 ? containerHeight - 0 : 0;
	console.log(
		` containerHeight:${containerHeight}, contentHeight:${tooltipHeight}, paddingTop:${paddingTop}`
	);
	// let paddingTop = containerHeight - contentHeight;
	return (
		// This is the container we measure for total available height.
		<div style={hexagonalContentStyle}>
			<div
				style={{
					...textSec,
					margin: 0,
					// background: `linear-gradient(0deg, transparent calc(100% - ${contentHeight}px - 5px), blue calc(100% - ${contentHeight}px), transparent calc(100% - ${contentHeight}px + 5px))`,
				}}
			>
				<div
					style={{
						...LeftCutout,
					}}
				></div>
				<div
					style={{
						...RightCutout,
					}}
				></div>

				<div
					style={{
						...textSex,
						// paddingTop: `${paddingTop}px`,
						// margin: 0,
					}}
					ref={contentRef}
				>
					<div
						style={{
							// ...genericSectionStyle,
							// position: "relative",
							// margin: 0,
							paddingTop: `calc(100%)`,
							// margin: 0,
							// top: 0,
							// borderTop: "1px solid black",
							// boxSizing: "content-box",
							// background: `linear-gradient(0deg, transparent calc(${containerHeight}px - 5px), blue ${containerHeight}px, transparent calc(${containerHeight}px + 5px))`,
							// top: `calc((100% - ${paddingTop}px)/2)`,
						}}
						ref={ref}
					>
						{formatComponent(element)}
					</div>
				</div>
			</div>
		</div>
	);
};
type HexagonState = {
	calculatedPadding: number;
};

export class Hexagon
	extends React.Component<
		any,
		{ contentHeight: number; containerHeight: number }
	>
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

	private containerNode: Element | null = null;
	private contentNode: Element | null = null;
	hexPath: string;

	constructor(props: any) {
		super(props);
		const ctor = this.constructor as typeof Hexagon;
		this.hexPath = ctor.HexPath;

		this.state = {
			contentHeight: 0,
			containerHeight: 0,
		};
	}

	componentDidMount() {
		this.calculateAndSetPadding();
	}

	componentDidUpdate(prevProps: any) {
		if (this.props.element !== prevProps.element) {
			this.calculateAndSetPadding();
		}
	}

	calculateAndSetPadding = () => {
		if (this.containerNode && this.contentNode) {
			const containerHeight = this.containerNode.clientHeight;
			const contentHeight = this.contentNode.clientHeight;
			// const contentHeight = document.documentElement.clientHeight;
			// console.log(`${contentHeight}, ${containerHeight}`);
			let paddingTop =
				contentHeight > 0 ? containerHeight - contentHeight : 0;
			console.log(
				` containerHeight:${containerHeight}, contentHeight:${contentHeight}, paddingTop:${
					contentHeight / containerHeight
				}`
			);
			this.setState({ contentHeight: contentHeight });
			this.setState({ containerHeight: containerHeight });
		}
	};

	setContainerRef = (node: HTMLDivElement | null) => {
		this.containerNode = node;
	};

	setContentRef = (node: HTMLDivElement | null) => {
		this.contentNode = node;
	};

	public construct(args?: any) {
		const _args = args || { colour: "#003845" }; // Using a default hex for safety
		const colour = _args.colour || "#003845";
		const borderColor = _args.borderColor || undefined;
		const borderWidth = borderColor
			? _args.borderWidth || "2px"
			: undefined;

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
					stroke={borderColor}
					strokeWidth={borderWidth}
				/>,
			],
		};
	}

	render() {
		const {
			args,
			element = <></>,
			useVert = undefined,
			...styleProps
		} = this.props;
		const { defs, paths } = this.construct(args);
		const ctor = this.constructor as typeof Hexagon;

		let _useVert = useVert === undefined ? ctor.useVert : useVert;

		return (
			<div
				style={containerStyle(styleProps)}
				ref={this.setContainerRef}
			>
				<div>
					<svg
						style={{
							...svgStyle(styleProps),
						}}
						viewBox={
							!_useVert
								? `0 -${(200 * Math.sqrt(3)) / 4} 200 ${
										(200 * Math.sqrt(3)) / 2
								  }`
								: `${100 - (200 * Math.sqrt(3)) / 4} -100 ${
										(200 * Math.sqrt(3)) / 2
								  } 200`
						}
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs>
							{defs.map((def, i) => (
								<React.Fragment key={i}>{def}</React.Fragment>
							))}
						</defs>
						{paths.map((path, i) => (
							<React.Fragment key={i}>{path}</React.Fragment>
						))}
					</svg>

					<HexagonContent
						element={element}
						useVert={_useVert}
						contentRef={this.setContentRef}
						contentHeight={this.state.contentHeight}
						containerHeight={this.state.containerHeight}
					/>
				</div>
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
					height={`${2 / Math.sqrt(3)}`}
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
	public construct(args: { withGap: boolean }) {
		const _args = args || { withGap: false };
		const withGap = _args.withGap || false;
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

		if (withGap == true) {
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
