// src/components/hexagons/hexagonRow/HexagonRow.tsx

import React from "react";
import { formatComponent } from "../../../utils/reactUtils";
import {
	container,
	gridPositionCSS,
	midStyle,
	sideStyle,
} from "./HexagonRow.styles";
import { IHexagonGridElements, THexRowLayoutProps } from "./HexagonRow.types";

import { ABSOLUTE_SPACING, RELATIVE_SPACING } from "./HexagonRow.consts";

const HexagonRow: React.FC<THexRowLayoutProps> = ({
	elements,
	relative_spacing,
	absolute_spacing,
}) => {
	return (
		<>
			<div
				style={sideStyle({ relative_spacing, absolute_spacing }, true)}
			>
				{formatComponent(elements[0], true)}
			</div>
			<div style={midStyle({ relative_spacing, absolute_spacing })}>
				{formatComponent(elements[1], true)}
			</div>
			<div
				style={sideStyle({ relative_spacing, absolute_spacing }, false)}
			>
				{formatComponent(elements[2], true)}
			</div>
		</>
	);
};

const HexagonGrid: React.FC<IHexagonGridElements> = ({
	rows,
	relative_spacing = RELATIVE_SPACING,
	absolute_spacing = ABSOLUTE_SPACING,
	containerStyle = {},
	class_name,
}) => {
	const l = rows.length;

	/*
		To appropriately adjust the "height", so we have no phantom whitespace due to non-existant top middle element
		- may expand later to auto adjust based on bottom layout
		- add overall height calculation for appropriate bottom white space
	*/

	return (
		<div
			className={class_name ?? ""}
			style={{
				...gridPositionCSS(
					rows[0].elements[1],
					l,
					relative_spacing,
					absolute_spacing
				),

				...containerStyle,
			}}
		>
			<div style={container(relative_spacing, absolute_spacing, l)}>
				{rows.map((row, _index) => (
					<HexagonRow
						key={_index}
						elements={row.elements}
						relative_spacing={relative_spacing}
						absolute_spacing={absolute_spacing}
						len={l}
					/>
				))}
			</div>
		</div>
	);
};
export { HexagonGrid };
