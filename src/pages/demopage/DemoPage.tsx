// src/pages/demoPage/DemoPage.tsx
import React from "react";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { CallOut } from "../../components/callingcard/callout/CallOut";
import { VerticalHexagonGrid } from "../../components/timeline/hexTimeline";
import { BackgroundStyle } from "../../styles";
import { IEvent } from "../../components/timeline/spineComponent/Event";
import {
	// DynamicImage_BackgroundStyle,
	// TiledImage_BackgroundStyle,
	DemoTiledBackground,
} from "../../components/background/Background";
import { DemoHexTimeline } from "./demoParts";

export const DemoPage: React.FC = () => {
	return (
		<div>
			{/* <DemoTiledBackground /> */}
			<CallingCard
				components={[<CallOut body={<DemoHexTimeline />} />]}
				index={-1}
			/>
		</div>
	);
};
