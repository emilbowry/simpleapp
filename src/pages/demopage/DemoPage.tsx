// src/pages/demoPage/DemoPage.tsx
import React from "react";
import { Page } from "../page";

const TimelineData = [
	{
		date: "NOV 2022",
		content:
			"ChatGPT 3.5 is released - The 'ChatGPT' moment. Prompt Engineering goes mainstream",
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
	<div>
		<div>
			<h2>{date}</h2>
		</div>
		<div style={{ textAlign: "center" }}>{content}</div>
	</div>
);
const getRows = () => {
	let rows = [];
	const len = TimelineData.length;
	for (let i = 0; i < len; i++) {
		if (i % 2 == 0) {
			rows.push({
				elements: [
					<Hexagon
						element={getEl(
							TimelineData[i].date,
							TimelineData[i].content
						)}
					/>,
					<Hexagon />,
					<Hexagon />,
				] as const,
			});
		} else {
			rows.push({
				elements: [
					<Hexagon />,
					<Hexagon />,
					<Hexagon
						element={getEl(
							TimelineData[i].date,
							TimelineData[i].content
						)}
					/>,
				] as const,
			});
		}
	}
	return rows;
};

import { Hexagon } from "../../components/hexagons/Hexagons";
import { HexagonGrid } from "../../components/hexagons/hexagonRow/HexagonRow";
const demoPage: React.FC = () => {
	const r = getRows();
	return (
		<div
			style={{
				height: "100%",
				margin: "auto 10%",
				marginTop: `calc(10%)`,
				// paddingTop: "10%",
			}}
		>
			<HexagonGrid rows={r} />
		</div>
	);
};

export const DemoPage = (
	<Page
		page={demoPage}
		bg={true}
	/>
);
