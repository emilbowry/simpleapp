// src/components/timeline/Timeline.tsx

import React from "react";
import styles from "./Timeline.module.css";
import { Vertibrae, DefaultVertibrae } from "./spineComponent/Vertibrae";
import { EventContent, _EventContent, IEvent } from "./spineComponent/Event";
import logo from "../../assets/growthhouselogo.png";
export interface ITimelineData {
	timelineEvents: IEvent[];
}

interface ITimelineEventRowProps {
	eventData: IEvent;
	index: number;
	scaleFactor?: number;
	key?: number;
}
// marginLeft: `${1 * scaleFactor}rem`,

class TimelineEventRow extends React.Component<ITimelineEventRowProps> {
	render() {
		const { index, eventData, scaleFactor = 3, key } = this.props;
		// this.
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
		const componentStyle: React.CSSProperties = {
			display: "grid",
			height: "15em",
			marginTop: "1em",
			alignContent: "center",
		};

		return (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr auto 1fr",
					width: "100%",
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
				<div>
					<div className={"no-aos"} style={componentStyle}>
						{vertElement}
					</div>
				</div>
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
						<div key={index}>
							<TimelineEventRow
								key={index}
								index={index}
								eventData={item}
							/>
						</div>
					))}
				</div>
			</section>
		);
	}
}

const demoTimelineEvent: IEvent[] = [
	{
		date: "Early 2024",
		// title: "Prompt Engineering Offering",
		// image: logo,

		description:
			"AIC introduces the FAST START Prompt engineering framework, improving the specificity, relevance and hallucination rate of LLMs in performance.",
	},
	{
		date: "Mid 2024",
		// title: "Emergence of Newer Interfaces",
		description: "Innovative interfaces like",
	},
	{
		date: "Late 2024",
		// title: "'Tasks to Tools' Offering",
		description:
			"AIC launches the 'tasks to tools' service, aligning emerging services and matching businesses  launches the 'tasks to tools' service, aligning emerging services and matching businesses with appropriate AI solutio launches the 'tasks to tools' service, aligning emerging services and matching businesses with appropriate AI solutio launches the 'tasks to tools' service, aligning emerging services and matching businesses with appropriate AI solutiowith appropriate AI solutions.",
	},
	{
		date: "Early 2025",
		// title: "Mindstone online",
		description:
			"Joe becomes the host of the online events of Mindstone, one of the biggest practical AI Communities in the world.",
	},
	{
		date: "Mid 2025",
		// title: "Policy-writing",
		description:
			"AI compatible transfers what it has learnt working with clients in gen AI training and consultancy into a template for generative AI policy",
	},
];

export const demoTimeline: React.FC = () => {
	return <Timeline timelineEvents={demoTimelineEvent} />;
};

export const _demoTimeline: React.ReactNode = (
	<Timeline timelineEvents={demoTimelineEvent} />
);
