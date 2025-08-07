//  src/components/timeline/spineComponent/Event.tsx

import React from "react";
import styles from "../Timeline.module.css";
import logo from "../../../assets/growthhouselogo.png";

import {
	SpineComponent,
	TSpineComponent,
	TSpineElement,
	ISpineContent,
} from "./SpineComponent";

import {
	StructuredCallout,
	IStructuredCalloutData,
	BorderdCallout,
} from "../../callingcard/CallOut";

export interface IEvent {
	date: string;
	image?: string;
	description: string;
}

type TEvent = Omit<IEvent, "date"> & {
	title: IEvent["date"];
};

interface IEventContentComponentProps {
	data: IEvent;
}

type TEventContent = ISpineContent & IEventContentComponentProps;
type TEventElement = TSpineElement & IEventContentComponentProps;
type TEventComponent = TSpineComponent & IEventContentComponentProps;

export const _EventContent: React.FC<IEventContentComponentProps> = ({
	data,
}) => {
	const { date, description, image } = data;
	let title = date;
	return (
		<BorderdCallout data={{ title, description, image }} />
		// <div className={styles.contentContainer}>
		// 	<h3
		// 		className={styles.eventTitle}
		// 	>{`${data.date}: ${data.title}`}</h3>
		// 	<p className={styles.eventDescription}>{data.description}</p>
		// </div>
	);
};

export class EventContent extends SpineComponent {
	props!: TEventComponent;

	public renderContent(args: TEventElement): React.ReactNode {
		const { contentComponent: _EventContent, data } = args;
		return (
			<div>
				<_EventContent data={data} />
			</div>
		);
	}
}

const demoEvent: IEvent[] = [
	{
		date: "Early 2024",
		description:
			"AIC introduces the FAST START Prompt engineering framework, improving the specificity, relevance and hallucination rate of LLMs in performance.",
	},
	{
		date: "Mid 2024",
		image: logo,
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
