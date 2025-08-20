// src/pages/thejourneypage/TheJourney.tsx

import React from "react";
import { DemoNewTL } from "../../components/timeline/newTimeline";
// import { demoTimeline as DT } from "../../components/timeline/Timeline";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { CallOut } from "../../components/callingcard/callout/CallOut";
import { BackgroundStyle } from "../../styles";
import { demoSmallPB as DPB } from "../homepage/parts/smallPartnershipBar";

export const TheJourneyPage: React.FC = () => {
	const componentsToRenderc = [<CallOut body={<DPB index={-1} />} />];

	const ccElement = (
		<CallingCard
			components={componentsToRenderc}
			index={1}
		/>
	);
	return (
		<div style={BackgroundStyle}>
			<div></div>
			<CallingCard
				components={componentsToRenderc}
				// fullSpread={true}
				index={-1}
			/>
			{/* <CallingCard components={[<CallOut data={<DT />} />]} /> */}
			<CallingCard
				components={[<CallOut body={<DemoNewTL />} />]}
				index={1}
			/>
		</div>
	);
};
