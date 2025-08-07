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
interface IEventContentComponentProps {
	data: ITimelineEvent;
}

type TEventContent = ISpineContent & IEventContentComponentProps;
type TEventElement = TSpineElement & IEventContentComponentProps;
type TEventComponent = TSpineComponent & IEventContentComponentProps;

export const _EventContent: React.FC<TEventContent> = ({
	// index,
	// scaleFactor,
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

export class EventContent extends SpineComponent {
	props!: TEventComponent;

	public renderContent(args: TEventElement): React.ReactNode {
		const {
			// index,
			// scaleFactor = 1,
			contentComponent: _EventContent,
			data,
		} = args;
		return (
			<>
				<_EventContent
					// index={index}
					// scaleFactor={scaleFactor}
					data={data}
				/>
			</>
		);
	}
}

const demoEvent: ITimelineEvent[] = [
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
export const demoEvents: React.FC = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<EventContent
				isLeftHanded={true}
				scaleFactor={1.5}
				reflectable={false}
				contentComponent={_EventContent}
				data={demoEvent[0]}
			/>
			<EventContent
				isLeftHanded={false}
				scaleFactor={1.5}
				reflectable={false}
				contentComponent={_EventContent}
				data={demoEvent[1]}
			/>
		</div>
	);
};
