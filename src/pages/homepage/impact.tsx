// src/pages/homepage/impact.tsx

import React from "react";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { TriPartCallout } from "../../components/callingcard/callout/CallOut";
import { Theme } from "../../styles";
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
	header: <p style={stat_value_style}>96%</p>,
	body: (
		<p style={stat_body_style}>
			confidence increase in people who take our sessions in thier use of
			generative AI.
		</p>
	),
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
			title={calling_card_title}
			components={[
				<TriPartCallout
					{...stat_card_one}
					index={0}
				/>,
				<TriPartCallout
					{...stat_card_two}
					index={0}
				/>,
				<TriPartCallout
					{...stat_card_three}
					index={0}
				/>,
			]}
		/>
	);
};
