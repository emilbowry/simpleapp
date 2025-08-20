// src/pages/demopage/demoParts.tsx

import React from "react";
import { IEvent } from "../../components/timeline/spineComponent/Event";
import { VerticalHexagonGrid } from "../../components/timeline/hexTimeline";

export const DemoEvents: IEvent[] = [
	{ date: "Early 2024", description: "AIC introduces FAST START..." },
	{ date: "Mid 2024", description: "Innovative interfaces..." },
	{ date: "Late 2024", description: "AIC launches 'tasks to tools'..." },
	{ date: "Early 2025", description: "Joe hosts Mindstone events..." },
	{ date: "Mid 2025", description: "AI-compatible transfers policy..." },
];

// const elements = events.map((item, i) => (
// 	<div
// 		key={i}
// 		style={{ textAlign: "center" }}
// 	>
// 		<h3 style={{ margin: 0 }}>{item.date}</h3>
// 		<p style={{ marginTop: 8 }}>{item.description}</p>
// 	</div>
// ));

export const DemoEventElements = DemoEvents.map((item, i) => (
	<div
		key={i}
		style={{ textAlign: "center" }}
	>
		<h3 style={{ margin: 0 }}>{item.date}</h3>
		<p style={{ marginTop: 8 }}>{item.description}</p>
	</div>
));

export const DemoHexTimeline: React.FC = () => {
	return (
		<VerticalHexagonGrid
			elements={DemoEventElements}
			size={600}
		/>
	);
};
