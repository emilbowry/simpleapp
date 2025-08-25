// src/components/timeline/newTimeline.tsx

import React from "react";
import { _EventContent, IEvent } from "../spineComponent/Event";

import {
	hexWrapAndContentContainer,
	rowstyle,
	hexagonVisualStyle,
	contentStyle,
} from "./newTimeline.styles";

import { formatComponent, ValidComponent } from "../../../utils/reactUtils";
import { CutHexagon, Hexagon } from "../../hexagons/Hexagons";

import {
	ITimelineRow,
	ITimelineData,
	// IVerticalHexagonRowProps,
} from "./newTimeline.types";

import {
	white,
	b_green,
	midnight_green,
	purple,
	grey,
	l_midnight_green,
} from "../../../utils/defaultColours";

export class NewTimelineRow extends React.Component<ITimelineRow> {
	render() {
		const spacing = -50;
		const colSize = 750;
		const { element, index = 0 } = this.props;

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
			<div style={rowstyle(colSize, spacing)}>
				<div
					style={{
						...hexWrapAndContentContainer(colSize),
					}}
				>
					{_isLeftHanded && (
						<>
							<div style={hexagonVisualStyle}>
								<Hexagon
									args={{ colour: white }}
									scale={1.5}
								/>
							</div>

							<div style={contentStyle}>
								{formatComponent(element)}
							</div>
						</>
					)}
				</div>

				<div
					style={hexWrapAndContentContainer(colSize)}
					className="no-aos"
				>
					<CutHexagon
						args={{ isLeftHanded: _isLeftHanded, colour: colour }}
						scale={1.5}
					/>
				</div>

				<div
					style={{
						...hexWrapAndContentContainer(colSize),
					}}
				>
					{!_isLeftHanded && (
						<>
							<div style={hexagonVisualStyle}>
								<Hexagon
									args={{ colour: white }}
									scale={1.5}
								/>
							</div>

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
						{timelineEvents.map((item, index) => {
							console.log(item);
							return (
								<div key={index}>
									<NewTimelineRow
										index={index}
										element={<_EventContent {...item} />}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		);
	}
}

export const DemoNewTL: React.FC = () => {
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

	return <NewTimeline timelineEvents={demoTimelineEvent} />;
};
