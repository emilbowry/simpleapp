// src/components/hexagons/hexagonRow/HexagonRow.tsx

import React from "react";
import { formatComponent } from "../../../utils/reactUtils";
import { container, midStyle, sideStyle } from "./HexagonRow.styles";
import {
	IHexagonGridElements,
	IHexagonRowElements,
	_IHexagonRowElements,
} from "./HexagonRow.types";

import { rspacing, aspace } from "./HexagonRow.consts";
import { genericSectionStyle } from "../../../styles";

export class HexagonRow extends React.Component<_IHexagonRowElements> {
	render() {
		const { elements, relative_space, absolute_space } = this.props;
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
	}
}
export class HexagonGrid extends React.Component<IHexagonGridElements> {
	render() {
		const {
			rows,
			relative_space = rspacing,
			absolute_space = aspace,
		} = this.props;
		const l = rows.length;
		let margin_top = 0;
		let margin_bottom = 0;
		let _rows = rows;
		/*
			To appropriately adjust the "height", so we have no phantom whitespace due to non-existant top middle element
			- may expand later to auto adjust based on bottom layout
		*/
		if (rows[0].elements[1] === null) {
			margin_top = -(0.5 * 100) / l;
		} else {
			margin_top = (1.5 * 100) / l;
		}

		// if (rows[rows.length - 1].elements[0] !== null) {
		// 	// _rows.push({ elements: [null, null, null] });
		// 	margin_bottom = 2 * relative_space;
		// }
		return (
			<div
				style={{
					// ...genericSectionStyle,
					// height: "150%",
					marginTop: `${margin_top}%`,
					// paddingBottom: `calc(${relative_space}% + ${
					// 	absolute_space * l
					// }px)`,
				}}
			>
				<div style={container(relative_space, absolute_space, l)}>
					{_rows.map((row, _index) => (
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
	}
}
