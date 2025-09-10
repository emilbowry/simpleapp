import React, { useEffect, useState } from "react";
import { Hero } from "./parts/Hero";
import { ImpactCallingCard } from "./impact";
import { DemoLayout } from "../DemoLayout";
import { DemoNewCC } from "./parts/AboutUs";
import { LargePB } from "./parts/smallPartnershipBar";

export const homePage: React.FC = () => {
	return (
		<section className="aos-ignore">
			<Hero />

			<DemoNewCC />

			{/* <LargePB />
			<DemoNewCC /> */}
		</section>
	);
};

// export const HomePage = homePage;
import { Page } from "../page";

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
