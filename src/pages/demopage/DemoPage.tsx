// src/pages/demoPage/DemoPage.tsx
import React from "react";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { CallOut } from "../../components/callingcard/CallOut";
import { demoTimeline } from "../../components/timeline/Timeline";
import { AiImpact } from "../homepage/parts/AIImpactCallingCard";
import { WWD } from "../homepage/parts/WWD";
import { AboutUs } from "../homepage/parts/AboutUS";
import { Hero } from "../../components/hero/Hero";
import { demoSmallPB } from "../homepage/parts/smallPartnershipBar";

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
						title={<AiImpact index={3} />}
						components={[<WWD index={0} />]}
						footer={<AboutUs index={0} />}
						index={1}
					/>,
				]}
				index={0}
			/>
			{ccElement}
		</section>
	);
};
