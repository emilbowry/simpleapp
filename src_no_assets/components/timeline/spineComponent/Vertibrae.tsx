//  src/components/timeline/spineComponent/Vertibrae.tsx

import React from "react";
import {
	b_green,
	midnight_green,
	grey,
	l_midnight_green,
	purple,
} from "../../../utils/defaultColours";
import {
	SpineComponent,
	TSpineComponent,
	TSpineElement,
	ISpineContent,
} from "./SpineComponent";

interface IVertibraeComponentProps {
	index: number;
}

type TVertibraeContent = ISpineContent & IVertibraeComponentProps;
type TVertibraeElement = TSpineElement & IVertibraeComponentProps;
type TVertibraeComponent = TSpineComponent & IVertibraeComponentProps;

export const DefaultVertibrae: React.FC<TVertibraeContent> = ({ index }) => {
	const centreCircle = "m20,0a20,20,90,0,0,-40,0zm-40,0a20,20,90,0,0,40,0z";
	const leftHandHalo =
		"m -22,0 a22,22,90,0,1,22,-22l0,-2a24,24,90,0,0,-24,24m24,-22h1v-40h-2v40zm-22,22v-1h-33v2h33zm-40,0a2,2,90,1,0,8,0a2,2,90,1,0,-8,0zm2,0a2,2,90,0,1,4,0a2,2,90,0,1,-4,0z";

	const colours = [b_green, midnight_green, purple, grey, l_midnight_green];
	const colour = colours[index % 5];

	return (
		<>
			<path d={centreCircle} fill={colour} />
			<path d={leftHandHalo} fill={colour} />
		</>
	);
};

export class Vertibrae extends SpineComponent {
	props!: TVertibraeComponent;

	public renderContent(args: TVertibraeElement): React.ReactNode {
		const {
			isLeftHanded,
			index,
			scaleFactor,
			contentComponent: ContentComponent = DefaultVertibrae,
		} = args;

		const view_box = `${-70} ${-70} ${140} ${140}`;

		return (
			<svg
				viewBox={view_box}
				width={140}
				height={140}
				preserveAspectRatio="xMidYMid meet"
			>
				<ContentComponent
					index={index}
					isLeftHanded={isLeftHanded}
					scaleFactor={scaleFactor}
				/>
			</svg>
		);
	}
}
