// src/App.tsx
import React from "react";
import { Hero } from "../../components/hero/Hero";
import { AccordionSection } from "../../components/accordion/Accordion";
import globalstyles from "../../GlobalStyles.module.css";
import { DemoPage } from "../demopage/DemoPage";
import { Background } from "../../components/background/Background";
import { BackgroundStyle } from "../../styles";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { CallOut } from "../../components/callingcard/CallOut";
import { demoEvents as DemoEvents } from "../../components/timeline/spineComponent/Event";
import { impactCC as ICC, WWD, AboutUs } from "./AIImpactCallingCard";
import {
	demoTimeline,
	_demoTimeline as DT,
} from "../../components/timeline/Timeline";
import { demoSmallPB } from "../../components/partnershipbar/PartnershipBar";
export const HomePage: React.FC = () => {
	return (
		<div style={BackgroundStyle}>
			<Hero />

			<CallingCard
				title={demoSmallPB}
				components={[
					<CallingCard
						title={<ICC />}
						components={[<WWD />]}
						footer={<AboutUs />}
						index={-1}
					/>,
				]}
				index={0}
			/>
		</div>
	);
};
