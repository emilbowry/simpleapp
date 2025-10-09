import React from "react";
import {
	logo_blue,
	logo_yellow,
	midnight_green,
} from "../../utils/defaultColours";
import { formatComponent, ValidComponent } from "../../utils/reactUtils";
import {
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
type TSanitationFunction = (
	args: TOptionalParameters,
	optional_f_params: any
) => any;
type ValidInput =
	| object
	| TSanitationFunction
	| string
	| number
	| boolean
	| bigint
	| symbol
	| null
	| undefined;

type TOptionalParameters = any;

interface IOptionalParametersAssignments {
	key: string;
	key_alias?: string;
	return_value: ValidInput;

	optional_f_params?: any;
}

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

const BoundingShape: React.FC<{ usePointedTop: boolean }> = ({
	usePointedTop,
}) => (
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

const FlattopHexPath =
	"M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 Z";
const PointedtopHexPath =
	"M 13.3975 -50 l 0 100 l 86.6025 50 l 86.6025 -50 l -0 -100 l -86.6025 -50 Z";
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
	static defaultHexPath = FlattopHexPath;
	static altHexPath = PointedtopHexPath;

	static starting_state = {
		contentHeight: undefined,
		containerHeight: 0,
		fontSize: 2.5,
	};
	private containerNode: Element | null = null;
	private contentNode: Element | null = null;
	private contentObserver: ResizeObserver | null = null;
	// private oscillations: number | undefined = undefined;
	// private hasUpdated = false;
	private _oscillations: undefined | number = undefined;
	private dampingThreshold = 0.02;
	hexPath!: string;
	usePointedTop!: boolean;
	AEl: React.FC = () => <></>;
	ContainedElement: React.FC<{
		element: ValidComponent[] | ValidComponent;
		useVerticalAlignment: boolean;
	}> = ({ element, useVerticalAlignment }) => {
		const contentRef = useVerticalAlignment
			? this.setContentRef
			: undefined;
		if (Array.isArray(element)) {
			if (!this.usePointedTop) {
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
								fontSize: `calc(max(${this.state.fontSize}vw,1px))`,
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
								fontSize: `calc(max(${this.state.fontSize}vw,1px))`,
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

	CenterAlignedElement: React.FC<{
		element: ValidComponent[] | ValidComponent;
		useVerticalAlignment: boolean;
	}> = ({ element, useVerticalAlignment }) => {
		const ContainedElement = (element && this.ContainedElement) as any;

		/**

		Bound assignment prevents this err:
		`Element type is invalid: expected a string (for built-in components)
		or a class/function (for composite components) but got: undefined.
		You likely forgot to export your component from the file it's defined 
		in, or you might have mixed up default and named imports.` 
		*/
		return element ? (
			<div
				style={hexagonalContentStyle}
				ref={this.setContainerRef}
			>
				<div style={elementWrapper}>
					<BoundingShape usePointedTop={this.usePointedTop} />
					<div
						style={{
							...elementSection,
							paddingTop: useVerticalAlignment
								? `calc(${
										(this.containerHeight -
											this.contentHeight) /
										2
								  }px)`
								: 0,
						}}
					>
						<ContainedElement
							element={element}
							useVerticalAlignment={useVerticalAlignment}
						/>
					</div>
				</div>
			</div>
		) : null;
	};
	santiseOptionalParameters() {
		const { args } = this.props;
		const sanitisedArgs: any = {};

		for (const assignment of this.getDefaultAssignments()) {
			const { key, key_alias, return_value, optional_f_params } =
				assignment;
			const outKey = key_alias || key;
			const _return_value =
				typeof return_value === "function"
					? return_value(args, optional_f_params)
					: return_value;
			sanitisedArgs[outKey] = args?.[key] ? args[key] : _return_value;
		}

		return sanitisedArgs;
	}
	getDefaultAssignments(): IOptionalParametersAssignments[] {
		return [
			{
				key: "borderWidth",
				return_value: (original_args) =>
					original_args?.borderColour ? "2px" : undefined,
			},
			{ key: "colour", key_alias: "color", return_value: "#003845" },
			{
				key: "borderColour",
				key_alias: "borderColor",
				return_value: undefined,
			},
		];
	}
	constructor(props: any) {
		super(props);
		this.setOrientation();
		this.state = Hexagon.starting_state;
	}

	private setOrientation() {
		const ctor = this.constructor as typeof Hexagon;
		this.usePointedTop = this.props.usePointedTop ?? ctor.usePointedTop;
		this.hexPath = !this.usePointedTop
			? ctor.defaultHexPath
			: ctor.altHexPath;
	}
	private nudgeHeight = (height: number) => {
		const delta = this.contentHeight - height;
		const pertubation = 2 * (this.oscillations % 2) - 1;
		return (
			height +
			delta * +!!this.oscillations +
			pertubation * this.oscillations * +!!delta
		);
	};
	HexSVG: React.FC<{
		styles: any;
	}> = ({ styles }) => {
		const { defs, paths } = this.construct();

		return (
			<svg
				style={svgStyle(styles)}
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
		);
	};
	private updateGuard(height: number) {
		let newHeight = undefined;
		if (this.state.contentHeight === undefined) {
			newHeight = height;
		} else if (
			Math.abs(this.contentHeight - height) >
			window.innerWidth * this.dampingThreshold
		) {
			newHeight = height;
		}
		newHeight && this.setState({ contentHeight: height });
	}
	componentWillUnmount() {
		this.contentObserver && this.contentObserver.disconnect();
	}

	componentDidMount() {
		if (this.contentNode) {
			this.contentObserver = new ResizeObserver((entries) => {
				const entry = entries[0];
				if (entry) {
					this.setState({
						containerHeight: this.containerHeight,
					});

					const activeHeight = this.nudgeHeight(
						entry.contentRect.height
					);

					this.updateGuard(activeHeight);
					this.oscillations += 1;
				}
			});

			this.contentObserver.observe(this.contentNode);
		}
	}
	componentDidUpdate() {
		this._oscillations = undefined;
	}

	get containerHeight() {
		return this.containerNode ? this.containerNode.clientHeight : 400;
	}

	get contentHeight() {
		return this.state.contentHeight ?? 0;
	}

	get oscillations() {
		return this._oscillations ?? 0;
	}
	set oscillations(value: number) {
		this._oscillations = (this._oscillations ?? 0) + value;
	}

	construct() {
		const { color, borderColor, borderWidth } =
			this.santiseOptionalParameters();

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
					fill={color}
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
		return (
			<div style={containerStyle(styleProps)}>
				<this.HexSVG styles={styleProps} />

				<this.CenterAlignedElement
					element={element}
					useVerticalAlignment={useVerticalAlignment}
				/>
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
	construct() {
		let components = super.construct();

		components.defs.push(
			<pattern
				id="img1"
				patternContentUnits="objectBoundingBox"
				width="1"
				height="1"
			>
				<image
					href={this.props.img}
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

const LogoChevCutout =
	"M 25 86.6025 l 50 -86.6025 l -50 -86.6025 h 25 l 50 86.6025 l -50 86.6025 Z";
const LogoChevColourMask =
	"M 37.8305 -96.7441 L 93.4715 -0.224 L 37.0735 100.4596 L 185.8279 111.8149 L 233.1417 -14.9859 L 191.8841 -96.7441 Z";
const LogoChevDiamond =
	"M -21.0101 0.0202 L 15.8088 -105.7362 L 89.4466 -0.3715 L 25.2093 85.8005 L -21.2164 0.1027 Z";
const LogoChevSplit = "M 95 0 v 5 h120 v -10 h-120 v5";
export class LogoHexagon extends Hexagon {
	getDefaultAssignments() {
		return [
			...super.getDefaultAssignments(),
			{ key: "withGap", return_value: false },
		];
	}
	construct() {
		const { withGap } = this.santiseOptionalParameters();

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
					d={LogoChevDiamond}
					fill={logo_yellow}
					mask="url(#logoCutout)"
				/>,
				<path
					d={LogoChevColourMask}
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
						d={LogoChevCutout}
						fill="black"
					/>
					<path
						d={LogoChevSplit}
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
						d={LogoChevCutout}
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
	getDefaultAssignments() {
		return [
			...super.getDefaultAssignments(),
			{ key: "isLeftHanded", return_value: true },
			{ key: "colour", return_value: midnight_green },
		];
	}
	construct() {
		const { isLeftHanded, color } = this.santiseOptionalParameters();

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
					fill={color}
				/>,
			],
		};
	}
}
