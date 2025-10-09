import React from "react";
import {
	logo_blue,
	logo_yellow,
	midnight_green,
} from "../../utils/defaultColours";
import { formatComponent, ValidComponent } from "../../utils/reactUtils";
import {
	_contentSection,
	containerStyle,
	ElContainerStyle,
	elementSection,
	PolyCutout,
	elementWrapper,
	ELWrapperStyle,
	flattop_ElGhostStyle,
	hexagonalContentStyle,
	pointedtop_ElInnerGhostStyle,
	svgStyle,
} from "./Hexagons.styles";
import { IHexagonConstruction } from "./Hexagons.types";

const ElContainer: React.FC<{
	contentRef?: (node: HTMLDivElement | null) => void;
	children?: React.ReactNode;
}> = ({ contentRef, children }) => (
	<div ref={contentRef}>
		<div style={ELWrapperStyle}>{children}</div>
	</div>
);

const ElMap: React.FC<{
	element: ValidComponent[];
}> = ({ element }) => (
	<React.Fragment>
		{element &&
			element.map(
				(item, _index) =>
					item && (
						<React.Fragment key={_index}>
							{formatComponent(item)}
						</React.Fragment>
					)
			)}
	</React.Fragment>
);
const GetEl: React.FC<{
	fontSize: number;
	element: ValidComponent[] | ValidComponent;
	useFlatTop: boolean;
	contentRef?: (node: HTMLDivElement | null) => void;
}> = ({ fontSize, element, useFlatTop, contentRef }) => {
	if (Array.isArray(element)) {
		if (useFlatTop) {
			return (
				<ElContainer contentRef={contentRef}>
					<div
						style={flattop_ElGhostStyle}
						/* I think this ensures lineheight is calculated correctly */
					>
						no-op
					</div>
					<div
						style={{
							...ElContainerStyle,
							fontSize: `calc(max(${fontSize}vw,1px))`,
						}}
					>
						<ElMap element={element} />
					</div>
				</ElContainer>
			);
		} else {
			return (
				<ElContainer contentRef={contentRef}>
					<div
						style={{
							fontSize: `calc(max(${fontSize}vw,1px))`,
							...ElContainerStyle,
						}}
						/* className="no-aos" // fixes AboutUs layout issue but breaks impact.tsx layout*/
					>
						<div
							style={pointedtop_ElInnerGhostStyle}
							/* Fixes both, don't understand why, needs to be sufficiently long to fix*/
						>
							this needs to be sufficiently long in order to
							properly render. this makes no sense
						</div>
						<ElMap element={element} />
					</div>
				</ElContainer>
			);
		}
	}
	return contentRef ? (
		<ElContainer contentRef={contentRef}>
			{formatComponent(element)}
		</ElContainer>
	) : (
		formatComponent(element)
	);
};

export const HexSVG: React.FC<{
	styles: any;
	useFlatTop: boolean;
	defs: React.ReactElement[];
	paths: React.ReactElement[];
}> = ({ styles, useFlatTop, defs, paths }) => (
	<svg
		style={svgStyle(styles)}
		viewBox={
			useFlatTop
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
);

export class Hexagon
	extends React.Component<
		any,
		{
			contentHeight: number | undefined;
			containerHeight: number;
			fontSize: number;
		}
	>
	implements IHexagonConstruction
{
	static usePointedTop = false;
	static defaultHexPath =
		"M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 Z";
	static altHexPath =
		"M 13.3975 -50 l 0 100 l 86.6025 50 l 86.6025 -50 l -0 -100 l -86.6025 -50 Z";
	static get HexPath() {
		return this.usePointedTop ? this.altHexPath : this.defaultHexPath;
	}

	private containerNode: Element | null = null;
	private contentNode: Element | null = null;
	private contentObserver: ResizeObserver | null = null;
	private oscillations: number | undefined = undefined;

	hexPath: string;
	usePointedTop: boolean;

	constructor(props: any) {
		super(props);
		const { usePointedTop = undefined } = this.props;
		const ctor = this.constructor as typeof Hexagon;

		this.usePointedTop = usePointedTop ?? ctor.usePointedTop;
		this.hexPath = !this.usePointedTop ? ctor.HexPath : ctor.altHexPath;
		this.state = {
			contentHeight: undefined,

			containerHeight: 0,
			fontSize: 2.5,
		};
	}
	componentWillUnmount() {
		if (this.contentObserver) {
			this.contentObserver.disconnect();
		}
	}
	private nudgeHeight = (
		height_prime: number,
		height: number,
		oscillations: number
	) => {
		const delta = height_prime - height;

		const pertubation = 2 * (oscillations % 2) - 1;
		return (
			height +
			delta * +!!oscillations +
			pertubation * oscillations * +!!delta
		);
	};

	private updateGuard(height_prime: number, height: number) {
		if (this.state.contentHeight === undefined) {
			this.setState({ contentHeight: height });

			return;
		}
		const viewportWidth = window.innerWidth;
		const dampingThreshold = viewportWidth * 0.02;
		if (Math.abs(height_prime - height) > dampingThreshold) {
			this.setState({ contentHeight: height });
		}
	}
	componentDidMount() {
		if (this.contentNode) {
			this.contentObserver = new ResizeObserver((entries) => {
				const entry = entries[0];
				if (entry) {
					const height = entry.contentRect.height;

					this.setState({
						containerHeight: this.containerNode
							? this.containerNode.clientHeight
							: 400,
					});

					const h_prime = this.state.contentHeight ?? 0;
					const osc = this.oscillations ?? 0;

					const activeHeight = this.nudgeHeight(h_prime, height, osc);

					this.oscillations =
						this.oscillations === undefined ? 0 : osc + 1;
					this.updateGuard(h_prime, activeHeight);
				}
			});

			this.contentObserver.observe(this.contentNode);
		}
	}

	componentDidUpdate() {
		this.oscillations = 0;
	}

	public construct(args?: any) {
		const _args = args || { colour: "#003845" };
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

	setContainerRef = (node: HTMLDivElement | null) => {
		this.containerNode = node;
	};
	setContentRef = (node: HTMLDivElement | null) => {
		this.contentNode = node;
	};
	render() {
		const {
			args,
			element = undefined,

			useVerticalAlignment = false,
			...styleProps
		} = this.props;
		const { defs, paths } = this.construct(args);
		// console.log(this.state.contentHeight);
		return (
			<div style={containerStyle(styleProps)}>
				<HexSVG
					styles={styleProps}
					useFlatTop={!this.usePointedTop}
					defs={defs}
					paths={paths}
				/>

				<CenterAlignedElement
					fontSize={this.state.fontSize}
					containerHeight={this.state.containerHeight}
					contentHeight={this.state.contentHeight}
					element={element}
					useVerticalAlignment={useVerticalAlignment}
					usePointedTop={this.usePointedTop}
					containerRef={this.setContainerRef}
					contentRef={this.setContentRef}
				/>
			</div>
		);
	}
}

const BoundingShape: React.FC<{ usePointedTop: boolean }> = ({
	usePointedTop,
}) => (
	<>
		<div style={PolyCutout(usePointedTop, true)} />
		<div style={PolyCutout(usePointedTop, false)} />
	</>
);
const BoundingShapes = (usePointedTop: boolean): React.ReactNode => (
	<>
		<div style={PolyCutout(usePointedTop, true)} />
		<div style={PolyCutout(usePointedTop, false)} />
	</>
);

const CenterAlignedElement: React.FC<{
	fontSize: number;
	containerHeight: number;
	contentHeight: number | undefined;
	element: ValidComponent[] | ValidComponent;
	useVerticalAlignment: boolean;
	usePointedTop: boolean;
	contentRef?: (node: HTMLDivElement | null) => void;
	containerRef?: (node: HTMLDivElement | null) => void;
}> = ({
	fontSize,
	containerHeight,
	contentHeight,
	element,
	useVerticalAlignment,
	usePointedTop,
	contentRef,
	containerRef,
}) => {
	return element ? (
		<div
			style={hexagonalContentStyle}
			ref={containerRef}
		>
			<div style={elementWrapper}>
				<BoundingShape usePointedTop={usePointedTop} />
				<div
					style={{
						...elementSection,
						paddingTop: useVerticalAlignment
							? `calc(${
									(containerHeight - (contentHeight ?? 0)) / 2
							  }px)`
							: 0,
					}}
				>
					<GetEl
						element={element}
						useFlatTop={!usePointedTop}
						contentRef={
							useVerticalAlignment ? contentRef : undefined
						}
						fontSize={fontSize}
					/>
				</div>
			</div>
		</div>
	) : null;
};

//
// ===== PointedTopHexagon =====
//

export class PointedTopHexagon extends Hexagon {
	static usePointedTop = true;
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
