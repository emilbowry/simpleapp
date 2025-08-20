// src/components/hexagons/HexagonRow.tsx

import React from "react";

import { formatComponent, ValidComponent } from "../../../utils/reactUtils";
import { rowstyle, hexWrap, hexWrap_middle } from "./HexagonRow.styles";
import {
	IHexagonRowElements,
	IVerticalHexagonRowProps,
} from "./HexagonRow.types";

import { VertHexagon } from "../Hexagons";
import {
	b_green,
	midnight_green,
	purple,
	grey,
	l_midnight_green,
} from "../../../utils/defaultColours";

export class HexagonRow extends React.Component<IHexagonRowElements> {
	render() {
		const spacing = -20;
		const { elements } = this.props;

		return (
			<div style={rowstyle(spacing)}>
				<div style={hexWrap}>{formatComponent(elements[0], true)}</div>
				<div style={hexWrap_middle}>
					{formatComponent(elements[1], true)}
				</div>
				<div style={hexWrap}>{formatComponent(elements[2], true)}</div>
			</div>
		);
	}
}

export class VerticalHexagonRow extends React.Component<IVerticalHexagonRowProps> {
	render() {
		const { index, element, size = 500, gap = 0 } = this.props;

		const r = size / 2;

		const hexWidth = (Math.sqrt(3) / 2) * size;

		const verticalOffset = 1.5 * r + gap;
		const horizontalOffset = hexWidth + gap;

		const containerWidth = hexWidth * 2 + size;
		const containerHeight = verticalOffset + r;

		const isLeft = index % 2 === 0;

		const palette = [
			b_green,
			midnight_green,
			purple,
			grey,
			l_midnight_green,
		];
		const colour = palette[index % palette.length];

		const container: React.CSSProperties = {
			position: "relative",
			width: containerWidth,
			height: containerHeight,
			margin: "0 auto",
		};

		const hexStyle = (x: number, y: number): React.CSSProperties => ({
			position: "absolute",
			left: x,
			top: y,
		});

		const centerX = containerWidth / 2 - size / 2;

		return (
			<div style={container}>
				<div
					style={{
						...hexStyle(centerX, 0),
						filter: "brightness(150%)",
					}}
				>
					<VertHexagon
						size={size}
						args={{ colour }}
						opacity={0.5}
					/>
				</div>

				<div
					style={{
						...hexStyle(
							centerX - horizontalOffset / 2,
							verticalOffset
						),
					}}
				>
					<VertHexagon
						size={size}
						args={{ colour }}
						opacity={0.8}
						element={isLeft ? element : null}
					/>
				</div>

				<div
					style={{
						...hexStyle(
							centerX + horizontalOffset / 2,
							verticalOffset
						),
					}}
				>
					<VertHexagon
						size={size}
						opacity={0.8}
						args={{ colour }}
						element={!isLeft ? element : null}
					/>
				</div>
			</div>
		);
	}
}
