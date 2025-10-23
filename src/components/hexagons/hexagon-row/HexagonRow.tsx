// src/components/hexagons/hexagonRow/HexagonRow.tsx

import React from "react";
import { formatComponent } from "../../../utils/reactUtils";
import { container, wrapper, elementStyle } from "./HexagonRow.styles";
import { IHexagonGridElements, THexRowLayoutProps } from "./HexagonRow.types";

import {
	DEFAULT_ABSOLUTE_SPACING,
	DEFAULT_RELATIVE_SPACING,
} from "./HexagonRow.consts";

const HexagonRow: React.FC<THexRowLayoutProps> = ({
	elements,
	relative_spacing,
	absolute_spacing,
	n,
}) => {
	return (
		<>
			{elements.map((el, index) => (
				<div
					style={elementStyle({
						relative_spacing,
						absolute_spacing,
						index,
						n,
					})}
					key={index}
				>
					{formatComponent(el, true)}
				</div>
			))}
		</>
	);
};

const HexagonGrid: React.FC<IHexagonGridElements> = ({
	rows,
	relative_spacing = DEFAULT_RELATIVE_SPACING,
	absolute_spacing = DEFAULT_ABSOLUTE_SPACING,
	containerStyle = {},
	class_name,
}) => {
	const length = rows.length;
	const n = rows[0].elements.length;
	return (
		<div
			className={class_name ?? ""}
			style={{
				...wrapper(
					rows[0].elements[1],
					rows[rows.length - 1].elements[0],
					rows[rows.length - 1].elements[2],
					length,
					relative_spacing,
					absolute_spacing,
					n
				),
				...containerStyle,
			}}
		>
			<div
				style={container(relative_spacing, absolute_spacing, length, n)}
			>
				{rows.map((row, _index) => (
					<HexagonRow
						key={_index}
						n={n}
						elements={row.elements}
						relative_spacing={relative_spacing}
						absolute_spacing={absolute_spacing}
						len={length}
					/>
				))}
			</div>
		</div>
	);
};
export { HexagonGrid };
