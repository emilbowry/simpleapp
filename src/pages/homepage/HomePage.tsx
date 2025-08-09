// src/App.tsx
import React from "react";
import { Hero } from "../../components/hero/Hero";
// import {DemoTimeline} from '../../components/timeline/Timeline';
import { AccordionSection } from "../../components/accordion/Accordion";
import globalstyles from "../../GlobalStyles.module.css";

import backgroundPattern from "/src/assets/background.png";

import { DemoPage } from "../demopage/DemoPage";

export const HomePage: React.FC = () => {
	return (
		<section>
			<Hero />
			<div
				className={globalstyles.backgroundPattern}
				style={{ backgroundImage: `url(${backgroundPattern})` }}
			></div>
			<div className="no-aos">
				<AccordionSection />
			</div>
			{/* <AccordionSection /> */}

			<div
				className={globalstyles.backgroundPattern}
				style={{ backgroundImage: `url(${backgroundPattern})` }}
			></div>
			<DemoPage />

			<div
				className={globalstyles.backgroundPattern}
				style={{ backgroundImage: `url(${backgroundPattern})` }}
			></div>
			<AccordionSection />
		</section>
	);
};
