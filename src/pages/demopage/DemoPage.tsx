// src/pages/demoPage/DemoPage.tsx
import React from "react";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { CallOut } from "../../components/callingcard/CallOut";
import { demoTimeline as DT } from "../../components/timeline/Timeline";

import { DemoNewTL } from "../../components/timeline/newTimeline";

export const DemoPage: React.FC = () => {
	const componentsToRenderc = [<CallOut data={DT} />];

	const ccElement = (
		<CallingCard components={componentsToRenderc} index={1} />
	);
	return (
		<section>
			<CallingCard components={[<CallOut data={<DT />} />]} />
			<CallingCard
				components={[<CallOut data={<DemoNewTL />} />]}
				index={1}
			/>
		</section>
	);
};
