//  src/components/timeline/spineComponent/Vertibrae.tsx

import React from "react";
import styles from "./Timeline.module.css";
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

	const colours = ["#41b2b3", "#5D7F8C", "#7F81AF", "#697085", "#7E8180"];
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

		// `,

		return (
			<svg
				viewBox={view_box}
				width={140}
				height={140}
				preserveAspectRatio="xMidYMid meet"
				// style={{
				// 	overflow: "visible",
				// }}
				className="no-aos"
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

export const demoVertibrae: React.FC = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Vertibrae
				isLeftHanded={true}
				index={0}
				scaleFactor={1.5}
				reflectable={true}
				contentComponent={DefaultVertibrae}
			/>
			<Vertibrae
				isLeftHanded={false}
				index={1}
				scaleFactor={1.5}
				reflectable={true}
				contentComponent={DefaultVertibrae}
			/>
		</div>
	);
};
