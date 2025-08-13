// src/pages/demoPage/DemoPage.tsx

import React from "react";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { CallOut } from "../../components/callingcard/CallOut";
import { demoVertibrae } from "../../components/timeline/spineComponent/Vertibrae";
import { demoEvents } from "../../components/timeline/spineComponent/Event";
import { demoTimeline } from "../../components/timeline/Timeline";
import { AiImpact } from "../homepage/AIImpactCallingCard";
import { WWD } from "../homepage/WWD";
import { AboutUs } from "../homepage/AboutUS";
import { Hero } from "../../components/hero/Hero";
import { demoSmallPB } from "../../components/partnershipbar/PartnershipBar";

export const DemoPage: React.FC = () => {
	const componentsToRenderc = [<CallOut data={demoTimeline} />];

	const ccElement = (
		<CallingCard components={componentsToRenderc} index={1} />
	);
	return (
		<section>
			<Hero />
			<CallingCard
				title={demoSmallPB}
				components={[
					<CallingCard
						title={<AiImpact />}
						components={[<WWD />]}
						footer={<AboutUs />}
						index={-1}
					/>,
				]}
				index={0}
			/>
			{ccElement}
		</section>
	);
};
