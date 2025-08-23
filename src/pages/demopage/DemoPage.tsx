// src/pages/demoPage/DemoPage.tsx
import React from "react";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { CallOut } from "../../components/callingcard/callout/CallOut";

import { DemoHexTimeline } from "./demoParts";

const demoPage: React.FC = () => {
	return (
		<div>
			<CallingCard
				components={[<CallOut body={<DemoHexTimeline />} />]}
				index={-1}
			/>
		</div>
	);
};

import { Page } from "../page";

export const DemoPage = (
	<Page
		page={demoPage}
		bg={true}
	/>
);
