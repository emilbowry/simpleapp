// src/pages/thejourneypage/TheJourney.tsx

import React from "react";
import { Hexagon } from "../../components/hexagons/Hexagons";
import { ImageHexagon } from "../../components/hexagons/ImageHexagon";
import { HexagonGrid } from "../../components/hexagons/hexagon-row/HexagonRow";
import { Page } from "../../features/page/Page";

import bw1 from "../../assets/bw1.jpg";
import bw2 from "../../assets/bw2.jpg";
import bw3 from "../../assets/bw3.jpg";
import { bulb, bullseye, pencil } from "../../components/callingcard/graphics";
import { generateGradient } from "../../styles";
import {
	bgwhite,
	dark_midnight_green,
	midnight_green,
} from "../../utils/defaultColours";
import { BoxedImage } from "../../utils/reactUtils";

const TimelineData = [
	{
		date: "NOV 2022",
		content:
			"ChatGPT 3.5 is released - The 'ChatGPT' moment. Prompt Engineering goes mainstream ",
		image: bw3,
	},
	{
		date: "MAR 2023",
		content: "ChatGPT 4 is released",
	},
	{
		date: "DEC 2023",
		content:
			"AI Compatible is founded and collates 2023s discoveries in prompt engineering into a methodology, to help people use AI effectively and ethically",
		icon: bulb,
	},
	{
		date: "JAN 2024",
		content:
			"AI Compatible (AIC) runs its first series of prompt engineering training workshops with live clients, using the new methodology. Initially delivered through AIC first partner, The Growth House who offer leadership and teamship corporate training",
		icon: bullseye,
	},
	{
		date: "MARCH 2024",
		content:
			"March - The EU AI act is passed - there's questions around how well suited it is to the world of generative AI, and how stifling it is. Our Founder Joe co-led the 'SafeNet' project for improving online safety and AI literacy among young people in the Balkans, founded by the UN Mission in Kosovo (UNMIK)",
	},
	{
		date: "JUL 2024",
		content:
			"NotebookLM is released, everyone loves it, go try it now if you haven't",
		image: bw1,
	},
	{
		date: "SEP 2024",
		content:
			"Open AI's release of o1 'strawberry', first of the 'reasoning model' generation of generative AI.",
	},
	{
		date: "OCT 2024",
		content:
			"O3 gets 85% accuracy on the ARC 1 benchmark - this is the going to the moon moment for Foundation models, ARC 1 was THE benchmark to beat. The AI Compatible team grows alongside our roster of partners",
	},
	{
		date: "JAN 2025",
		content:
			"January 2025, Deepseek R1 matches Open AI's o1 Benchmark performance. After a couple months of working closely with Heward Mills data protection officers and becoming an advisor and partner we add Policy assistance and consultancy to the services we offer.",
		icon: pencil,
		image: bw2,
	},
	{
		date: "APRIL 2025",
		content:
			"Open AI O3 high gets 20% on 'Humanity's Last Exam', a compilation of problems that specialised human experts find particularly hard",
	},
];

const getThirdHex = (index: number) => {
	let thirdHexagon = (
		<Hexagon
			args={{
				colour: "transparent",
			}}
		/>
	);

	let _icon =
		index < TimelineData.length - 1
			? TimelineData[index + 1].icon
			: undefined;
	let _image =
		index < TimelineData.length - 1 ? TimelineData[index].image : undefined;
	if (_icon) {
		thirdHexagon = (
			<Hexagon
				args={{
					colour: "transparent",
				}}
				opacity={1}
				element={
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							margin: "auto",
							height: "100%",
							opacity: 1,
						}}
					>
						<BoxedImage
							image={_icon}
							width="100%"
							aspectRatio="1"
							imageStyling={{ margin: "auto" }}
						/>
					</div>
				}
			/>
		);
	} else if (_image) {
		thirdHexagon = <ImageHexagon img={_image} />;
	}
	return thirdHexagon;
};

const getRows = () => {
	const colours = generateGradient(TimelineData.length).reverse();

	return TimelineData.map((item, i) => {
		const contentHex = (
			<Hexagon
				args={{ colour: bgwhite }}
				element={[
					<h3
						style={{
							fontSize: "3vw",
							height: "calc(100%)",
							textAlign: "center",

							color: dark_midnight_green,
						}}
					>
						{item.date}
					</h3>,
					<p
						style={{
							fontSize: "2.5vw",
							textAlign: "center",

							color: midnight_green,
							height: "calc(100%)",
						}}
					>
						{item.content}
					</p>,
				]}
				opacity={1}
				useVerticalAlignment={true}
			/>
		);

		const spineHex = <Hexagon args={{ colour: colours[i] }} />;
		const baseRowElements = [contentHex, spineHex, getThirdHex(i)];

		return {
			elements: i % 2 === 0 ? baseRowElements : baseRowElements.reverse(),
		};
	});
};

const theJourneyPage: React.FC = () => {
	let r = getRows();

	return (
		<div>
			<HexagonGrid
				rows={r as any}
				relative_space={10}
				absolute_space={-15}
				class_name="aos-ignore"
			/>
		</div>
	);
};

export const TheJourneyPage = (
	<Page
		page={theJourneyPage}
		bg={true}
	/>
);
