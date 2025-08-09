// src/pages/demoPage/DemoPage.tsx

import React from "react";
import styles from "./DemoPage.module.css";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { _CallOut as CallOut } from "../../components/callingcard/CallOut";
import { demoVertibrae } from "../../components/timeline/spineComponent/Vertibrae";
import { demoEvents } from "../../components/timeline/spineComponent/Event";
import globalstyles from "../../GlobalStyles.module.css";
import { demoTimeline } from "../../components/timeline/Timeline";
import backgroundPattern from "/src/assets/background.png";
import {
	demoSmallPB,
	demoLargePB,
} from "../../components/partnershipbar/PartnershipBar";

export const DemoPage: React.FC = () => {
	const componentsToRendera = [<CallOut Component={demoEvents} />];
	const componentsToRenderb = [<CallOut Component={demoVertibrae} />];
	const componentsToRenderc = [<CallOut Component={demoTimeline} />];

	const acElement = (
		<CallingCard components={componentsToRendera} index={0} />
	);
	const bcElement = (
		<CallingCard components={componentsToRenderb} index={1} />
	);
	const ccElement = (
		<CallingCard components={componentsToRenderc} index={1} />
	);
	// const smallPB = <demoSmallPB />;
	return (
		<section>
			{demoSmallPB}
			<div
				className={globalstyles.backgroundPattern}
				style={{ backgroundImage: `url(${backgroundPattern})` }}
			></div>
			{ccElement}
			<div
				className={globalstyles.backgroundPattern}
				style={{ backgroundImage: `url(${backgroundPattern})` }}
			></div>
			{demoLargePB}
		</section>
	);
};
