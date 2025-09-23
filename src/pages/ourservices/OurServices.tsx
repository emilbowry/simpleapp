// src/pages/ourservices/OurServices.tsx

import React from "react";
import { Page } from "../page";
import { NewCallingCard } from "../../components/callingcard/newCallingCard";
import { bgwhite } from "../../utils/defaultColours";
import { VerticalHexagonGrid } from "../../components/hexagons/hexagonRow/VHexRow";
import { hStyle } from "../homepage/parts/about-us/AboutUs";
import { VertHexagon } from "../../components/hexagons/Hexagons";
import pichart from "../../assets/pichart.svg";
import { TriPartCallout } from "../../components/callingcard/callout/CallOut";
import {
	hexCallStyle,
	imageStyling,
	titleStyle,
} from "../homepage/parts/about-us/AboutUs.styles";
import {
	bulb,
	bullseye,
	pencil,
} from "../../components/callingcard/callout/HexCallout";
import { BoxedImage, getImageEl } from "../../utils/reactUtils";

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
/**
@improvement 
- Generalise this into a more concrete FC since it is repeated 
 */
export const VHexGrid: React.FC = () => {
	return (
		<div
			style={{
				width: "100%",
				zIndex: 25,
			}}
		>
			<VerticalHexagonGrid
				elements={[
					<VertHexagon
						args={hStyle}
						element={ConsultancyCallout}
						opacity={1}
					/>,
					<VertHexagon
						args={hStyle}
						element={TrainingCallout}
						opacity={1}
					/>,
					<VertHexagon
						args={hStyle}
						element={PolicyCallOut}
						opacity={1}
					/>,
				]}
			/>
		</div>
	);
};
export class HexWrapCallOut extends TriPartCallout {
	static {
		this.styler.updateStyle("wrapperStyle_style", {
			def_static_css: {
				...hexCallStyle,

				backgroundColor: "transparent",
			},
		});
	}
}

const callout_content_consultancy = {
	header: (
		<BoxedImage
			image={bulb}
			width="30%"
			aspectRatio="1"
			imageStyling={imageStyling}
		/>
	),
	footer: <></>,
	body: <div style={titleStyle}>Our Work</div>,
};

const ConsultancyCallout = (
	<HexWrapCallOut
		{...callout_content_consultancy}
		themeId={-1}
	/>
);

const callout_content_training = {
	body: <div style={titleStyle}>Our Vision</div>,

	header: (
		<BoxedImage
			image={bullseye}
			width="30%"
			aspectRatio="1"
			imageStyling={imageStyling}
		/>
	),
};

const TrainingCallout = (
	<HexWrapCallOut
		{...callout_content_training}
		themeId={-1}
	/>
);

const callout_content_policy = {
	body: <div style={titleStyle}>Our Work</div>,

	header: (
		<BoxedImage
			image={pencil}
			width="30%"
			aspectRatio="1"
			imageStyling={imageStyling}
		/>
	),
};
const PolicyCallOut = (
	<HexWrapCallOut
		{...callout_content_policy}
		themeId={-1}
	/>
);

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
		<VHexGrid />
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
