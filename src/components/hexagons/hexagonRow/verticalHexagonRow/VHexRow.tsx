import React from "react";

import { IHexagonRowElements } from "../HexagonRow.types";

import { formatComponent } from "../../../../utils/reactUtils";
import { PointedTopHexagon } from "../../Hexagons";

import {
	lItemStyle,
	narrowBottomRowStyle,
	narrowLayoutContainerStyle,
	narrowTopRowStyle,
	sItemStyle,
	wideLayoutContainerStyle,
} from "./VHexRow.styles";
import {
	IVerticalHexagonGridState,
	VerticalHexagonFeatureGridProps,
} from "./VHexRow.types";

const LAYOUT_BREAKPOINT = 1500;

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
						<div
							style={sItemStyle(index)}
							key={index}
						>
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

export const VerticalHexagonFeatureGrid: React.FC<
	VerticalHexagonFeatureGridProps
> = ({ featureCallouts, hexagonArgs, useVerticalAlignment = false }) => {
	const elements = featureCallouts.map((calloutProps, index) => {
		return (
			<PointedTopHexagon
				key={index}
				args={hexagonArgs}
				element={calloutProps}
				opacity={1}
				useVerticalAlignment={useVerticalAlignment}
			/>
		);
	});

	return <VerticalHexagonGrid elements={elements as any} />;
};
