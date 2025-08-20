// src/pages/demoPage/DemoPage.tsx
import React from "react";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { CallOut } from "../../components/callingcard/callout/CallOut";
import { VerticalHexagonGrid } from "../../components/timeline/hexTimeline";
import { BackgroundStyle } from "../../styles";
import { IEvent } from "../../components/timeline/spineComponent/Event";

export const DemoHexTimeline: React.FC = () => {
	const events: IEvent[] = [
		{ date: "Early 2024", description: "AIC introduces FAST START..." },
		{ date: "Mid 2024", description: "Innovative interfaces..." },
		{ date: "Late 2024", description: "AIC launches 'tasks to tools'..." },
		{ date: "Early 2025", description: "Joe hosts Mindstone events..." },
		{ date: "Mid 2025", description: "AI-compatible transfers policy..." },
	];

	const elements = events.map((item, i) => (
		<div
			key={i}
			style={{ textAlign: "center" }}
		>
			<h3 style={{ margin: 0 }}>{item.date}</h3>
			<p style={{ marginTop: 8 }}>{item.description}</p>
		</div>
	));

	return (
		<VerticalHexagonGrid
			elements={elements}
			size={600}
		/>
	);
};

export const DemoPage: React.FC = () => {
	return (
		<div style={BackgroundStyle}>
			<CallingCard
				components={[<CallOut body={<DemoHexTimeline />} />]}
				index={-1}
			/>
		</div>
	);
};
