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
	else return {};
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
			<div style={{ zIndex: 50 }}>
				{this.state.isNarrow
					? this.renderNarrowLayout()
					: this.renderWideLayout()}
			</div>
		);
	}
}

// src/components/hexagons/hexagonRow/VerticalHexagonFeatureGrid.tsx

import { VerticalHexagonGrid as BaseVerticalHexagonGrid } from "./VHexRow"; // Renamed to avoid collision
import { PointedTopHexagon } from "../Hexagons";
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
	 * Common style arguments for the PointedTopHexagon wrapper.
	 * Typically includes `colour` and `borderColor`.
	 */
	hexagonArgs: any; // Consider a more precise type if 'args' are well-defined
	theme?: number;
	useVerticalAlignment?: boolean;
}

export const VerticalHexagonFeatureGrid: React.FC<
	VerticalHexagonFeatureGridProps
> = ({ featureCallouts, hexagonArgs, useVerticalAlignment = false }) => {
	console.log(useVerticalAlignment);
	const elements = featureCallouts.map((calloutProps, index) => (
		<PointedTopHexagon
			key={index}
			args={hexagonArgs}
			element={[
				calloutProps.header,

				calloutProps.body,
				calloutProps.footer,
			]}
			opacity={1} // Ensure full opacity for content visibility
			useVerticalAlignment={useVerticalAlignment}
		/>
	));

	return <BaseVerticalHexagonGrid elements={elements as any} />;
};
