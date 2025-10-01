// src/pages/ourservices/OurServices.tsx

import React from "react";
import { Page } from "../page";
import { NewCallingCard } from "../../components/callingcard/newCallingCard";
import { bgwhite } from "../../utils/defaultColours";
import {
	VerticalHexagonFeatureGrid,
	VerticalHexagonGrid,
} from "../../components/hexagons/hexagonRow/VHexRow";
import { hStyle } from "../homepage/parts/about-us/AboutUs";
import { PointedTopHexagon } from "../../components/hexagons/Hexagons";
import { TriPartCallout } from "../../components/callingcard/callout/CallOut";
import {
	hexCallStyle,
	imageStyling,
	titleStyle,
} from "../homepage/parts/about-us/AboutUs.styles";
import { bulb, bullseye, pencil } from "../../components/callingcard/graphics";
import { BoxedImage } from "../../utils/reactUtils";

const Services: React.FC<{ title: string; services: string[] }> = ({
	title,
	services,
}) => {
	return (
		<div style={{ height: "100%", textAlign: "left", margin: "0 5%" }}>
			<h3 style={{ fontSize: "3rem" }}>{title}</h3>
			<div>
				<ol>
					{services.map((service, index) => (
						<li
							key={index}
							style={{ margin: "10% 0", fontSize: "2rem" }}
						>
							{service}
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};
// const pichart = ()
const cserv = {
	title: "Our Consultancy Services:",
	services: [
		//normalised title
		"For helping you find your business’ place in the transforming world of work - Consultancy – 1-to-1 - £200/hour",
		"To make the AI Hype real for you – Tasks-to-tools – matching client tasks with real out-the-box AI tools",
		"To find the insights that your business strategy hinges on - Research Project. E.g, estimating climate impact of AI Adoption in our sector.",
		"To facilitate critical conversations – moderating debates and unconferences" /** @ask what is uncomferences */,
		"To align ethics into a codified policy – AI policy drafting and review ",
	],
};
const tserv = {
	title: "Our Training Services:",
	services: [
		"To stimulate your teams into habits of lifelong learning in AI – Practical AI Ethics Workshops ",
		"To empower your people with competence and confidence – Interactive prompt engineering workshops ",
		"To educate your people on the ‘whether’ and the ‘why’ of AI adoption – Practical AI Ethics Talk ",
		"Inspire the art of the possible through – Practical AI Talks and Live demos" /** @ask what is uncomferences */,
	],
};

const ourServicesFeatureCallouts = [
	{
		header: (
			<BoxedImage
				image={bulb}
				width="30%"
				aspectRatio="1"
				imageStyling={imageStyling}
			/>
		),
		body: <div style={titleStyle}>Our Work</div>,
		themeId: -1,
	},
	{
		body: <div style={titleStyle}>Our Vision</div>,
		header: (
			<BoxedImage
				image={bullseye}
				width="30%"
				aspectRatio="1"
				imageStyling={imageStyling}
			/>
		),
		themeId: -1,
	},
	{
		body: <div style={titleStyle}>Our Work</div>,
		header: (
			<BoxedImage
				image={pencil}
				width="30%"
				aspectRatio="1"
				imageStyling={imageStyling}
			/>
		),
		themeId: -1,
	},
];

import { PiChart } from "./pi_chart";
export const OSCC: React.FC = () => (
	<>
		<NewCallingCard
			components={[<Services {...cserv} />, <Services {...tserv} />]}
			// header={<></>}
			title={<h2>Our Services</h2>}
			footer={
				<div>
					<div style={{ marginBottom: "5%" }}>
						<span style={{ color: "red", fontWeight: "bolder" }}>
							Probably needs an introduction <br />
						</span>
						Source: BCG Build for the Future 2024 Global Study
						(merged with DAI)
					</div>
					<div>
						<PiChart />
					</div>
				</div>
			}
			styleOverrides={{
				backgroundColor: bgwhite,
				paddingBottom: "20%",
				marginBottom: "-20%",
				zIndex: -5,
			}}
		/>
		<VerticalHexagonFeatureGrid
			featureCallouts={ourServicesFeatureCallouts}
			hexagonArgs={hStyle}
			useVerticalAlignment={true}
		/>

		{/* <VHexGrid /> */}
	</>
);

export const ourServices: React.FC = () => {
	return <OSCC />;
};

export const OurServices = (
	<Page
		page={ourServices}
		bg={true}
	/>
);
