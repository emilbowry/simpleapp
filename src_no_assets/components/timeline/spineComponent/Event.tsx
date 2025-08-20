//  src/components/timeline/spineComponent/Event.tsx

import React from "react";
import logo from "../../../assets/growthhouselogo.png";

import {
	SpineComponent,
	TSpineComponent,
	TSpineElement,
	ISpineContent,
} from "./SpineComponent";
import { TriPartCallout } from "../../callingcard/callout/CallOut";
import { ITimelineData } from "../newTimeline.types";

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

// type TEventContent = ISpineContent & IEventContentComponentProps; // Unused but for
// type TEventElement = TSpineElement & IEventContentComponentProps;
// type TEventComponent = TSpineComponent & IEventContentComponentProps;

export const _EventContent: React.FC<IEvent> = ({
	date,
	description,
	image,
}) => {
	// const { date, description, image } = data;
	console.log(date);
	return (
		<TriPartCallout
			header={date}
			body={description}
		/>
	);
};

// export class EventContent extends SpineComponent {
// 	props!: TEventComponent;

// 	public renderContent(args: TEventElement): React.ReactNode {
// 		const { contentComponent: _EventContent, data } = args;
// 		return (
// 			<div>
// 				<_EventContent data={data} />
// 			</div>
// 		);
// 	}
// }
