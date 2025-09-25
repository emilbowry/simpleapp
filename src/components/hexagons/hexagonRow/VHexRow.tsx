import React from "react";

import { IHexagonRowElements } from "../hexagonRow/HexagonRow.types";

import { formatComponent } from "../../../utils/reactUtils";

const LAYOUT_BREAKPOINT = 1500;

interface IVerticalHexagonGridState {
	isNarrow: boolean;
}

const wideLayoutContainerStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	width: "102%",
	marginLeft: `-1.6%`,
	alignItems: "center",
};

const narrowLayoutContainerStyle: React.CSSProperties = {
	width: "100%",
};

const narrowTopRowStyle: React.CSSProperties = {
	display: "grid",
	width: "102%",
	marginLeft: `${-1.4}%`,

	gridTemplateColumns: "repeat(2, 1fr)",
};

const lItemStyle = (index: number): React.CSSProperties => {
	if (index == 0) return { marginLeft: "1%", marginRight: "-1%" };
	else if (index == 2) return { marginLeft: "-1%", marginRight: "1%" };
	else return { marginLeft: "-1%", marginRight: "-1%" };
};
const sItemStyle = (index: number): React.CSSProperties => {
	if (index == 0) return { marginLeft: "1%", marginRight: "-1%" };
	else if (index == 1) return { marginLeft: "-1%", marginRight: "1%" };
	return {};
};
const narrowBottomRowStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "1fr",
	width: "50%",
	marginLeft: `${25 - 0.5}%`,
	marginTop: `${-(25 / Math.sqrt(3)) - 1}%`,
};

export class VerticalHexagonGrid extends React.Component<
	IHexagonRowElements,
	IVerticalHexagonGridState
> {
	constructor(props: IHexagonRowElements) {
		super(props);
		this.state = {
			isNarrow: false,
		};
	}

	updateLayout = () => {
		const shouldBeNarrow = window.innerWidth < LAYOUT_BREAKPOINT;

		if (shouldBeNarrow !== this.state.isNarrow) {
			this.setState({ isNarrow: shouldBeNarrow });
		}
	};

	componentDidMount() {
		this.updateLayout();
		window.addEventListener("resize", this.updateLayout);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateLayout);
	}

	renderWideLayout() {
		const { elements } = this.props;
		return (
			<div style={wideLayoutContainerStyle}>
				{elements.map((element, index) => (
					<React.Fragment key={index}>
						<div style={lItemStyle(index)}>
							{formatComponent(element)}
						</div>
					</React.Fragment>
				))}
			</div>
		);
	}

	renderNarrowLayout() {
		const { elements } = this.props;
		const topRowElements = elements.slice(0, 2);
		const bottomRowElement = elements[2];

		return (
			<div style={narrowLayoutContainerStyle}>
				<div style={narrowTopRowStyle}>
					{topRowElements.map((element, index) => (
						<div style={sItemStyle(index)}>
							{formatComponent(element)}
						</div>
					))}
				</div>
				<div style={narrowBottomRowStyle}>
					{formatComponent(bottomRowElement)}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div style={{}}>
				{this.state.isNarrow
					? this.renderNarrowLayout()
					: this.renderWideLayout()}
			</div>
		);
	}
}

// src/components/hexagons/hexagonRow/VerticalHexagonFeatureGrid.tsx

import { VerticalHexagonGrid as BaseVerticalHexagonGrid } from "./VHexRow"; // Renamed to avoid collision
import { VertHexagon } from "../Hexagons";
import { TriPartCallout } from "../../callingcard/callout/CallOut";

import { ValidComponent } from "../../../utils/reactUtils";
import { Theme } from "../../../styles";
export const hexCallStyle: React.CSSProperties = {
	display: "flex",
	width: "100%",
	minWidth: 0,
	minHeight: 0,
	margin: "0 auto",
	marginTop: "-15%",
};
// Reusable base class for HexWrapCallOut, to be used by specific callouts.
// This ensures that the wrapper style for HexCallouts is consistently applied.
export class HexWrapCallOut extends TriPartCallout {
	static {
		this.styler.updateStyle("wrapperStyle_style", {
			def_static_css: {
				...hexCallStyle,
				backgroundColor: "transparent", // Ensure transparency for hexagon overlap
			},
		});
	}
}

interface IFeatureCalloutProps {
	themeId?: number;
	header?: ValidComponent;
	body: ValidComponent;
	footer?: ValidComponent;
}

// A generic Hexagon Callout wrapper that applies the shared HexWrapCallOut styling
const GenericHexagonCallout: React.FC<IFeatureCalloutProps> = ({
	themeId = -1, // Default to a theme that often implies transparency/light colors
	header,
	body,
	footer,
}) => (
	<HexWrapCallOut
		themeId={themeId}
		header={header}
		body={body}
		footer={footer}
	/>
);

interface VerticalHexagonFeatureGridProps {
	/**
	 * An array of feature callout configurations.
	 */
	featureCallouts: IFeatureCalloutProps[];
	/**
	 * Common style arguments for the VertHexagon wrapper.
	 * Typically includes `colour` and `borderColor`.
	 */
	hexagonArgs: any; // Consider a more precise type if 'args' are well-defined
	theme?: number;
}

export const getElHorizontal = (...components: ValidComponent[]) => {
	return (
		<div
			style={{
				position: "relative",
				height: "100%",
				margin: 0,
			}}
		>
			<div
				style={{
					margin: 0,
					padding: 0,
					visibility: "hidden",
					fontSize: 0,
				}}
			>
				no-op
			</div>
			<div
				style={{
					margin: 0,
					padding: 0,
				}}
			>
				{components &&
					components.map(
						(item, _index) =>
							item && (
								<div
									style={{
										fontSize: "2.5vw",
										margin: 0,
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
export const getElVertical = (...components: ValidComponent[]) => {
	return (
		<div
			style={{
				position: "relative",
				height: "100%",
				margin: 0,
			}}
		>
			<div
				style={{
					margin: 0,
					fontSize: 0,
				}}
			>
				no-op
			</div>
			<div
				style={{
					height: "calc(100%)",
					fontSize: "2vw",

					display: "block",
					margin: 0,
				}}
			>
				<div
					style={{
						visibility: "hidden",
					}}
				>
					why does this need to be here, it breaks when fontSize is 0
					too, so resorting to visability
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

export const VerticalHexagonFeatureGrid: React.FC<
	VerticalHexagonFeatureGridProps
> = ({ featureCallouts, hexagonArgs, theme }) => {
	const elements = featureCallouts.map((calloutProps, index) => (
		// const image = featureCallouts

		<VertHexagon
			key={index}
			args={hexagonArgs}
			element={getElVertical(
				calloutProps.header,

				calloutProps.body,
				calloutProps.footer
				// theme
			)}
			opacity={1} // Ensure full opacity for content visibility
			useVerticalAlignment={true}
		/>
	));

	return (
		<div style={{ width: "100%", zIndex: 25 }}>
			<BaseVerticalHexagonGrid elements={elements as any} />
		</div>
	);
};
