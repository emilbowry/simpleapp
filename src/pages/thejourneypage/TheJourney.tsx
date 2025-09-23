import React from "react";
import { BackgroundStyle, genericSectionStyle } from "../../styles";

import { Page } from "../page";
import { Hexagon, ImageHexagon } from "../../components/hexagons/Hexagons";
import { HexagonGrid } from "../../components/hexagons/hexagonRow/HexagonRow";

import {
	bgwhite,
	dark_midnight_green,
	logo_blue,
	logo_yellow,
	midnight_green,
} from "../../utils/defaultColours";
import { BoxedImage } from "../../utils/reactUtils";
import {
	bulb,
	bullseye,
	pencil,
} from "../../components/callingcard/callout/HexCallout";
import { imageStyling } from "../homepage/parts/about-us/AboutUs.styles";
const generateGradient = (
	n: number,

	s: string = logo_yellow,
	e: string = logo_blue
): string[] =>
	Array.from(
		{ length: n },
		(_, i) =>
			"#" +
			(
				(1 << 24) |
				[1, 3, 5]
					.map((k) =>
						Math.round(
							parseInt(e.slice(k, k + 2), 16) * (i / (n - 1)) +
								parseInt(s.slice(k, k + 2), 16) *
									(1 - i / (n - 1))
						)
					)
					.reduce((acc, v) => (acc << 8) | v, 0)
			)
				.toString(16)
				.slice(1)
	);

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
/**
@hack
- NO-OP div ensures svg's lineheight calculation correct so remains geometrically precise
 */
const getEl = (date: string, content: string) => (
	<div
		style={{
			position: "relative",
			height: "100%",
			margin: "auto",
			padding: "auto",
			verticalAlign: "text-bottom",
		}}
	>
		<div style={{ fontSize: 0 }}>no-op</div>
		<div
			style={{
				height: "calc(100%)",

				margin: "auto",
				padding: "auto",

				display: "block",

				color: "black",
				fontSize: "2rem",
				textAlign: "center",
			}}
		>
			<div
				style={{
					position: "relative",

					height: "100%",

					paddingTop: "10%",
					paddingBottom: "10%",
				}}
			>
				<h3
					style={{
						fontSize: "3vw",

						color: dark_midnight_green,
					}}
				>
					{date}
				</h3>
				<p
					style={{
						fontSize: "2.5vw",
						color: midnight_green,
					}}
				>
					{content}
				</p>
			</div>
		</div>
	</div>
);
const getRows = () => {
	let rows = [];
	const len = TimelineData.length;
	let colours = generateGradient(len * 2);
	colours = colours.reverse();

	for (let i = 0; i < len; i++) {
		let thirdHexagon = (
			<Hexagon
				args={{
					colour: "transparent",
				}}
			/>
		);

		let _icon = i < len - 1 ? TimelineData[i + 1].icon : undefined;
		let _image = i < len - 1 ? TimelineData[i].image : undefined;
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
			thirdHexagon = <ImageHexagon args={{ img: _image }} />;
		}
		if (i % 2 == 0) {
			rows.push({
				elements: [
					<Hexagon
						args={{ colour: bgwhite }}
						element={getEl(
							TimelineData[i].date,
							TimelineData[i].content
						)}
						opacity={1}
					/>,
					<Hexagon args={{ colour: colours[2 * i + 1] }} />,
					thirdHexagon,
				] as const,
			});
		} else {
			rows.push({
				elements: [
					thirdHexagon,
					<Hexagon args={{ colour: colours[2 * i] }} />,
					<Hexagon
						args={{ colour: bgwhite }}
						element={getEl(
							TimelineData[i].date,
							TimelineData[i].content
						)}
						opacity={1}
					/>,
				] as const,
			});
		}
	}

	return rows;
};
import bw1 from "../../assets/bw1.jpg";
import bw2 from "../../assets/bw2.jpg";

import bw3 from "../../assets/bw3.jpg";

export const theJourneyPage: React.FC = () => {
	let r = getRows();

	return (
		<div
			style={{
				height: "100%",
			}}
		>
			<HexagonGrid
				rows={r}
				relative_space={15}
				absolute_space={-30}
				containerStyle={{
					backdropFilter: "blur(8px)",
				}}
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
