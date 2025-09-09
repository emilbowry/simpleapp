// src/components/hexagons/hexagonRow/HexagonRow.tsx

import React from "react";
import { formatComponent, ValidComponent } from "../../../utils/reactUtils";
import {
	container,
	midStyle,
	sideStyle,
	vertContainer,
	vertHexStyle,
} from "./HexagonRow.styles";
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
import { rspacing, aspace } from "./HexagonRow.consts";

export class HexagonRow extends React.Component<IHexagonRowElements> {
	render() {
		const { elements, len = 1 } = this.props;
		const r = 2 / Math.sqrt(3);
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
			<div style={container(rspacing, aspace, l)}>
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

		const centerX = containerWidth / 2 - size / 2;

		return (
			<div style={vertContainer(containerWidth, containerHeight)}>
				<div
					style={{
						...vertHexStyle(centerX, 0),
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
						...vertHexStyle(
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
						...vertHexStyle(
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
