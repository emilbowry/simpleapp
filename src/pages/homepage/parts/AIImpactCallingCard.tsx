// src/pages/homepage/parts/smallPartnershipBar.tsx

import React from "react";
import { FlexiCallout } from "../../../components/callingcard/StructuredCallout";

import { CallingCard } from "../../../components/callingcard/CallingCard";
import { midnight_green } from "../../../utils/defaultColours";
import { StatBox } from "./StatsBox";

import { getImageEl } from "../../../utils/reactUtils";
import workingManGif from "../../../assets/WorkingMan.gif";

const quoteTextStyle: React.CSSProperties = {
	fontStyle: "italic",
};

export const quoteBlock: React.CSSProperties = {
	fontSize: "3rem",
};

const statsContainerGrid: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 30%)",
};

const footer = (
	<div style={statsContainerGrid}>
		<div
			style={{
				gridColumn: "span 1.5",
				marginLeft: "-300px",
				scale: "0.6",
				textTransform: "none",
			}}
		>
			{getImageEl(workingManGif)}
		</div>
		<div
			style={{
				...quoteBlock,
				alignContent: "center",
				gridColumn: "span 1.5",
				marginLeft: "300px",
				marginRight: "-300px",

				marginTop: "300px",
				textTransform: "none",
			}}
		>
			<p style={{ ...quoteTextStyle, fontSize: "1em" }}>
				'We tend to overestimate the impact of a technology in the short
				term, and underestimate the effect of a technology in the long
				run'
			</p>
			<p>- Amara’s Law</p>
		</div>
	</div>
);
export const AiImpact: React.FC<{ index?: number }> = ({ index = -1 }) => {
	return (
		<CallingCard
			components={[
				<FlexiCallout
					data={{
						...StatBox(
							"Business spent",
							"$200",
							"Billion on AI in 2024",
							index
						),
						index: index,
					}}
				/>,
				<FlexiCallout
					data={{
						...StatBox(
							"Confidence increases for",
							"96%",
							"Of people who take our sessions in their use of generative AI",
							index
						),
						index: index,
					}}
				/>,

				<FlexiCallout
					data={{
						...StatBox(
							"PwC Global CEO Survey 2024",
							"70%",
							"Of CEOs say AI will significantly change the way their company creates, delivers and captures value over the next 3 years",
							index
						),
						index: index,
					}}
				/>,
			]}
			title="How AI is Impacting Business"
			footer={footer}
			index={index}
		/>
	);
};
