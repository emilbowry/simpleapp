import React from "react";
import styles from "./DemoPage.module.css";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { CallOut } from "../../components/callingcard/CallOut";
import {
	Vertibrae,
	DefaultVertibrae,
} from "../../components/timeline/spineComponent/Vertibrae";
import { demoTimelineEvents } from "../../components/timeline/Timeline";
// const demoTimelineEvent: ITimelineEvent[] = [
// 	{
// 		date: "Early 2024",
// 		title: "Prompt Engineering Offering",
// 		description:
// 			"AIC introduces the FAST START Prompt engineering framework, improving the specificity, relevance and hallucination rate of LLMs in performance.",
// 	},
// 	{
// 		date: "Mid 2024",
// 		title: "Emergence of Newer Interfaces",
// 		description:
// 			"Innovative interfaces like Gamma, Napkin AI, and Sana gain traction, indicating a diversifying AI landscape and a growing demand for specialized tools.",
// 	},
// 	// {
// 	//   date: 'Late 2024',
// 	//   title: "'Tasks to Tools' Offering",
// 	//   description: "AIC launches the 'tasks to tools' service, aligning emerging services and matching businesses with appropriate AI solutions.",
// 	// },
// 	// {
// 	//   date: 'Early 2025',
// 	//   title: 'Mindstone online',
// 	//   description: 'Joe becomes the host of the online events of Mindstone, one of the biggest practical AI Communities in the world.',
// 	// },
// 	// {
// 	//   date: 'Mid 2025',
// 	//   title: 'Policy-writing',
// 	//   description: 'AI compatible transfers what it has learnt working with clients in gen AI training and consultancy into a template for generative AI policy',
// 	// },
// ];

const demoTimeline: React.FC = () => {
	// return (
	//   <section>
	//     <h2 style={{ textAlign: 'center' }}>Our Journey</h2>

	//     <Timeline timelineEvents={demoTimelineEvent} />

	//   </section>
	// )
	return (
		<section>
			<h2 style={{ textAlign: "center" }}>Our Journey</h2>
		</section>
	);

	// return (
	// 	<div
	// 		style={{
	// 			display: "flex",
	// 			flexDirection: "column",
	// 			alignItems: "center",
	// 		}}
	// 	>
	// 		{/*
	// 		 * You render the specialized `Vertibrae` class directly.
	// 		 * It will automatically use the `DefaultVertibrae` shape.
	// 		 */}
	// 		<Vertibrae
	// 			index={0}
	// 			scaleFactor={1.5}
	// 			reflectable={true}
	// 			contentComponent={DefaultVertibrae}
	// 		/>
	// 		<Vertibrae
	// 			index={1}
	// 			scaleFactor={1.5}
	// 			reflectable={true}
	// 			contentComponent={DefaultVertibrae}
	// 		/>
	// 	</div>
	// );

	// return (
	// 	<div
	// 		style={{
	// 			display: "flex",
	// 			flexDirection: "column",
	// 			alignItems: "center",
	// 		}}
	// 	>
	// 		{/*
	// 		 * You render the specialized `Vertibrae` class directly.
	// 		 * It will automatically use the `DefaultVertibrae` shape.
	// 		 */}
	// 		<EventContent
	// 			index={0}
	// 			scaleFactor={1.5}
	// 			reflactable={false}
	// 			contentComponent={_EventContent}
	// 			data={demoTimelineEvent[0]}
	// 		/>
	// 		<EventContent
	// 			index={1}
	// 			scaleFactor={1.5}
	// 			reflactable={false}
	// 			contentComponent={_EventContent}
	// 			data={demoTimelineEvent[0]}
	// 		/>
	// 	</div>
	// );
};

export const DemoPage: React.FC = () => {
	const componentsToRender = [<CallOut Component={demoTimelineEvents} />];

	const ccElement = <CallingCard components={componentsToRender} index={0} />;
	const bcElement = <CallingCard components={componentsToRender} index={1} />;

	return (
		<section>
			{ccElement}

			<div>{bcElement}</div>
		</section>
	);
};
