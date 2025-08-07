//  src/components/timeline/spineComponent/Event.tsx

// import React from "react";
import React from "react";
import styles from "../Timeline.module.css";
import {
	SpineComponent,
	TSpineComponent,
	TSpineElement,
	ISpineContent,
} from "./SpineComponent";
export interface ITimelineEvent {
	date: string;
	title: string;
	description: string;
}

export const _EventContent: React.FC<TEventContent> = ({
	index,
	scaleFactor,
	data,
}) => {
	return (
		<div className={styles.contentContainer}>
			<h3
				className={styles.eventTitle}
			>{`${data.date}: ${data.title}`}</h3>
			<p className={styles.eventDescription}>{data.description}</p>
		</div>
	);
};

interface IEventContentComponentProps {
	data: ITimelineEvent;
}

type TEventContent = ISpineContent & IEventContentComponentProps;
type TEventElement = TSpineElement & IEventContentComponentProps;
type TEventComponent = TSpineComponent & IEventContentComponentProps;

export class EventContent extends SpineComponent {
	props!: TEventComponent;
	// gets rid of data err but
	public renderContent(args: TEventElement): React.ReactNode {
		const {
			index,
			scaleFactor = 1,
			contentComponent: _EventContent,
			data,
		} = args;
		return (
			<>
				<_EventContent
					index={index}
					scaleFactor={scaleFactor}
					data={data}
				/>
			</>
		);
	}
}
