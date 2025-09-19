// // src/pages/homepage/impact.tsx

// import React from "react";
import { CallingCard } from "../../../../components/callingcard/CallingCard";
// import { TriPartCallout } from "../../../../components/callingcard/callout/CallOut";
import { borderGrad, Theme } from "../../../../styles";
const idx = 1;
let theme = Theme(idx);

const stat_value_style: React.CSSProperties = {
	color: theme.tertiaryColor,
	fontSize: "3rem",
	fontWeight: "500",
};
const calling_card_title = <h2>How is AI impacting business</h2>;
const stat_body_style: React.CSSProperties = {
	color: theme.primaryColor,

	borderTop: `1px solid`,
	borderImage: borderGrad,
	// marginTop: "-1%",
	fontSize: "2rem",
};
const stat_card_one = {
	header: <p style={stat_value_style}>$200 Billion</p>,
	body: <p style={stat_body_style}>spent by businesses on AI in 2024.</p>,
};

const stat_card_two = {
	body: (
		<p style={stat_body_style}>
			confidence increase in people who take our sessions in thier use of
			generative AI.
		</p>
	),
	header: <p style={stat_value_style}>96%</p>,
};

const stat_card_three = {
	header: <p style={stat_value_style}>70%</p>,

	body: (
		<p style={stat_body_style}>
			of CEOs say AI will significantly change the way their company
			creates value of the next 3 years <br />-
			<i>PwC Global CEO Survey 2024</i>.
		</p>
	),
};

// src/pages/homepage/parts/AboutUS.tsx
// src/pages/homepage/parts/AboutUS.tsx

import React from "react";
// import bulb from "../../../../assets/bulb.svg";

import { TriPartCallout_ALT } from "../../../../components/callingcard/callout/CallOut";
import { NewCallingCard } from "../../../../components/callingcard/newCallingCard";
import { VerticalHexagonGrid } from "../../../../components/hexagons/hexagonRow/VHexRow";
import { VertHexagon } from "../../../../components/hexagons/Hexagons";
import { FounderLetter } from "../FounderLetter";

const head = <h2>How is AI Impacting Business</h2>;

const foot = (
	<div>
		<p style={{ fontStyle: "italic", fontSize: "2.5rem" }}>
			‘We tend to overestimate the impact of a technology in the short
			term, and underestimate the effect of a technology in the long run’
		</p>
		<p style={{ fontSize: "2rem" }}>
			We strive for a world where AI goes right, and people are ready for
			it.
		</p>
	</div>
);

export const VHexGrid: React.FC = () => {
	return (
		<div
			style={{
				width: "100%",
				zIndex: 25,
			}}
		>
			<VerticalHexagonGrid
				elements={[
					<VertHexagon
						args={{
							// borderColor: theme.secondaryColor,
							colour: theme.backgroundColor,
						}}
						element={
							<TriPartCallout_ALT
								{...stat_card_one}
								index={1}
							/>
						}
						opacity={1}
					/>,
					<VertHexagon
						args={{
							// borderColor: theme.secondaryColor,
							colour: theme.backgroundColor,
						}}
						element={
							<TriPartCallout_ALT
								{...stat_card_two}
								index={1}
							/>
						}
						opacity={1}
					/>,
					<VertHexagon
						args={{
							// borderColor: theme.secondaryColor,
							colour: theme.backgroundColor,
						}}
						element={
							<TriPartCallout_ALT
								{...stat_card_three}
								index={1}
							/>
						}
						opacity={1}
					/>,
				]}
			/>
		</div>
	);
};

export const ImpactCC: React.FC = () => (
	<>
		<NewCallingCard
			components={[
				<div style={{ position: "relative" }}>
					<FounderLetter index={1} />
				</div>,
			]}
			title={<></>}
			footer={foot}
			index={1}
			styleOverrides={{
				paddingBottom: "20%",
				marginBottom: "-20%",
				paddingTop: "66%",
				marginTop: "-66%",
				zIndex: 5,
			}}
		/>
		<VHexGrid />
	</>
);
