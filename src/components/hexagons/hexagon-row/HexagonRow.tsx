// src/components/hexagons/hexagonRow/HexagonRow.tsx

import React from "react";
import { formatComponent } from "../../../utils/reactUtils";
import {
	container,
	gridPositionCSS,
	K,
	midStyle,
	sideStyle,
} from "./HexagonRow.styles";
import { IHexagonGridElements, THexRowLayoutProps } from "./HexagonRow.types";

import {
	ABSOLUTE_SPACING,
	ASPECT_RATIO,
	RELATIVE_SPACING,
} from "./HexagonRow.consts";

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
	const length = rows.length;

	return (
		<div
			style={{
				// height: "100%",
				background: "rgb(255,0,0,0.5)",
				width: "100vw",
				...gridPositionCSS(
					rows[0].elements[1],
					rows[rows.length - 1].elements[0],
					rows[rows.length - 1].elements[2],
					length,
					relative_spacing,
					absolute_spacing
				),
				overflow: "visible",
			}}
		>
			<div
				className={class_name ?? ""}
				style={{
					...containerStyle,
				}}
			>
				<div
					style={container(
						relative_spacing,
						absolute_spacing,
						length
					)}
				>
					{rows.map((row, _index) => (
						<HexagonRow
							key={_index}
							elements={row.elements}
							relative_spacing={relative_spacing}
							absolute_spacing={absolute_spacing}
							len={length}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
export { HexagonGrid };
