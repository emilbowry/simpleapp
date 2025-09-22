// src/pages/thejourneypage/TheJourney.tsx

import React from "react";
import { BackgroundStyle, genericSectionStyle } from "../../styles";

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
	},
	{
		date: "MAR 2023",
		content: "ChatGPT 4 is released",
	},
	{
		date: "DEC 2023",
		content:
			"AI Compatible is founded and collates 2023s discoveries in prompt engineering into a methodology, to help people use AI effectively and ethically",
	},
	{
		date: "JAN 2024",
		content:
			"AI Compatible (AIC) runs its first series of prompt engineering training workshops with live clients, using the new methodology. Initially delivered through AIC first partner, The Growth House who offer leadership and teamship corporate training",
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
	},
	{
		date: "APRIL 2025",
		content:
			"Open AI O3 high gets 20% on 'Humanity's Last Exam', a compilation of problems that specialised human experts find particularly hard",
	},
];

const getEl = (date: string, content: string) => (
	<div
		style={{
			// ...genericSectionStyle,

			height: "100%",
		}}
	>
		<div style={{ fontSize: 0 }}>
			WHY THE HELL DO I NEED THIS TO EXIST AT 0 FONT SIZE FOR IT TO WORK
		</div>
		<div
			style={{
				color: "black",
				fontSize: "2rem",
				textAlign: "center",
			}}
		>
			<h3 style={{ color: dark_midnight_green }}>{date}</h3>
			<p style={{ color: midnight_green }}>{content}</p>
		</div>
	</div>
);
const getRows = () => {
	let rows = [];
	const len = TimelineData.length;
	let colours = generateGradient(len * 2);
	colours = colours.reverse();

	let _colours = generateGradient(len);
	// _colours = _colours.reverse();

	for (let i = 0; i < len; i++) {
		if (i % 2 == 0) {
			rows.push({
				elements: [
					<Hexagon
						args={{ colour: bgwhite }}
						element={getEl(
							TimelineData[i].date,
							TimelineData[i].content
						)}
					/>,
					<Hexagon args={{ colour: _colours[len - 1 - i] }} />,
					<Hexagon args={{ colour: bgwhite }} />,
				] as const,
			});
		} else {
			rows.push({
				elements: [
					<Hexagon args={{ colour: bgwhite }} />,
					<Hexagon args={{ colour: _colours[len - 1 - i] }} />,
					<Hexagon
						args={{ colour: bgwhite }}
						element={getEl(
							TimelineData[i].date,
							TimelineData[i].content
						)}
					/>,
				] as const,
			});
		}
	}

	// for (let i = 0; i < len; i++) {
	// 	if (i % 2 == 0) {
	// 		rows.push({
	// 			elements: [
	// 				<Hexagon
	// 					args={{ colour: colours[2 * i + 1] }}
	// 					element={getEl(
	// 						TimelineData[i].date,
	// 						TimelineData[i].content
	// 					)}
	// 				/>,
	// 				<Hexagon args={{ colour: colours[2 * i] }} />,
	// 				<Hexagon args={{ colour: colours[2 * i + 1] }} />,
	// 			] as const,
	// 		});
	// 	} else {
	// 		rows.push({
	// 			elements: [
	// 				<Hexagon args={{ colour: colours[2 * i + 1] }} />,
	// 				<Hexagon args={{ colour: colours[2 * i] }} />,
	// 				<Hexagon
	// 					args={{ colour: colours[2 * i + 1] }}
	// 					element={getEl(
	// 						TimelineData[i].date,
	// 						TimelineData[i].content
	// 					)}
	// 				/>,
	// 			] as const,
	// 		});
	// 	}
	// }
	return rows;
};
export const theJourneyPage: React.FC = () => {
	const r = getRows();
	return (
		<div
			style={{
				height: "100%",
			}}
		>
			<HexagonGrid
				rows={r}
				relative_space={0}
				absolute_space={20}
			/>
		</div>
	);
};

import { Page } from "../page";
import { Hexagon } from "../../components/hexagons/Hexagons";
import { HexagonGrid } from "../../components/hexagons/hexagonRow/HexagonRow";
import {
	bgwhite,
	dark_midnight_green,
	dark_mix_green,
	logo_blue,
	logo_yellow,
	midnight_green,
} from "../../utils/defaultColours";

export const TheJourneyPage = (
	<Page
		page={theJourneyPage}
		bg={true}
	/>
);
