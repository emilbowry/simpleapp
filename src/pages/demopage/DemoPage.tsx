// src/pages/demoPage/DemoPage.tsx

import React from "react";
import styles from "./DemoPage.module.css";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { CallOut } from "../../components/callingcard/CallOut";
import { demoVertibrae } from "../../components/timeline/spineComponent/Vertibrae";
import { demoEvents } from "../../components/timeline/spineComponent/Event";
import globalstyles from "../../GlobalStyles.module.css";
import { demoTimeline } from "../../components/timeline/Timeline";
import backgroundPattern from "/src/assets/background.png";
export const DemoPage: React.FC = () => {
	const componentsToRendera = [<CallOut Component={demoEvents} />];
	const componentsToRenderb = [<CallOut Component={demoVertibrae} />];
	const componentsToRenderc = [<CallOut Component={demoTimeline} />];

	const acElement = (
		<CallingCard components={componentsToRendera} index={0} />
	);
	``;
	const bcElement = (
		<CallingCard components={componentsToRenderb} index={1} />
	);
	const ccElement = (
		<CallingCard components={componentsToRenderc} index={1} />
	);

	return (
		<section>
			{/* {acElement}
			<div
				className={globalstyles.backgroundPattern}
				style={{ backgroundImage: `url(${backgroundPattern})` }}
			></div>
			{bcElement} */}

			<div
				className={globalstyles.backgroundPattern}
				style={{ backgroundImage: `url(${backgroundPattern})` }}
			></div>
			{ccElement}
		</section>
	);
};
