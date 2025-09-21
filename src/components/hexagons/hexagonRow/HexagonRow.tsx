// src/components/hexagons/hexagonRow/HexagonRow.tsx

import React from "react";
import { formatComponent } from "../../../utils/reactUtils";
import { container, midStyle, sideStyle } from "./HexagonRow.styles";
import { IHexagonGridElements, IHexagonRowElements } from "./HexagonRow.types";

import { rspacing, aspace } from "./HexagonRow.consts";

export class HexagonRow extends React.Component<IHexagonRowElements> {
	render() {
		const { elements } = this.props;
		return (
			<>
				<div style={sideStyle(rspacing, aspace, true)}>
					{formatComponent(elements[0], true)}
				</div>
				<div style={midStyle(rspacing, aspace)}>
					{formatComponent(elements[1], true)}
				</div>
				<div style={sideStyle(rspacing, aspace, false)}>
					{formatComponent(elements[2], true)}
				</div>
			</>
		);
	}
}
export class HexagonGrid extends React.Component<IHexagonGridElements> {
	render() {
		const { rows } = this.props;
		const l = rows.length;
		let margin_top = 0;
		/*
			To appropriately adjust the "height", so we have no phantom whitespace due to non-existant top middle element
			- may expand later to auto adjust based on bottom layout
		*/
		if (rows[0].elements[1] === null) {
			margin_top = -(0.5 * 100) / l;
		}
		return (
			<div style={{ marginTop: `${margin_top}%` }}>
				<div style={container(rspacing, aspace, l)}>
					{rows.map((row, _index) => (
						<HexagonRow
							key={_index}
							elements={row.elements}
							len={l}
						/>
					))}
				</div>
			</div>
		);
	}
}
