import React, { useEffect, useState } from "react";
import { Hero } from "./parts/Hero";
import { ImpactCallingCard } from "./impact";
import { DemoLayout } from "../DemoLayout";
import {
	AboutUsCallingCard,
	AboutUsCallingCard_alt,
} from "./parts/about-us.tsx/AboutUs";
import { LargePB } from "./parts/smallPartnershipBar";

export const homePage: React.FC = () => {
	return (
		<div
			className="aos-ignore"
			style={{ display: "grid", gridTemplateColumns: "100%" }}
		>
			<Hero />
			{/* <ComponentShowcase /> */}
			<AboutUsCallingCard />
			<AboutUsCallingCard_alt />
		</div>
	);
};

// export const HomePage = homePage;
import { Page } from "../page";
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
