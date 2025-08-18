//  src/components/timeline/spineComponent/Event.tsx

import React from "react";
import logo from "../../../assets/growthhouselogo.png";

import {
	SpineComponent,
	TSpineComponent,
	TSpineElement,
	ISpineContent,
} from "./SpineComponent";
import { BorderdCallout } from "../../callingcard/StructuredCallout";

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

type TEventContent = ISpineContent & IEventContentComponentProps; // Unused but for
type TEventElement = TSpineElement & IEventContentComponentProps;
type TEventComponent = TSpineComponent & IEventContentComponentProps;

export const _EventContent: React.FC<IEventContentComponentProps> = ({
	data,
}) => {
	const { date: title, description: body, image } = data;
	return <BorderdCallout data={{ title, body, image }} />;
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
