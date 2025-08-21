// src/App.tsx
import React, { useEffect, useState } from "react";
import { Hero } from "./parts/Hero";
import { BackgroundStyle } from "../../styles";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { AiImpact } from "./parts/AIImpactCallingCard";
import { WWD } from "./parts/WWD";
import { AboutUs } from "./parts/AboutUS";

import { demoSmallPB as DPB } from "./parts/smallPartnershipBar";
import { Persona } from "./parts/OurTeam";
import { FounderLetter, FFoouter } from "./parts/FounderLetter";
import joefennelhs from "../../assets/joeheadshot.png";
import miranda from "../../assets/miranda.jpg";
import omar from "../../assets/dude3.jpg";
import ben from "../../assets/dude2.jpg";
import will from "../../assets/dude1.jpg";

import { CallOut } from "../../components/callingcard/callout/CallOut";
import { DemoHexTimeline } from "../demopage/demoParts";
import { DemoTiledBackground } from "../../components/background/Background";
import backgroundPattern from "../../assets/bavkground.png";

export const HomePage: React.FC = () => {
	// const bgStyle = useTiledBackgroundStyle();
	let MainIdx = 1;
	const _BackgroundStyle: React.CSSProperties = {
		backgroundImage: `url(${backgroundPattern})`,
		backgroundRepeat: "repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundAttachment: "fixed",
		width: "100vw",
		height: "100vh",
		position: "fixed",
		zIndex: -1,
		inset: 0,
		backgroundColor: "#f0f0f0",
		paddingBottom: "100px",
	};
	return (
		<div>
			{/* <div style={_BackgroundStyle} /> */}
			<DemoTiledBackground />
			{/* <div style={{ ...bgStyle, position: "absolute", inset: 0 }} /> */}
			<Hero />
			<CallingCard
				components={[<CallOut body={<DemoHexTimeline />} />]}
				index={-1}
			/>
			<CallingCard
				components={[
					<Persona
						index={0}
						image={joefennelhs}
						name="Joe Fennel"
						title="Founder"
						email="joe@aicompatible.co.uk"
						body="Since 2019, Joe has been grappling with the question of 
how to adjust to a world being transformed by AI. He
spent 4 years tackling this question at the University of
Cambridge, and the last 2 years tackling it with some of
the world’s biggest businesses, including Astra Zeneca,
Vodafone, Accenture Song and more."
					/>,
				]}
				index={-1}
			/>
			<CallingCard
				components={[
					<Persona
						index={0}
						image={miranda}
						name="Miranda Read"
						title=" COO & Business Development Lead"
						email="miranda@aicompatible.co.uk"
						body="Miranda has 4 years of experience client-facing roles in
Cybersecurity and Tech. Wearing multiple hats under
the umbrella of Business Development, she has been
instrumental in AI Compatibles product development,
marketing strategy, operations and growth vision."
					/>,
				]}
				index={-1}
			/>

			<CallingCard
				components={[
					<Persona
						index={1}
						image={omar}
						name="Omer Bilgin"
						body="Omer is an AI ethics, policy, and governance researcher.
His unique expertise is grounded in both his academic
training in Practical Ethics at the University of Oxford,
and his professional roles as Co-founder and Chief
Ethics & Research Officer at an AI startup called
deliberAIde and as a Technology & Data Ethics Advisor
for Suffrago. "
					/>,
				]}
				index={-1}
			/>

			<CallingCard
				components={[
					<Persona
						index={1}
						image={ben}
						name="Benjamin Raho "
						body="Benjamin is an economics graduate and EPM sales
specialist, helping UK mid-market businesses optimize
financial planning and analytics through Oracle
NetSuite’s AI-powered tools. Bridging enterprise
software and applied AI, Benjamin brings a practical,
forward-thinking approach."
					/>,
				]}
				index={-1}
			/>

			<CallingCard
				components={[
					<Persona
						index={1}
						image={will}
						name="William Swain "
						body="Will has 10 years of experience as a Data and Reporting
Analyst for Nintendo, PwC and Everfox. His expertise is
in automation so founded Surrey Data Solutions (SDS),
a specialist consultancy delivering practical, high-
impact solutions in business intelligence, data
analytics, process automation, and robotic process
automation (RPA).  "
					/>,
				]}
				index={-1}
			/>
			<CallingCard
				title={<DPB index={MainIdx} />}
				components={[
					<CallingCard
						title={<AiImpact index={MainIdx} />}
						components={[<WWD index={MainIdx} />]}
						footer={<AboutUs index={MainIdx} />}
						index={MainIdx}
					/>,
				]}
				index={MainIdx}
			/>

			<CallingCard
				title="A letter from our Founder"
				components={[FounderLetter]}
				footer={FFoouter}
				index={0}
			/>
		</div>
	);
};
