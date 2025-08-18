// src/components/hexagons/HexagonsRow.tsx

// import _logo from "../../assets/logo.svg";
import React from "react";

import { formatComponent, ValidComponent } from "../../utils/reactUtils";

export interface IHexagonRowElements {
	elements: readonly [ValidComponent, ValidComponent, ValidComponent];
}
export class HexagonRow extends React.Component<IHexagonRowElements> {
	render() {
		const spacing = -20;
		const { elements } = this.props;
		const rowstyle: React.CSSProperties = {
			display: "grid",
			gridTemplateColumns: `${500 + spacing}px ${500 + spacing}px ${
				500 + spacing
			}px`,
			gridTemplateRows: `${500 + spacing}px`,
			justifyContent: "center",

			overflow: "visible",
			alignItems: "center",
		};

		const hexWrap: React.CSSProperties = {
			display: "flex",
			justifyContent: "center",
			overflow: "visible",
			alignItems: "center",
			width: "500px",
			height: "500px",
		};

		const hexWrap_middle: React.CSSProperties = {
			...hexWrap,
			marginTop: "-550px",
		};

		return (
			<div style={rowstyle}>
				<div style={hexWrap}>{formatComponent(elements[0], true)}</div>
				<div style={hexWrap_middle}>
					{formatComponent(elements[1], true)}
				</div>
				<div style={hexWrap}>{formatComponent(elements[2], true)}</div>
			</div>
		);
	}
}
