import React, { createContext, useContext } from "react";

import {
	logo_blue,
	logo_yellow,
	midnight_green,
} from "../../utils/defaultColours";
import { ElMap, formatComponent, ValidComponent } from "../../utils/reactUtils";
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
import {
	IComponentDefinitions,
	IHexagonConstruction,
	IHexObjState,
	IOptionalParametersAssignments,
	TContentObserver,
	THexFC,
	TOscillation,
	TRefNode,
} from "./Hexagons.types";
import {
	Flattop_Hex_Path,
	Pointedtop_Hex_Path,
	Logo_Chev_Diamond,
	Logo_Chev_Colour_Mask,
	Logo_Chev_Cutout,
	Logo_Chev_Split,
	Hex_Starting_State,
} from "./Hexagons.consts";

export const HexSVG: React.FC<{
	styles: any;
	useFlatTop: boolean;
	children: React.ReactNode;
}> = ({ styles, useFlatTop, children }) => (
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
		{children}
	</svg>
);
const NoOpFC: React.FC<
	{
		children?: React.ReactNode;
	} & any
> = ({ children }) => <>{children}</>;

interface element_cont {
	containerNodeRef: (node: TRefNode<HTMLDivElement>) => void;
	contentNodeRef: (node: TRefNode<Element>) => void;
	containerHeight: number;
	contentHeight: number;
	usePointedTop: boolean;
	fontSize: number;
	construct_fn: (args?: any) => IComponentDefinitions;
}
const MyElCont = createContext<element_cont>({} as any);

const ComposedHexSVG: THexFC = ({ styles }) => {
	const { construct_fn, usePointedTop } = useContext(MyElCont);
	const { defs, paths } = construct_fn();

	return (
		<HexSVG
			styles={styles}
			useFlatTop={!usePointedTop}
		>
			<defs>
				{defs.map((def, i) => (
					<React.Fragment key={i}>{def}</React.Fragment>
				))}
			</defs>
			{paths.map((path, i) => (
				<React.Fragment key={i}>{path}</React.Fragment>
			))}
		</HexSVG>
	);
};

const ContentWrapper: React.FC<{
	children?: React.ReactNode;
}> = ({ children }) => {
	const { contentNodeRef } = useContext(MyElCont);

	return (
		<div ref={contentNodeRef}>
			<div style={ELWrapperStyle}>{children}</div>
		</div>
	);
};

const ScallingWrapper: THexFC = ({ children }) => {
	const { fontSize } = useContext(MyElCont);

	return (
		<div
			style={{
				...ElContainerStyle,
				fontSize: `calc(max(${fontSize}vw,1px))`,
			}}
		>
			{children}
		</div>
	);
};

export class Hexagon
	extends React.Component<any, IHexObjState>
	implements IHexagonConstruction
{
	static usePointedTop = false;
	static defaultHexPath = Flattop_Hex_Path;
	static altHexPath = Pointedtop_Hex_Path;

	static starting_state = Hex_Starting_State;
	private containerNode: TRefNode<Element> = null;
	private contentNode: TRefNode<Element> = null;
	private contentObserver: TContentObserver = null;
	private _oscillations: TOscillation = undefined;
	private dampingThreshold = 0.02;

	hexPath!: string;
	usePointedTop!: boolean;

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
	BoundingShape: React.FC = () => (
		<>
			<div style={PolyCutout(this.usePointedTop, true)} />
			<div style={PolyCutout(this.usePointedTop, false)} />
		</>
	);

	ContainedElement: THexFC = ({ element, useVerticalAlignment }) => {
		let ScallingWrapper = NoOpFC;
		let ContentWrapper_int = ContentWrapper;
		let Inner: React.ReactNode;

		if (!Array.isArray(element)) {
			Inner = formatComponent(element);
			if (!useVerticalAlignment) {
				ContentWrapper_int = NoOpFC;
			}
		} else {
			Inner = <ElMap element={element} />;
			ScallingWrapper = ScallingWrapper;
		}
		return (
			<ContentWrapper_int>
				<ScallingWrapper>{Inner}</ScallingWrapper>
			</ContentWrapper_int>
		);
	};

	CenterAlignedElement: THexFC = ({ element, useVerticalAlignment }) => {
		const ContainedElement = (element && this.ContainedElement) as any;
		const BoundingShape = this.BoundingShape;
		/**

		Bound assignment prevents this err:
		`Element type is invalid: expected a string (for built-in components)
		or a class/function (for composite components) but got: undefined.
		You likely forgot to export your component from the file it's defined 
		in, or you might have mixed up default and named imports.` 
		*/
		return (
			element && (
				<div
					style={hexagonalContentStyle}
					ref={this.setContainerRef}
				>
					<div style={elementWrapper}>
						<BoundingShape />
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
			)
		);
	};
	setContainerRef = (node: TRefNode<HTMLDivElement>) => {
		this.containerNode = node;
	};
	setContentRef = (node: TRefNode<Element>) => {
		this.contentNode = node;
	};
	ElContext: React.Context<element_cont>;
	get el_state(): element_cont {
		return {
			containerNodeRef: this.setContainerRef.bind(this),
			contentNodeRef: this.setContentRef.bind(this),
			containerHeight: this.containerHeight,
			contentHeight: this.contentHeight,
			usePointedTop: this.usePointedTop,
			fontSize: this.state.fontSize,
			construct_fn: this.construct.bind(this),
		};
	}
	constructor(props: any) {
		super(props);
		this.setOrientation();
		this.state = Hexagon.starting_state;

		this.ElContext = createContext<element_cont>(this.el_state);
	}
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

	render() {
		const {
			args,
			element = undefined,
			useVerticalAlignment = false,
			...styleProps
		} = this.props;
		return (
			<MyElCont value={this.el_state}>
				<div style={containerStyle(styleProps)}>
					<ComposedHexSVG styles={styleProps} />

					<this.CenterAlignedElement
						element={element}
						useVerticalAlignment={useVerticalAlignment}
					/>
				</div>
			</MyElCont>
		);
	}

	protected setOrientation() {
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
					d={Logo_Chev_Diamond}
					fill={logo_yellow}
					mask="url(#logoCutout)"
				/>,
				<path
					d={Logo_Chev_Colour_Mask}
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
						d={Logo_Chev_Cutout}
						fill="black"
					/>
					<path
						d={Logo_Chev_Split}
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
						d={Logo_Chev_Cutout}
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
