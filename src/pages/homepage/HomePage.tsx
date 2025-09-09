import React, { useEffect, useState } from "react";
import { Hero } from "./parts/Hero";
import { ImpactCallingCard } from "./impact";
import { DemoLayout } from "../DemoLayout";
import { DemoNewCC } from "../../components/callingcard/callout/newCallingCard";

const homePage: React.FC = () => {
	return (
		<DemoNewCC />
		/* 
		<section className="no-aos">
			<Hero />
			<LargePB />

			<ImpactCallingCard /> 
		</section>
		*/
	);
};
import { Page } from "../page";
import { LargePB } from "./parts/smallPartnershipBar";

export const HomePage = (
	<Page
		page={homePage}
		// bg={true}
	/>
);
