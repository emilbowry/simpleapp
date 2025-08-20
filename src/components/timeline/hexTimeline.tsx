// src/components/timeline/hexTimeline.tsx

import React from "react";
import { _EventContent, IEvent } from "./spineComponent/Event";

import { IVerticalHexagonRowProps } from "./hexTimeline.types";
import { VerticalHexagonRow } from "../hexagons/hexagonRow/HexagonRow";

export class VerticalHexagonGrid extends React.Component<IVerticalHexagonRowProps> {
	render() {
		const { elements, size = 500, gap = 10 } = this.props;

		const verticalOffset = 0.25 * size + gap;

		return (
			<div style={{ paddingBottom: verticalOffset }}>
				{elements.map((el, i) => (
					<div
						key={i}
						style={{
							paddingTop: verticalOffset,
						}}
					>
						<VerticalHexagonRow
							index={i}
							element={el}
							size={size}
							gap={gap}
						/>
					</div>
				))}
			</div>
		);
	}
}
