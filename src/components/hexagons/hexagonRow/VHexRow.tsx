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
