// src/pages/homepage/parts/WWD.tsx

import React from "react";
import { StructuredCallout } from "../../../components/callingcard/StructuredCallout";
import { CallingCard } from "../../../components/callingcard/CallingCard";
import bulb from "../../../assets/bulb.svg";
import target from "../../../assets/target.svg";
import pen from "../../../assets/pen.svg";
import { body_font_colour } from "../../../utils/defaultColours";

import { quoteBlock } from "./AIImpactCallingCard";
import { Theme } from "../../../styles";

export const WWD: React.FC<{ index?: number }> = ({ index = -1 }) => {
	let theme = Theme(index);
	return (
		<CallingCard
			components={[
				<StructuredCallout
					data={{
						title: (
							<div
								style={{
									...quoteBlock,
									color: theme.tertiaryColor,
								}}
							>
								Consultancy
							</div>
						),
						body: (
							<div
								style={{
									color: theme.secondaryColor,
									fontSize: "2rem",
								}}
							>
								Scoping <br /> Matching Tasks to Tools
							</div>
						),
						image: bulb,
					}}
				/>,
				<StructuredCallout
					data={{
						title: (
							<div
								style={{
									...quoteBlock,
									color: theme.tertiaryColor,
								}}
							>
								Training
							</div>
						),
						body: (
							<div
								style={{
									color: theme.secondaryColor,

									fontSize: "2rem",
								}}
							>
								Prompt Engineering <br /> AI Ethics Literacy
							</div>
						),
						image: target,
					}}
				/>,
				<StructuredCallout
					data={{
						title: (
							<div
								style={{
									...quoteBlock,
									color: theme.tertiaryColor,
								}}
							>
								Policy
							</div>
						),
						body: (
							<div
								style={{
									color: theme.secondaryColor,

									fontSize: "2rem",
								}}
							>
								Drafting AI
								<br />
								Policy Reviewing AI Policy
							</div>
						),
						image: pen,
					}}
				/>,
			]}
			title="What We Do"
			index={index}
		/>
	);
};
