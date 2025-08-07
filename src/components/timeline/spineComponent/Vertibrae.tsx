import React from "react";
import styles from "./Timeline.module.css";
import {
	SpineComponent,
	TSpineComponent,
	TSpineElement,
	ISpineContent,
} from "./SpineComponent";

export const DefaultVertibrae: React.FC<ISpineContent> = () => {
	const centreCircle = "m20,0a20,20,90,0,0,-40,0zm-40,0a20,20,90,0,0,40,0z";
	const leftHandHalo =
		"m -22,0 a22,22,90,0,1,22,-22l0,-2a24,24,90,0,0,-24,24m24,-22h1v-40h-2v40zm-22,22v-1h-33v2h33zm-40,0a2,2,90,1,0,8,0a2,2,90,1,0,-8,0zm2,0a2,2,90,0,1,4,0a2,2,90,0,1,-4,0z";
	return (
		<>
			<path d={centreCircle} />
			<path d={leftHandHalo} />
		</>
	);
};

export class Vertibrae extends SpineComponent {
	public renderContent(args: TSpineElement): React.ReactNode {
		const {
			index,
			scaleFactor = 1,
			contentComponent: ContentComponent = DefaultVertibrae,
		} = args;

		const colours = ["#41b2b3", "#5D7F8C", "#7F81AF", "#697085", "#7E8180"];
		const colour = colours[index % 5];
		const view_box = `${-45} ${-45} ${90} ${90}`;

		return (
			<svg
				viewBox={view_box}
				width={scaleFactor * 90}
				height={scaleFactor * 90}
				fill={colour}
				preserveAspectRatio="xMidYMid meet"
				style={{ overflow: "visible" }}
				className="no-aos"
			>
				<ContentComponent index={index} scaleFactor={scaleFactor} />
			</svg>
		);
	}
}
