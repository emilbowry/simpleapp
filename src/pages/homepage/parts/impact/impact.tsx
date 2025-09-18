// // src/pages/homepage/impact.tsx

// import React from "react";
import { CallingCard } from "../../../../components/callingcard/CallingCard";
// import { TriPartCallout } from "../../../../components/callingcard/callout/CallOut";
import { Theme } from "../../../../styles";
const idx = 0;
let theme = Theme(idx);

const stat_value_style: React.CSSProperties = {
	color: theme.tertiaryColor,
	fontSize: "3rem",
	fontWeight: "500",
};
const calling_card_title = <h2>How is AI impacting business</h2>;
const stat_body_style: React.CSSProperties = {
	borderTop: "1px solid",
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
			creates value of the next 3 years <br />-{" "}
			<i>PwC Global CEO Survey 2024</i>.
		</p>
	),
};
export const ImpactCallingCard: React.FC = () => {
	return (
		<CallingCard
			components={[
				<TriPartCallout
					{...stat_card_one}
					index={1}
				/>,
				<TriPartCallout
					{...stat_card_two}
					index={1}
				/>,
				<TriPartCallout
					{...stat_card_three}
					index={1}
				/>,
			]}
			index={1}
		/>
	);
};
// src/pages/homepage/parts/AboutUS.tsx
// src/pages/homepage/parts/AboutUS.tsx

import React from "react";
// import bulb from "../../../../assets/bulb.svg";

import {
	TriPartCallout,
	TriPartCallout_ALT,
} from "../../../../components/callingcard/callout/CallOut";
import { NewCallingCard } from "../../../../components/callingcard/newCallingCard";

const head = <h2>How is AI Impacting Business</h2>;

const foot = (
	<div>
		<p style={{ fontStyle: "italic" }}>
			‘We tend to overestimate the impact of a technology in the short
			term, and underestimate the effect of a technology in the long run’
		</p>
		<p>
			We strive for a world where AI goes right, and people are ready for
			it.
		</p>
	</div>
);

export const ImpactCC: React.FC = () => (
	<NewCallingCard
		components={[ImpactCallingCard]}
		title={head}
		footer={foot}
		index={1}
	/>
);
