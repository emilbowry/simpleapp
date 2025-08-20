// src/pages/homepage/parts/WWD.tsx

import React from "react";
import { StructuredCallout } from "../../../components/callingcard/callout/StructuredCallout";
import { CallingCard } from "../../../components/callingcard/CallingCard";
import bulb from "../../../assets/bulb.svg";
import target from "../../../assets/target.svg";
import pen from "../../../assets/pen.svg";
import { body_font_colour } from "../../../utils/defaultColours";

import { quoteBlock } from "./AIImpactCallingCard";
import { Theme } from "../../../styles";
import { TriPartCallout } from "../../../components/callingcard/callout/CallOut";
import { getImageEl } from "../../../utils/reactUtils";

export const WWD: React.FC<{ index?: number }> = ({ index = -1 }) => {
	let theme = Theme(index);
	return (
		<CallingCard
			components={[
				<TriPartCallout
					{...{
						header: getImageEl(bulb, {
							display: "block",
							marginLeft: "auto",
							marginRight: "auto",
						}),
						body: (
							<div
								style={{
									...quoteBlock,
									textAlign: "center",
									color: theme.tertiaryColor,
								}}
							>
								Consultancy
							</div>
						),
						footer: (
							<div
								style={{
									color: theme.secondaryColor,
									textAlign: "center",

									fontSize: "2rem",
								}}
							>
								Scoping <br /> Matching Tasks to Tools
							</div>
						),
					}}
				/>,
				<TriPartCallout
					{...{
						body: (
							<div
								style={{
									...quoteBlock,
									textAlign: "center",

									color: theme.tertiaryColor,
								}}
							>
								Training
							</div>
						),
						footer: (
							<div
								style={{
									color: theme.secondaryColor,
									textAlign: "center",

									fontSize: "2rem",
								}}
							>
								Prompt Engineering <br /> AI Ethics Literacy
							</div>
						),
						header: getImageEl(target, {
							display: "block",
							marginLeft: "auto",
							marginRight: "auto",
						}),
					}}
				/>,
				<TriPartCallout
					{...{
						body: (
							<div
								style={{
									...quoteBlock,
									textAlign: "center",

									color: theme.tertiaryColor,
								}}
							>
								Policy
							</div>
						),
						footer: (
							<div
								style={{
									color: theme.secondaryColor,
									textAlign: "center",

									fontSize: "2rem",
								}}
							>
								Drafting AI
								<br />
								Policy Reviewing AI Policy
							</div>
						),
						header: getImageEl(pen, {
							display: "block",
							marginLeft: "auto",
							marginRight: "auto",
						}),
					}}
				/>,
			]}
			title="What We Do"
			index={index}
		/>
	);
};
