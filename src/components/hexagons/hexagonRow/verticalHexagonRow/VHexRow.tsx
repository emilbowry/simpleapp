import React, { useEffect, useState } from "react";

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
import { VerticalHexagonFeatureGridProps } from "./VHexRow.types";

const LAYOUT_BREAKPOINT = 1500;

export const VerticalHexagonGrid: React.FC<IHexagonRowElements> = ({
	elements,
}) => {
	const [isNarrow, setIsNarrow] = useState(false);

	const updateLayout = () => {
		const shouldBeNarrow = window.innerWidth < LAYOUT_BREAKPOINT;
		if (shouldBeNarrow !== isNarrow) {
			setIsNarrow(shouldBeNarrow);
		}
	};

	useEffect(() => {
		updateLayout();
		window.addEventListener("resize", updateLayout);
		return () => {
			window.removeEventListener("resize", updateLayout);
		};
	}, [isNarrow]);

	const renderWideLayout = () => {
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
	};

	const renderNarrowLayout = () => {
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
	};

	return (
		<div style={{ zIndex: 50 }}>
			{isNarrow ? renderNarrowLayout() : renderWideLayout()}
		</div>
	);
};
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
