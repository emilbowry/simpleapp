// src/components/hexagons/HexagonRow.tsx

import React from "react";

import { formatComponent, ValidComponent } from "../../../utils/reactUtils";
import { container, midStyle, sideStyle } from "./HexagonRow.styles";
import {
	IHexagonGridElements,
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

export const rspacing = 5;

const aspace = 90;
export class HexagonRow extends React.Component<IHexagonRowElements> {
	render() {
		const { elements, len = 1 } = this.props;

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
		return (
			<div style={container(rspacing, aspace)}>
				{rows.map((row, _index) => (
					<HexagonRow
						elements={row.elements}
						len={l}
					/>
				))}
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
