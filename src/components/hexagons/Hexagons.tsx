import React, { createContext, useContext } from "react";

import {
	formatComponent,
	Map,
	NoOpFC,
	SantisedElMap,
} from "../../utils/reactUtils";
import {
	Flattop_Hex_Path,
	Hex_El_Starting_State,
	Hex_Starting_State,
	Pointedtop_Hex_Path,
} from "./Hexagons.consts";
import {
	containerStyle,
	ElContainerStyle,
	elementSection,
	elementWrapper,
	ELWrapperStyle,
	hexagonalContentStyle,
	PolyCutout,
	svgStyle,
} from "./Hexagons.styles";
import {
	IHexagonState,
	IHexObjState,
	IOptionalParametersAssignments,
	TContentObserver,
	THexFC,
	TOscillation,
	TRefNode,
} from "./Hexagons.types";

const HexSVG: React.FC<{
	styles: any;
	usePointedTop?: boolean;
	children: React.ReactNode;
}> = ({ styles, usePointedTop, children }) => {
	const { usePointedTop: contextPointedTop } = useContext(HexagonContext);
	const isPointedTop = usePointedTop || contextPointedTop || false;

	return (
		<svg
			style={svgStyle(styles)}
			viewBox={
				isPointedTop
					? `${100 - (200 * Math.sqrt(3)) / 4} -100 ${
							(200 * Math.sqrt(3)) / 2
					  } 200`
					: `0 -${(200 * Math.sqrt(3)) / 4} 200 ${
							(200 * Math.sqrt(3)) / 2
					  }`
			}
			xmlns="http://www.w3.org/2000/svg"
		>
			{children}
		</svg>
	);
};

const HexagonContext = createContext<IHexagonState>(Hex_El_Starting_State);

const ComposedHexSVG: THexFC = ({ styles }) => {
	const { construct } = useContext(HexagonContext);
	const { defs, paths } = construct();

	return (
		<HexSVG styles={styles}>
			<defs>
				<Map elements={defs} />
			</defs>
			<Map elements={paths} />
		</HexSVG>
	);
};

const ContentWrapper: React.FC<{
	children?: React.ReactNode;
}> = ({ children }) => {
	const { setContentRef } = useContext(HexagonContext);

	return (
		<div ref={setContentRef}>
			<div style={ELWrapperStyle}>{children}</div>
		</div>
	);
};
const ContainedElement: THexFC = ({ element, useVerticalAlignment }) => {
	const HContentWrapper =
		!Array.isArray(element) && !useVerticalAlignment
			? NoOpFC
			: ContentWrapper;
	const Inner: React.ReactNode = !Array.isArray(element) ? (
		formatComponent(element)
	) : (
		<SantisedElMap element={element} />
	);
	const HScallingWrapper = !Array.isArray(element) ? NoOpFC : ScallingWrapper;

	return (
		<HContentWrapper>
			<HScallingWrapper>{Inner}</HScallingWrapper>
		</HContentWrapper>
	);
};

const ScallingWrapper: THexFC = ({ children }) => {
	const { fontSize } = useContext(HexagonContext);

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
const BoundingShape: React.FC = () => {
	const { usePointedTop } = useContext(HexagonContext);

	return (
		<>
			<div style={PolyCutout(usePointedTop, true)} />
			<div style={PolyCutout(usePointedTop, false)} />
		</>
	);
};

const CenterAlignedElement: THexFC = ({ element, useVerticalAlignment }) => {
	const { containerHeight, contentHeight, setContainerRef } =
		useContext(HexagonContext);

	return (
		element && (
			<div
				style={hexagonalContentStyle}
				ref={setContainerRef}
			>
				<div style={elementWrapper}>
					<BoundingShape />
					<div
						style={{
							...elementSection,
							paddingTop: useVerticalAlignment
								? `calc(${
										(containerHeight - contentHeight) / 2
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

class Hexagon
	extends React.Component<any, IHexObjState>
	implements IHexagonState
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
	ElContext: React.Context<IHexagonState>;

	get fontSize() {
		return 2.5; // only to obey interface not used
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
	get hex_state(): IHexagonState {
		return {
			setContainerRef: this.setContainerRef,
			setContentRef: this.setContentRef,
			containerHeight: this.containerHeight,
			contentHeight: this.contentHeight,
			usePointedTop: this.usePointedTop,
			fontSize: this.state.fontSize,
			construct: this.construct.bind(this),
		};
	}
	setContainerRef = (node: TRefNode<HTMLDivElement>) => {
		this.containerNode = node;
	};
	setContentRef = (node: TRefNode<Element>) => {
		this.contentNode = node;
	};
	private nudgeHeight = (height: number) => {
		const delta = this.contentHeight - height;
		const pertubation = 2 * (this.oscillations % 2) - 1;
		return (
			height +
			delta * +!!this.oscillations +
			pertubation * this.oscillations * +!!delta
		);
	};
	constructor(props: any) {
		super(props);
		this.setOrientation();
		this.state = Hexagon.starting_state;
		this.ElContext = createContext<IHexagonState>(this.hex_state);
	}
	santiseOptionalParameters() {
		const { args } = this.props;
		const sanitisedArgs: any = {};
		const getValue = (return_value: any, f_params?: any) =>
			typeof return_value === "function"
				? return_value(args, f_params)
				: return_value;

		for (const assignment of this.getDefaultAssignments()) {
			const { key, alias, return_value, f_params } = assignment;
			const _return_value = getValue(return_value, f_params);
			sanitisedArgs[alias || key] = args?.[key] || _return_value;
		}

		return sanitisedArgs;
	}
	getDefaultAssignments(): IOptionalParametersAssignments[] {
		return [
			{
				key: "borderWidth",
				return_value: (original_args) =>
					original_args?.borderColour && "2px",
			},
			{ key: "colour", alias: "color", return_value: "#003845" },
			{
				key: "borderColour",
				alias: "borderColor",
				return_value: undefined,
			},
		];
	}
	observerCallback: ResizeObserverCallback = (entries) => {
		const entry = entries[0];
		if (entry) {
			this.setState({
				containerHeight: this.containerHeight,
			});

			const activeHeight = this.nudgeHeight(entry.contentRect.height);

			this.updateGuard(activeHeight);
			this.oscillations += 1;
		}
	};

	componentWillUnmount() {
		this.contentObserver && this.contentObserver.disconnect();
	}

	componentDidMount() {
		if (this.contentNode) {
			this.contentObserver = new ResizeObserver(this.observerCallback);

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
			svgStyle = {},
			useVerticalAlignment = false,
			...styleProps
		} = this.props;
		return (
			<HexagonContext value={this.hex_state}>
				<div style={containerStyle(styleProps)}>
					<ComposedHexSVG styles={svgStyle} />

					<CenterAlignedElement
						element={element}
						useVerticalAlignment={useVerticalAlignment}
					/>
				</div>
			</HexagonContext>
		);
	}

	protected setOrientation() {
		const ctor = this.constructor as typeof Hexagon;
		this.usePointedTop = this.props.usePointedTop ?? ctor.usePointedTop;
		this.hexPath = !this.usePointedTop
			? ctor.defaultHexPath
			: ctor.altHexPath;
	}

	private updateGuard(height: number) {
		const updateable =
			!this.contentHeight ||
			Math.abs(this.contentHeight - height) >
				window.innerWidth * this.dampingThreshold;

		updateable && this.setState({ contentHeight: height });
	}
}

//
// ===== PointedTopHexagon =====
//

class PointedTopHexagon extends Hexagon {
	static usePointedTop = true;
}

export { Hexagon, PointedTopHexagon };

/** Tried to immitate old */

// import React from "react";
// import {
// 	formatComponent,
// 	NoOpFC,
// 	SantisedElMap,
// 	ValidComponent,
// } from "../../utils/reactUtils";
// import {
// 	containerStyle,
// 	ElContainerStyle,
// 	elementSection,
// 	PolyCutout,
// 	elementWrapper,
// 	ELWrapperStyle,
// 	hexagonalContentStyle,
// 	svgStyle,
// } from "./Hexagons.styles";
// import {
// 	IComponentDefinitions,
// 	IOptionalParametersAssignments,
// 	THexFC,
// } from "./Hexagons.types";
// import { Flattop_Hex_Path, Pointedtop_Hex_Path } from "./Hexagons.consts";

// export const HexSVG: React.FC<{
// 	styles: any;
// 	useFlatTop: boolean;
// 	defs: React.ReactElement[];
// 	paths: React.ReactElement[];
// }> = ({ styles, useFlatTop, defs, paths }) => (
// 	<svg
// 		style={svgStyle(styles)}
// 		viewBox={
// 			useFlatTop
// 				? `0 -${(200 * Math.sqrt(3)) / 4} 200 ${
// 						(200 * Math.sqrt(3)) / 2
// 				  }`
// 				: `${100 - (200 * Math.sqrt(3)) / 4} -100 ${
// 						(200 * Math.sqrt(3)) / 2
// 				  } 200`
// 		}
// 		xmlns="http://www.w3.org/2000/svg"
// 	>
// 		<defs>
// 			{defs.map((def, i) => (
// 				<React.Fragment key={i}>{def}</React.Fragment>
// 			))}
// 		</defs>
// 		{paths.map((path, i) => (
// 			<React.Fragment key={i}>{path}</React.Fragment>
// 		))}
// 	</svg>
// );

// const BoundingShape: React.FC<{ usePointedTop: boolean }> = ({
// 	usePointedTop,
// }) => (
// 	<>
// 		<div style={PolyCutout(usePointedTop, true)} />
// 		<div style={PolyCutout(usePointedTop, false)} />
// 	</>
// );
// interface IHexagonConstruction {
// 	construct(args?: any): IComponentDefinitions;
// }

// export class Hexagon
// 	extends React.Component<
// 		any,
// 		{
// 			contentHeight: number | undefined;
// 			containerHeight: number;
// 			fontSize: number;
// 		}
// 	>
// 	implements IHexagonConstruction
// {
// 	static usePointedTop = false;
// 	static defaultHexPath = Flattop_Hex_Path;
// 	static altHexPath = Pointedtop_Hex_Path;

// 	static starting_state = {
// 		contentHeight: undefined,
// 		containerHeight: 0,
// 		fontSize: 2.5,
// 	};
// 	private containerNode: Element | null = null;
// 	private contentNode: Element | null = null;
// 	private contentObserver: ResizeObserver | null = null;
// 	// private oscillations: number | undefined = undefined;
// 	// private hasUpdated = false;
// 	private _oscillations: undefined | number = undefined;
// 	private dampingThreshold = 0.02;
// 	hexPath!: string;
// 	usePointedTop!: boolean;
// 	AEl: React.FC = () => <></>;

// 	ContentWrapper: React.FC<{
// 		children?: React.ReactNode;
// 	}> = ({ children }) => {
// 		// const { setContentRef } = useContext(HexagonContext);

// 		return (
// 			<div ref={this.setContentRef}>
// 				<div style={ELWrapperStyle}>{children}</div>
// 			</div>
// 		);
// 	};
// 	ScallingWrapper: THexFC = ({ children }) => {
// 		return (
// 			<div
// 				style={{
// 					...ElContainerStyle,
// 					fontSize: `calc(max(${this.state.fontSize}vw,1px))`,
// 				}}
// 			>
// 				{children}
// 			</div>
// 		);
// 	};
// 	ContainedElement: THexFC = ({ element, useVerticalAlignment }) => {
// 		const HContentWrapper =
// 			!Array.isArray(element) && !useVerticalAlignment
// 				? NoOpFC
// 				: this.ContentWrapper;
// 		const Inner: React.ReactNode = !Array.isArray(element) ? (
// 			formatComponent(element)
// 		) : (
// 			<SantisedElMap element={element} />
// 		);
// 		const HScallingWrapper = !Array.isArray(element)
// 			? NoOpFC
// 			: this.ScallingWrapper;

// 		return (
// 			<HContentWrapper>
// 				<HScallingWrapper>{Inner}</HScallingWrapper>
// 			</HContentWrapper>
// 		);
// 	};

// 	CenterAlignedElement: React.FC<{
// 		element: ValidComponent[] | ValidComponent;
// 		useVerticalAlignment: boolean;
// 	}> = ({ element, useVerticalAlignment }) => {
// 		const ContainedElement = (element && this.ContainedElement) as any;

// 		return element ? (
// 			<div
// 				style={hexagonalContentStyle}
// 				ref={this.setContainerRef}
// 			>
// 				<div style={elementWrapper}>
// 					<BoundingShape usePointedTop={this.usePointedTop} />
// 					<div
// 						style={{
// 							...elementSection,
// 							paddingTop: useVerticalAlignment
// 								? `calc(${
// 										(this.containerHeight -
// 											this.contentHeight) /
// 										2
// 								  }px)`
// 								: 0,
// 						}}
// 					>
// 						<ContainedElement
// 							element={element}
// 							useVerticalAlignment={useVerticalAlignment}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		) : null;
// 	};
// 	santiseOptionalParameters() {
// 		const { args } = this.props;
// 		const sanitisedArgs: any = {};

// 		for (const assignment of this.getDefaultAssignments()) {
// 			const { key, alias, return_value, f_params } = assignment;
// 			const outKey = alias || key;
// 			const _return_value =
// 				typeof return_value === "function"
// 					? return_value(args, f_params)
// 					: return_value;
// 			sanitisedArgs[outKey] = args?.[key] ? args[key] : _return_value;
// 		}

// 		return sanitisedArgs;
// 	}
// 	getDefaultAssignments(): IOptionalParametersAssignments[] {
// 		return [
// 			{
// 				key: "borderWidth",
// 				return_value: (original_args) =>
// 					original_args?.borderColour ? "2px" : undefined,
// 			},
// 			{ key: "colour", alias: "color", return_value: "#003845" },
// 			{
// 				key: "borderColour",
// 				alias: "borderColor",
// 				return_value: undefined,
// 			},
// 		];
// 	}
// 	constructor(props: any) {
// 		super(props);
// 		this.setOrientation();
// 		this.state = Hexagon.starting_state;
// 	}

// 	private setOrientation() {
// 		const ctor = this.constructor as typeof Hexagon;
// 		this.usePointedTop = this.props.usePointedTop ?? ctor.usePointedTop;
// 		this.hexPath = !this.usePointedTop
// 			? ctor.defaultHexPath
// 			: ctor.altHexPath;
// 	}
// 	private nudgeHeight = (height: number) => {
// 		const delta = this.contentHeight - height;
// 		const pertubation = 2 * (this.oscillations % 2) - 1;
// 		return (
// 			height +
// 			delta * +!!this.oscillations +
// 			pertubation * this.oscillations * +!!delta
// 		);
// 	};
// 	HexSVG: React.FC<{
// 		styles: any;
// 	}> = ({ styles }) => {
// 		const { defs, paths } = this.construct();

// 		return (
// 			<svg
// 				style={svgStyle(styles)}
// 				viewBox={
// 					!this.usePointedTop
// 						? `0 -${(200 * Math.sqrt(3)) / 4} 200 ${
// 								(200 * Math.sqrt(3)) / 2
// 						  }`
// 						: `${100 - (200 * Math.sqrt(3)) / 4} -100 ${
// 								(200 * Math.sqrt(3)) / 2
// 						  } 200`
// 				}
// 				xmlns="http://www.w3.org/2000/svg"
// 			>
// 				<defs>
// 					{defs.map((def, i) => (
// 						<React.Fragment key={i}>{def}</React.Fragment>
// 					))}
// 				</defs>
// 				{paths.map((path, i) => (
// 					<React.Fragment key={i}>{path}</React.Fragment>
// 				))}
// 			</svg>
// 		);
// 	};
// 	private updateGuard(height: number) {
// 		let newHeight = undefined;
// 		if (this.state.contentHeight === undefined) {
// 			newHeight = height;
// 		} else if (
// 			Math.abs(this.contentHeight - height) >
// 			window.innerWidth * this.dampingThreshold
// 		) {
// 			newHeight = height;
// 		}
// 		newHeight && this.setState({ contentHeight: height });
// 	}
// 	componentWillUnmount() {
// 		this.contentObserver && this.contentObserver.disconnect();
// 	}

// 	componentDidMount() {
// 		if (this.contentNode) {
// 			this.contentObserver = new ResizeObserver((entries) => {
// 				const entry = entries[0];
// 				if (entry) {
// 					this.setState({
// 						containerHeight: this.containerHeight,
// 					});

// 					const activeHeight = this.nudgeHeight(
// 						entry.contentRect.height
// 					);

// 					this.updateGuard(activeHeight);
// 					this.oscillations += 1;
// 				}
// 			});

// 			this.contentObserver.observe(this.contentNode);
// 		}
// 	}
// 	componentDidUpdate() {
// 		this._oscillations = undefined;
// 	}

// 	get containerHeight() {
// 		return this.containerNode ? this.containerNode.clientHeight : 400;
// 	}

// 	get contentHeight() {
// 		return this.state.contentHeight ?? 0;
// 	}

// 	get oscillations() {
// 		return this._oscillations ?? 0;
// 	}
// 	set oscillations(value: number) {
// 		this._oscillations = (this._oscillations ?? 0) + value;
// 	}

// 	construct() {
// 		const { color, borderColor, borderWidth } =
// 			this.santiseOptionalParameters();

// 		return {
// 			defs: [
// 				<mask id="hexagon">
// 					<path
// 						d={this.hexPath}
// 						fill="white"
// 					/>
// 				</mask>,
// 			],
// 			paths: [
// 				<path
// 					d={this.hexPath}
// 					mask="url(#hexagon)"
// 					fill={color}
// 					stroke={borderColor}
// 					strokeWidth={borderWidth}
// 				/>,
// 			],
// 		};
// 	}

// 	setContainerRef = (node: HTMLDivElement | null) => {
// 		this.containerNode = node;
// 	};
// 	setContentRef = (node: HTMLDivElement | null) => {
// 		this.contentNode = node;
// 	};
// 	render() {
// 		const {
// 			args,
// 			element = undefined,
// 			useVerticalAlignment = false,
// 			...styleProps
// 		} = this.props;
// 		return (
// 			<div style={containerStyle(styleProps)}>
// 				<this.HexSVG styles={styleProps} />

// 				<this.CenterAlignedElement
// 					element={element}
// 					useVerticalAlignment={useVerticalAlignment}
// 				/>
// 			</div>
// 		);
// 	}
// }
