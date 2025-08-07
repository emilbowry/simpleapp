import React from "react";

import {
	ITimelineEvent,
	EventContent,
	_EventContent,
} from "./spineComponent/Event";

const demoTimelineEvent: ITimelineEvent[] = [
	{
		date: "Early 2024",
		title: "Prompt Engineering Offering",
		description:
			"AIC introduces the FAST START Prompt engineering framework, improving the specificity, relevance and hallucination rate of LLMs in performance.",
	},
	{
		date: "Mid 2024",
		title: "Emergence of Newer Interfaces",
		description:
			"Innovative interfaces like Gamma, Napkin AI, and Sana gain traction, indicating a diversifying AI landscape and a growing demand for specialized tools.",
	},
];
export const demoTimelineEvents: React.FC = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<EventContent
				index={0}
				scaleFactor={1.5}
				reflectable={false}
				contentComponent={_EventContent}
				data={demoTimelineEvent[0]}
			/>
			<EventContent
				index={1}
				scaleFactor={1.5}
				reflectable={false}
				contentComponent={_EventContent}
				data={demoTimelineEvent[1]}
			/>
		</div>
	);
};
