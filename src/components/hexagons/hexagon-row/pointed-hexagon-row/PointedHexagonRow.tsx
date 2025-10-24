// src/components/hexagons/hexagon-row/pointed-hexagon-row/PointedHexagonRow.tsx

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
} from "./PointedHexagonRow.styles";
import { PointedtopHexagonFeatureGridProps } from "./PointedHexagonRow.types";
import { useNarrowLayout } from "../../../../hooks/WindowSizeDependent";

const PointedtopHexagonGrid: React.FC<IHexagonRowElements> = ({ elements }) => {
	const isNarrow = useNarrowLayout();
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
const PointedtopHexagonFeatureGrid: React.FC<
	PointedtopHexagonFeatureGridProps
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

	return <PointedtopHexagonGrid elements={elements as any} />;
};
export { PointedtopHexagonFeatureGrid };
