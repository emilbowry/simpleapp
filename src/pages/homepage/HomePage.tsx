import React, { useEffect, useState } from "react";
import { Hero } from "./parts/Hero";
// import { ImpactCallingCard } from "./parts/impact";
import { DemoLayout } from "../DemoLayout";
import { ImpactCC } from "./parts/impact/impact";
import { AboutUsCallingCard, VHexGrid } from "./parts/about-us/AboutUs";
import { LargePB } from "./parts/Partners";

export const homePage: React.FC = () => {
	return (
		<div
			// className="aos-ignore"
			// style={{}}
			style={{ display: "grid", gridTemplateColumns: "100%" }}
		>
			<Hero />
			<OurTeam />
			<AboutUsCallingCard />
			<ImpactCC />
		</div>
	);
};

// export const HomePage = homePage;
import { Page } from "../page";
import { DemoPersona, OurTeam } from "./parts/OurTeam";
import { VerticalHexGridDemo } from "../../components/hexagons/hexagonRow/VHexRow";
// import { ComponentShowcase } from "../../styles2_copy";

export const HomePage = (
	<Page
		page={homePage}
		bg={true}
	/>
);

// export const HomePage = (
// 	<>

// 		{homePage}

// 	</>
// );
