import React from "react";
import { Vertibrae, DefaultVertibrae } from "./spineComponent/Vertibrae";
import { EventContent, _EventContent, IEvent } from "./spineComponent/Event";
import { getImageEl } from "../../utils/reactUtils";
import bw1 from "../../assets/bw1.jpg";
import bw2 from "../../assets/bw2.jpg";

import bw3 from "../../assets/bw3.jpg";

export interface ITimelineData {
	timelineEvents: IEvent[];
}

interface ITimelineEventRowProps {
	eventData: IEvent;
	index: number;
	scaleFactor?: number;
	key?: number;
}

const contentContainer: React.CSSProperties = {
	display: "grid",
	height: "15em",
	marginTop: "1em",
	alignItems: "center",
};

const componentStyle: React.CSSProperties = {
	display: "grid",
	height: "15em",
	marginTop: "5em",
	alignContent: "center",
};

const demoTimelineEvent: IEvent[] = [
	{
		date: "Early 2024",

		description:
			"AIC introduces the FAST START Prompt engineering framework, improving the specificity, relevance and hallucination rate of LLMs in performance.",
	},
	{
		date: "Mid 2024",

		description: "Innovative interfaces like",
	},
	{
		date: "Late 2024",

		description:
			"AIC launches the 'tasks to tools' service, aligning emerging services and matching businesses  launches the 'tasks to tools' service, aligning emerging services and matching businesses with appropriate AI solutio launches the 'tasks to tools' service, aligning emerging services and matching businesses with appropriate AI solutio launches the 'tasks to tools' service, aligning emerging services and matching businesses with appropriate AI solutiowith appropriate AI solutions.",
	},
	{
		date: "Early 2025",

		description:
			"Joe becomes the host of the online events of Mindstone, one of the biggest practical AI Communities in the world.",
	},
	{
		date: "Mid 2025",

		description:
			"AI compatible transfers what it has learnt working with clients in gen AI training and consultancy into a template for generative AI policy",
	},
];

import { formatComponent, ValidComponent } from "../../utils/reactUtils";
import { CutHexagon } from "../hexagons/Hexagons";

export interface ITimelineRow {
	element: ValidComponent;
	index?: number;
}

import { Hexagon } from "../hexagons/Hexagons";
import {
	white,
	b_green,
	midnight_green,
	purple,
	grey,
	l_midnight_green,
} from "../../utils/defaultColours";

export class TimelineRow extends React.Component<ITimelineRow> {
	render() {
		const spacing = -50;
		const colSize = 750;
		const { element, index = 0 } = this.props;

		const rowstyle: React.CSSProperties = {
			display: "grid",
			gridTemplateColumns: `${colSize - 200}px ${colSize - 200}px ${
				colSize - 200
			}px`,
			gridTemplateRows: `${colSize + spacing}px`,
			justifyContent: "center",
			overflow: "visible",
			alignItems: "center",
		};

		const hexWrapAndContentContainer: React.CSSProperties = {
			width: `${colSize}px`,
			height: `${colSize}px`,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			position: "relative",
			overflow: "hidden",
			minWidth: 0,
			minHeight: 0,
		};

		const hexagonVisualStyle: React.CSSProperties = {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			zIndex: 1,
			opacity: 0.7,
		};

		const contentStyle: React.CSSProperties = {
			position: "absolute",
			top: "10%",
			left: "25%",
			width: "50%",
			height: "90%",
			display: "flex",
			justifyContent: "center",
			// alignItems: "center",
			zIndex: 2,
			boxSizing: "border-box",

			overflowY: "auto",
			overflowX: "hidden",
		};

		let _isLeftHanded = index % 2 === 0;
		const colours = [
			b_green,
			midnight_green,
			purple,
			grey,
			l_midnight_green,
		];
		const colour = colours[index % 5];
		return (
			<div style={rowstyle}>
				<div
					style={{
						...hexWrapAndContentContainer,
					}}
				>
					{_isLeftHanded && (
						<>
							{/* Hexagon visual layer */}
							<div style={hexagonVisualStyle}>
								<Hexagon
									// args={{ colour: colour }}
									args={{ colour: white }}
									scale={1.5}
								/>
							</div>
							{/* Content layer */}
							<div style={contentStyle}>
								{formatComponent(element)}
							</div>
						</>
					)}
				</div>

				<div style={hexWrapAndContentContainer} className="no-aos">
					{/* This is the spine component, which doesn't contain content */}
					<CutHexagon
						args={{ isLeftHanded: _isLeftHanded, colour: colour }}
						scale={1.5}
					/>
				</div>

				<div
					style={{
						...hexWrapAndContentContainer,
					}}
				>
					{!_isLeftHanded && (
						<>
							{/* Hexagon visual layer */}
							<div style={hexagonVisualStyle}>
								<Hexagon
									// args={{ colour: colour }}
									args={{ colour: white }}
									scale={1.5}
								/>
							</div>
							{/* Content layer */}
							<div style={contentStyle}>
								{formatComponent(element)}
							</div>
						</>
					)}
				</div>
			</div>
		);
	}
}
export class NewTimeline extends React.Component<ITimelineData> {
	render() {
		const { timelineEvents } = this.props;

		return (
			<section>
				<div data-scroll-root>
					<div style={{}}>
						{timelineEvents.map((item, index) => (
							<div key={index}>
								<TimelineRow
									key={index}
									index={index}
									element={<_EventContent data={item} />}
								/>
							</div>
						))}
					</div>
					{/* <FinalImages /> */}
				</div>
			</section>
		);
	}
}

export const DemoNewTL: React.FC = () => {
	return <NewTimeline timelineEvents={demoTimelineEvent} />;
};
