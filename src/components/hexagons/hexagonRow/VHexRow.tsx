import React from "react";
import {
	b_green,
	bgwhite,
	grey,
	l_midnight_green,
	midnight_green,
	purple,
} from "../../../utils/defaultColours";
import { VertHexagon } from "../Hexagons";
import { vertHexStyle, vertContainer } from "./VHexRow.styles";
import { IVerticalHexagonRowProps } from "./HexagonRow.types";

export class VerticalHexagonRow extends React.Component<IVerticalHexagonRowProps> {
	render() {
		const { index, element, size = 500, gap = 0 } = this.props;

		const r = size / 2;

		const hexWidth = (Math.sqrt(3) / 2) * size;

		const verticalOffset = 1.5 * r + gap;
		const horizontalOffset = hexWidth + gap;

		const containerWidth = hexWidth * 2 + size;
		const containerHeight = verticalOffset + r;

		const isLeft = index % 2 === 0;

		const palette = [
			b_green,
			midnight_green,
			purple,
			grey,
			l_midnight_green,
		];
		const colour = palette[index % palette.length];

		const centerX = containerWidth / 2 - size / 2;

		return (
			<div style={vertContainer(containerWidth, containerHeight)}>
				<div
					style={{
						...vertHexStyle(centerX, 0),
						filter: "brightness(150%)",
					}}
				>
					<VertHexagon
						size={size}
						args={{ colour }}
						opacity={0.5}
					/>
				</div>

				<div
					style={{
						...vertHexStyle(
							centerX - horizontalOffset / 2,
							verticalOffset
						),
					}}
				>
					<VertHexagon
						size={size}
						args={{ colour }}
						opacity={0.8}
						element={isLeft ? element : null}
					/>
				</div>

				<div
					style={{
						...vertHexStyle(
							centerX + horizontalOffset / 2,
							verticalOffset
						),
					}}
				>
					<VertHexagon
						size={size}
						opacity={0.8}
						args={{ colour }}
						element={!isLeft ? element : null}
					/>
				</div>
			</div>
		);
	}
}

// src/components/hexagons/verticalHexagonGrid/VerticalHexagonGrid.tsx

import { IHexagonRowElements } from "../hexagonRow/HexagonRow.types";
// Assuming formatComponent is in a shared utils file
import { formatComponent } from "../../../utils/reactUtils";
import { light_mix_green } from "../../../utils/defaultColours";
import { genericSectionStyle } from "../../../styles";
// import { lItemStyle } from "../../callingcard/CallingCard.styles";

const gridContainerStyle: React.CSSProperties = {
	// ...genericSectionStyle,

	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	width: "100%",
	alignItems: "center",
};

// --- Constants and State ---

const LAYOUT_BREAKPOINT = 1500; // The pixel width at which the layout switches

interface IVerticalHexagonGridState {
	isNarrow: boolean;
}

// --- Styling ---

const wideLayoutContainerStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	width: "102%",
	marginLeft: `-1.6%`,
	alignItems: "center",
};

const narrowLayoutContainerStyle: React.CSSProperties = {
	width: "100%",
	// marginLeft: `-1.7%`,
};

const narrowTopRowStyle: React.CSSProperties = {
	display: "grid",
	width: "102%",
	marginLeft: `${-1.4}%`,

	gridTemplateColumns: "repeat(2, 1fr)",
};

// crude way to stop slight pixel gap between hex's
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

// --- Component ---

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
		this.updateLayout(); // Check layout on initial mount
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

export const VerticalHexGridDemo: React.FC = () => {
	const hexagons = [
		<VertHexagon args={{ colour: purple }} />,
		<VertHexagon args={{ colour: l_midnight_green }} />,
		<VertHexagon args={{ colour: light_mix_green }} />,
	] as const;

	return (
		<div
			style={{
				// ...genericSectionStyle,
				width: "100%",
			}}
		>
			<VerticalHexagonGrid elements={hexagons} />
		</div>
	);
};
