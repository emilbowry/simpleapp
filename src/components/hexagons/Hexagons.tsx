import React, { createContext, useContext } from "react";

import {
	formatComponent,
	Map,
	NoOpFC,
	SantisedElMap,
} from "../../utils/reactUtils";
import {
	Flattop_Hex_Path,
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
	IOptParamMap,
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

const HexagonContext = createContext<IHexagonState>({} as any);

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
	static maxOsc = 10;
	private n_updates = 0;

	private containerNode: TRefNode<Element> = null;

	private contentNode: TRefNode<Element> = null;
	private contentObserver: TContentObserver = null;
	private _oscillations: TOscillation = undefined;

	hexPath!: string;
	usePointedTop!: boolean;
	// ElContext: React.Context<IHexagonState>;

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
		// this.ElContext = createContext<IHexagonState>(this.hex_state);
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
	getDefaultAssignments(): IOptParamMap[] {
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
			const activeHeight = this.nudgeHeight(entry.contentRect.height);

			this.updateGuard(activeHeight);
			this.oscillations += 1;
		}
	};

	override componentWillUnmount() {
		this.contentObserver && this.contentObserver.disconnect();
	}

	override componentDidMount() {
		this.setState({ containerHeight: this.containerHeight });
		if (this.contentNode) {
			this.contentObserver = new ResizeObserver(this.observerCallback);

			this.contentObserver.observe(this.contentNode);
		}
	}
	override componentDidUpdate() {
		this.n_updates += 1;
		if (this.n_updates / Hexagon.maxOsc < this.oscillations) {
			this._oscillations = undefined;
		}
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

	override render() {
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
		this.setState({ contentHeight: height });
	}
}

//
// ===== PointedTopHexagon =====
//

class PointedTopHexagon extends Hexagon {
	static override usePointedTop = true;
}

export { Hexagon, PointedTopHexagon };
