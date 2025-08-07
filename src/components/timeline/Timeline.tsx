// src/components/timeline/Timeline.tsx

import React from "react";
import styles from "./Timeline.module.css";
import { Vertibrae, DefaultVertibrae } from "./spineComponent/Vertibrae";
import {
	EventContent,
	_EventContent,
	ITimelineEvent,
} from "./spineComponent/Event";

export interface ITimelineData {
	timelineEvents: ITimelineEvent[];
}

interface ITimelineEventRowProps {
	eventData: ITimelineEvent;
	index: number;
	scaleFactor?: number;
}
// marginLeft: `${1 * scaleFactor}rem`,

class TimelineEventRow extends React.Component<ITimelineEventRowProps> {
	render() {
		const { index, eventData, scaleFactor = 3 } = this.props;
		const isLeft = index % 2 === 0;

		const eventElement = (
			<EventContent
				isLeftHanded={!isLeft}
				scaleFactor={scaleFactor}
				reflectable={false}
				contentComponent={_EventContent}
				data={eventData}
			/>
		);

		const vertElement = (
			<Vertibrae
				isLeftHanded={!isLeft}
				index={index}
				scaleFactor={scaleFactor}
				reflectable={true}
				contentComponent={DefaultVertibrae}
			/>
		);

		return (
			<div
				className={styles.timelineEventRow}
				style={{
					// height: `${8 * scaleFactor}rem`,
					overflow: "visible",
				}}
			>
				<div
					className={styles.contentContainer}
					style={{
						paddingRight: `${4 * scaleFactor}em`,
					}}
				>
					{isLeft && eventElement}
				</div>

				<div className={styles.contentContainer}>{vertElement}</div>

				<div
					className={styles.contentContainer}
					style={{ paddingLeft: `${4 * scaleFactor}em` }}
				>
					{!isLeft && eventElement}
				</div>
			</div>
		);
	}
}

export class Timeline extends React.Component<ITimelineData> {
	render() {
		const { timelineEvents } = this.props;

		return (
			<section>
				<div data-scroll-root>
					{timelineEvents.map((item, index) => (
						<TimelineEventRow
							key={index}
							index={index}
							eventData={item}
						/>
					))}
				</div>
			</section>
		);
	}
}

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
		description: "Innovative interfaces like",
	},
	{
		date: "Late 2024",
		title: "'Tasks to Tools' Offering",
		description:
			"AIC launches the 'tasks to tools' service, aligning emerging services and matching businesses  launches the 'tasks to tools' service, aligning emerging services and matching businesses with appropriate AI solutio launches the 'tasks to tools' service, aligning emerging services and matching businesses with appropriate AI solutio launches the 'tasks to tools' service, aligning emerging services and matching businesses with appropriate AI solutiowith appropriate AI solutions.",
	},
	{
		date: "Early 2025",
		title: "Mindstone online",
		description:
			"Joe becomes the host of the online events of Mindstone, one of the biggest practical AI Communities in the world.",
	},
	{
		date: "Mid 2025",
		title: "Policy-writing",
		description:
			"AI compatible transfers what it has learnt working with clients in gen AI training and consultancy into a template for generative AI policy",
	},
];

export const demoTimeline: React.FC = () => {
	return <Timeline timelineEvents={demoTimelineEvent} />;
};
