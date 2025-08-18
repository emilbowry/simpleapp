// src/components/hexagons/HexagonsRow.tsx

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

import { CutHexagon } from "./Hexagons";

export interface ITimelineRow {
	elements: readonly [ValidComponent, ValidComponent];
}
export class TimelineRow extends React.Component<ITimelineRow> {
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
		let _isLeftHanded = false;
		if (elements[0]) {
			_isLeftHanded = true;
		}
		return (
			<div style={rowstyle}>
				<div style={{ ...hexWrap, marginLeft: "200px" }}>
					{_isLeftHanded ? formatComponent(elements[0], true) : <></>}
				</div>
				<div style={hexWrap}>
					<CutHexagon args={{ isLeftHanded: _isLeftHanded }} />
				</div>
				<div style={{ ...hexWrap, marginLeft: "-200px" }}>
					{!_isLeftHanded ? (
						formatComponent(elements[1], true)
					) : (
						<></>
					)}
				</div>
			</div>
		);
	}
}
