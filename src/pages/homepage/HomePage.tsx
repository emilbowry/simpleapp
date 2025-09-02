import React, { useEffect, useState } from "react";
import { Hero } from "./parts/Hero";
import { ImpactCallingCard } from "./impact";
const homePage: React.FC = () => {
	return (
		<section className="no-aos">
			<Hero />
			{/* <ImpactCallingCard /> */}
		</section>
	);
};

import { Page } from "../page";

export const HomePage = (
	<Page
		page={homePage}
		bg={true}
	/>
);
