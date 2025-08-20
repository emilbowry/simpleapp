// src/pages/demoPage/DemoPage.tsx
import React from "react";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { CallOut } from "../../components/callingcard/callout/CallOut";
// import { demoTimeline as DT } from "../../components/timeline/Timeline";
import { DemoHexTimeline } from "../../components/timeline/newTimeline";
import { DemoNewTL } from "../../components/timeline/newTimeline";
import { BackgroundStyle } from "../../styles";

export const DemoPage: React.FC = () => {
	const componentsToRenderc = [<CallOut body={DemoHexTimeline} />];

	const ccElement = (
		<CallingCard
			components={componentsToRenderc}
			index={-1}
		/>
	);
	return (
		<div style={BackgroundStyle}>
			<CallingCard
				components={[<CallOut body={<DemoHexTimeline />} />]}
				index={-1}
			/>
			{/* <CallingCard
				components={[<CallOut body={<DemoNewTL />} />]}
				index={1}
			/> */}
		</div>
	);
};
