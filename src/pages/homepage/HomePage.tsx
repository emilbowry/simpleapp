import React, { useEffect, useState } from "react";
import { Hero } from "./parts/Hero";
import { ImpactCallingCard } from "./impact";
const homePage: React.FC = () => {
	return (
		<section className="no-aos">
			<LargePB />
			<Hero />
			{/* <ImpactCallingCard /> */}
		</section>
	);
};

import { Page } from "../page";
import { LargePB } from "./parts/smallPartnershipBar";

export const HomePage = (
	<Page
		page={homePage}
		bg={true}
	/>
);
