// src/App.tsx
import React from "react";
import { Hero } from "../../components/hero/Hero";
import globalstyles from "../../GlobalStyles.module.css";
import { BackgroundStyle } from "../../styles";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { AiImpact } from "./AIImpactCallingCard";
import { WWD } from "./WWD";
import { AboutUs } from "./AboutUS";

import { demoSmallPB } from "../../components/partnershipbar/PartnershipBar";
export const HomePage: React.FC = () => {
	return (
		<div style={BackgroundStyle}>
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
		</div>
	);
};
