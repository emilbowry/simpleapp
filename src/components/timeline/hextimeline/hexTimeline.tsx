// // src/components/timeline/hexTimeline.tsx

// import React from "react";

// import { IEvent, IVerticalHexagonRowProps } from "./hexTimeline.types";
// import { VerticalHexagonRow } from "../../hexagons/hexagonRow/HexagonRow";
// import { TriPartCallout } from "../../callingcard/callout/CallOut";
// export const _EventContent: React.FC<IEvent> = ({
// 	date,
// 	description,
// 	image,
// }) => {
// 	return (
// 		<TriPartCallout
// 			header={date}
// 			body={description}
// 		/>
// 	);
// };
// export class VerticalHexagonGrid extends React.Component<IVerticalHexagonRowProps> {
// 	render() {
// 		const { elements, size = 500, gap = 10 } = this.props;

// 		const verticalOffset = 0.25 * size + gap;

// 		return (
// 			<div style={{ paddingBottom: verticalOffset }}>
// 				{elements.map((el, i) => (
// 					<div
// 						key={i}
// 						style={{
// 							paddingTop: verticalOffset,
// 						}}
// 					>
// 						<VerticalHexagonRow
// 							index={i}
// 							element={el}
// 							size={size}
// 							gap={gap}
// 						/>
// 					</div>
// 				))}
// 			</div>
// 		);
// 	}
// }
