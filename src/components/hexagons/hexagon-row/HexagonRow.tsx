// src/components/hexagons/hexagonRow/HexagonRow.tsx

import React from "react";
import { formatComponent, ValidComponent } from "../../../utils/reactUtils";
import {
	container,
	gridPositionCSS,
	midStyle,
	sideStyle,
} from "./HexagonRow.styles";
import { IHexagonGridElements, IHexRowLayoutProps } from "./HexagonRow.types";

import { ABSOLUTE_SPACING, RELATIVE_SPACING } from "./HexagonRow.consts";

const HexagonRow: React.FC<IHexRowLayoutProps> = ({
	elements,
	relative_space,
	absolute_space,
}) => {
	return (
		<>
			<div style={sideStyle(relative_space, absolute_space, true)}>
				{formatComponent(elements[0], true)}
			</div>
			<div style={midStyle(relative_space, absolute_space)}>
				{formatComponent(elements[1], true)}
			</div>
			<div style={sideStyle(relative_space, absolute_space, false)}>
				{formatComponent(elements[2], true)}
			</div>
		</>
	);
};

const HexagonGrid: React.FC<IHexagonGridElements> = ({
	rows,
	relative_space = RELATIVE_SPACING,
	absolute_space = ABSOLUTE_SPACING,
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
					relative_space,
					absolute_space
				),

				...containerStyle,
			}}
		>
			<div style={container(relative_space, absolute_space, l)}>
				{rows.map((row, _index) => (
					<HexagonRow
						key={_index}
						elements={row.elements}
						relative_space={relative_space}
						absolute_space={absolute_space}
						len={l}
					/>
				))}
			</div>
		</div>
	);
};
export { HexagonGrid };
