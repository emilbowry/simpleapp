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
	elementSection,
	elementWrapper,
	ELWrapperStyle,
	flattop_ElContainerStyle,
	flattop_ElGhostStyle,
	flattop_ElItemStyle,
	hexagonalContentStyle,
	LeftCutout,
	pointedtop_ElContainerStyle,
	pointedtop_ElInnerGhostStyle,
	pointedtop_ElTopLevelGhostStyle,
	RightCutout,
	svgStyle,
} from "./Hexagons.styles";
import { IHexagonConstruction } from "./Hexagons.types";

const getElFlatTop = (fontSize = 2.5, ...components: ValidComponent[]) => {
	return (
		<div style={ELWrapperStyle}>
			<div style={flattop_ElGhostStyle}>no-op</div>
			<div style={flattop_ElContainerStyle}>
				{components &&
					components.map(
						(item, _index) =>
							item && (
								<div
									style={{
										...flattop_ElItemStyle,
										fontSize: `calc(max(${fontSize}vw,1px))`,
									}}
									key={_index}
								>
									{formatComponent(item)}
								</div>
							)
					)}
			</div>
		</div>
	);
};
// const getElPointedTop = (fontSize = 2.5, ...components: ValidComponent[]) => {
// 	return (
// 		<div style={ELWrapperStyle}>
// 			<div style={pointedtop_ElTopLevelGhostStyle}>no-op</div>
// 			<div
// 				style={{
// 					...pointedtop_ElContainerStyle,
// 					fontSize: `calc(max(${fontSize}vw,1px))`,
// 				}}
// 			>
// 				<div style={pointedtop_ElInnerGhostStyle}>inner-no-op</div>
// 				{components &&
// 					components.map(
// 						(item, _index) =>
// 							item && (
// 								<div key={_index}>{formatComponent(item)}</div>
// 							)
// 					)}
// 			</div>
// 		</div>
// 	);
// };
const getElPointedTop = (fontSize = 2.5, ...components: ValidComponent[]) => {
	return (
		<div style={ELWrapperStyle}>
			{/* <div style={pointedtop_ElTopLevelGhostStyle}>no-op</div> */}
			<div
				style={{
					fontSize: `calc(max(${fontSize}vw,1px))`,
					...pointedtop_ElContainerStyle,
				}}
			>
				<div style={pointedtop_ElInnerGhostStyle}>
					this needs to be sufficiently long in order to properly
					render. this makes no sense
				</div>
				{components &&
					components.map(
						(item, _index) =>
							item && (
								<div key={_index}>{formatComponent(item)}</div>
							)
					)}
			</div>
		</div>
	);
};
/** 

Due to render timings around componentDidUpdate, this needs to be a component,
- Cannot naively use an FC for this since there will be no reset event, or it always resets, needs to be some object state.
- Perhaps may have to use useLayoutEffect + useEffect to effectively stagger and condition the scalling logic
 */
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
	hexPath: string;
	private oscillations: number | undefined = undefined;
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
		const viewportWidth = window.innerWidth;
		const dampingThreshold = viewportWidth * 0.02;
		if (Math.abs(height_prime - height) > dampingThreshold) {
			this.setState({ contentHeight: height });
		}
	}
	componentDidMount() {
		if (this.contentNode) {
			const text = this.contentNode.textContent ?? "";
			const text_length = Array.from(text).length;
			this.contentObserver = new ResizeObserver((entries) => {
				const entry = entries[0];
				if (entry) {
					const height = entry.contentRect.height;

					this.setState({
						containerHeight: this.containerNode
							? this.containerNode.clientHeight
							: 400,
					});

					const letter_space = Math.sqrt(text_length);
					const hex_space = this.state.containerHeight ** 2;
					this.setState({
						fontSize: letter_space / hex_space,
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
		let _element = element;
		if (Array.isArray(element)) {
			_element = this.usePointedTop
				? getElPointedTop(this.state.fontSize, ...element)
				: getElFlatTop(this.state.fontSize, ...element);
		}

		return (
			<div style={containerStyle(styleProps)}>
				<svg
					style={svgStyle(styleProps)}
					viewBox={
						!this.usePointedTop
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

				{element && (
					<div
						style={hexagonalContentStyle}
						ref={this.setContainerRef}
					>
						<div style={elementWrapper}>
							<div style={LeftCutout(this.usePointedTop)} />
							<div style={RightCutout(this.usePointedTop)} />
							<div
								style={{
									...elementSection,
									paddingTop: useVerticalAlignment
										? `calc(${
												(this.state.containerHeight -
													this.state.contentHeight!) /
												2
										  }px)`
										: 0,
								}}
							>
								{useVerticalAlignment ? (
									<div
										style={{}}
										ref={this.setContentRef}
									>
										{formatComponent(_element)}
									</div>
								) : (
									formatComponent(_element)
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
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
