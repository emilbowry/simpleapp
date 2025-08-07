// src/components/timeline/Timeline.tsx

import React from "react";
import styles from "./Timeline.module.css";
import { Vertibrae, DefaultVertibrae } from "./spineComponent/Vertibrae";
import {
	EventContent,
	_EventContent,
	ITimelineEvent,
} from "./spineComponent/Event";

// This interface remains the same.
export interface ITimelineData {
	timelineEvents: ITimelineEvent[];
}

interface ITimelineEventRowProps {
	eventData: ITimelineEvent;
	index: number;
	scaleFactor?: number;
}

/**
 * TimelineEventRow is responsible for the three-column layout.
 * It now calculates the `isLeftHanded` boolean and passes it down
 * to the SpineComponent children, which handle their own transformations.
 */
class TimelineEventRow extends React.Component<ITimelineEventRowProps> {
	render() {
		const { index, eventData, scaleFactor = 2 } = this.props;

		// The orientation logic is now owned by the TimelineEventRow.
		const isLeftHanded = index % 2 === 0;

		// The EventContent component is now index-agnostic. It only needs to
		// know if it's on the left to apply the correct text direction.
		const eventElement = (
			<EventContent
				isLeftHanded={isLeftHanded}
				scaleFactor={1} // Text itself doesn't scale.
				reflectable={false} // Use `direction` for text.
				contentComponent={_EventContent}
				data={eventData}
			/>
		);

		return (
			<div className={styles.timelineEventRow}>
				{/* Column A: Left Content */}
				<div
					className={styles.contentColumn}
					style={{
						// The container still provides the overall alignment context.
						textAlign: "right",
						marginRight: `${1 * scaleFactor}rem`,
					}}
				>
					{isLeftHanded && eventElement}
				</div>

				{/* Column B: Center Spine */}
				<div className={styles.spineContainer}>
					<Vertibrae
						isLeftHanded={isLeftHanded}
						index={index} // Vertibrae still needs the index for its color logic.
						scaleFactor={scaleFactor}
						reflectable={true} // Use `transform:scale` for SVG.
						contentComponent={DefaultVertibrae}
					/>
				</div>

				{/* Column C: Right Content */}
				<div
					className={styles.contentColumn}
					style={{
						textAlign: "left",
						marginLeft: `${1 * scaleFactor}rem`,
					}}
				>
					{!isLeftHanded && eventElement}
				</div>
			</div>
		);
	}
}

/**
 * The main Timeline component. It takes an array of events and maps
 * over them, creating a TimelineEventRow for each one.
 */
export class Timeline extends React.Component<ITimelineData> {
	render() {
		const { timelineEvents } = this.props;

		return (
			<section className={styles.timelineSection}>
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
