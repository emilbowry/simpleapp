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
	const k1 = K({ relative_spacing, absolute_spacing });

	/*	
		To appropriately adjust the "height", so we have no phantom whitespace due to non-existant top middle element
		- may expand later to auto adjust based on bottom layout
		- add overall height calculation for appropriate bottom white space
	*/
	const x = 1;
	return (
		<div
			style={{
				background: "rgb(0,255,0,0.5)",
				// height: `calc(100% - ${
				// 	(relative_spacing * (length - 1)) / length
				// }%)`,
				height: "100%",
				// marginBottom: `calc(-1*(${
				// 	(relative_spacing * ASPECT_RATIO) / length / 2 / k1
				// }% + ${((relative_spacing / 2) * ASPECT_RATIO) / k1}%))`,
				// marginBottom: `calc(-1*( ${
				// 	((relative_spacing / 2) * ASPECT_RATIO) / k1
				// }%))`,

				// paddingTop: `calc(${
				// 	(relative_spacing * ASPECT_RATIO) / length / 2 / k1
				// }% +  ${(50 * ASPECT_RATIO) / length / k1}%)`,
				// marginBottom: `calc(1*(${
				// 	(relative_spacing * ASPECT_RATIO) / length / 2 / k1
				// }% +  ${(50 * ASPECT_RATIO) / length / k1}%))`,
				// paddingTop: "40%",
				// ...gridPositionCSS(
				// 	rows[0].elements[1],
				// 	rows[rows.length - 1].elements[0],

				// 	length,
				// 	relative_spacing,
				// 	absolute_spacing
				// ),
				...gridPositionCSS(
					// null,
					// 1,
					rows[0].elements[1],
					// rows[rows.length - 1].elements[0],
					// rows[rows.length - 1].elements[2],

					1,
					1,

					length,
					relative_spacing,
					absolute_spacing
				),
				overflow: "visible",
				// position: "absolute",
			}}
		>
			{" "}
			<div
				className={class_name ?? ""}
				style={{
					// ...gridPositionCSS(
					// 	rows[0].elements[1],
					// 	rows[rows.length - 1].elements[1],

					// 	length,
					// 	relative_spacing,
					// 	absolute_spacing
					// ),
					// background: "rgb(0,255,0,0.5)",
					// position: "relative",
					// top: 0,
					...containerStyle,
					height: "100%",
					// paddingBottom: `calc(1*${relative_spacing / length}% + 1%)`,
					// paddingBottom: `calc(1*${
					// 	relative_spacing / length
					// }% + ${x}%)`,
					// paddingTop: `calc((100% - ${relative_spacing}% )/${length} )`,
					// paddingTop: `calc(${100 / ASPECT_RATIO / (2 * length)}%  )`,

					// paddingTop: `calc(${relative_spacing / length}% + ${
					// 	((relative_spacing / 2) * ASPECT_RATIO) / k1
					// }%)`,
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
