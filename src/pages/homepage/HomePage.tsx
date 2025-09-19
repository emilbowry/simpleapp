import React from "react";
import { Page } from "../page";
import { AboutUsCallingCard } from "./parts/about-us/AboutUs";
import { Hero } from "./parts/hero/Hero";
import { ImpactCC } from "./parts/impact/impact";
import { OurTeam } from "./parts/OurTeam";

export const homePage: React.FC = () => {
	return (
		<div style={{ display: "grid", gridTemplateColumns: "100%" }}>
			<Hero />
			<OurTeam />
			<AboutUsCallingCard />
			<ImpactCC />
		</div>
	);
};

export const HomePage = (
	<Page
		page={homePage}
		bg={true}
	/>
);
