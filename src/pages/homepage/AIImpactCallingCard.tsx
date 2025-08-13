import React from "react";

import { CallingCard } from "../../components/callingcard/CallingCard";
import {
	title_font_colour,
	subtitle_colour,
	body_font_colour,
	midnight_green,
	light_mix_green,
} from "../../utils/defaultColours";

import {
	formatComponent,
	getImageEl,
	ValidComponent,
} from "../../utils/reactUtils";
import workingManGif from "../../assets/WorkingMan.gif";

const sectionContainerStyle: React.CSSProperties = {
	color: title_font_colour,
	// width: "100%",
};

const titleHeadingStyle: React.CSSProperties = {
	fontSize: "4rem",
	color: title_font_colour,
};

const imageQuoteSectionStyle: React.CSSProperties = {};

const imageContainerStyle: React.CSSProperties = {};

const quoteContainerStyle: React.CSSProperties = {};

const quoteTextStyle: React.CSSProperties = {
	fontStyle: "italic",
};

const quoteBlock: React.CSSProperties = {
	fontSize: "3rem",

	color: midnight_green,
};

const borderedContentSectionBaseStyle: React.CSSProperties = {};
const _style_BorderedCalloutHeading: React.CSSProperties = {
	borderTop: "2px solid",
	paddingTop: "10px",
	borderBottom: "2px solid",
	paddingBottom: "10px",
	borderColor: light_mix_green,
};

export const style_BorderedCalloutHeading = `${_style_BorderedCalloutHeading}`;

const statsContainerGrid: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 30%)",
};

import { CallOut } from "../../components/callingcard/CallOut";

interface IFlexiCalloutProps {
	component: ValidComponent;
}
export class FlexiCallout extends CallOut {
	public static flexiCallotStyle: React.CSSProperties = {
		marginLeft: "10px",
		paddingTop: "10px",
		paddingBottom: "10px",
		marginRight: "10px",
		color: body_font_colour,
		fontSize: "3rem",
		textAlign: "center",
		alignContent: "center",
		alignSelf: "start",
		// fontWeight: "bold",
		overflowY: "auto", // Allows vertical scrolling if content overflows
	};
	generateNode(args: IFlexiCalloutProps) {
		console.log(args.component);
		return (
			<div
				style={{
					...FlexiCallout.flexiCallotStyle,
					..._style_BorderedCalloutHeading,
				}}
			>
				{formatComponent(args.component)}
			</div>
		);
	}
}

const StatBox = (
	preamble: string,
	stat: string,
	body: string
): React.ReactNode => {
	const statValueStyle: React.CSSProperties = {
		color: subtitle_colour,
		// fontWeight: "bold",
		fontSize: "2.5rem",
	};

	const statDescriptionStyle: React.CSSProperties = {
		letterSpacing: "0.2rem",
		textTransform: "uppercase",
		fontWeight: "500",
	};

	return (
		<>
			<p style={statDescriptionStyle}>{preamble}</p>
			<div style={statValueStyle}>{stat}</div>
			<p style={statDescriptionStyle}>{body}</p>
		</>
	);
};
const footer = (
	<div style={statsContainerGrid}>
		<div
			style={{
				// ...statBoxStyle,
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
export const impactCC: React.FC<{ index?: number }> = ({ index = -1 }) => {
	return (
		<CallingCard
			components={[
				<FlexiCallout
					data={{
						component: StatBox(
							"Business spent",
							"$200",
							"Billion on AI in 2024"
						),
					}}
				/>,
				<FlexiCallout
					data={{
						component: StatBox(
							"Confidence increases for",
							"96%",
							"Of people who take our sessions in their use of generative AI"
						),
					}}
				/>,

				<FlexiCallout
					data={{
						component: StatBox(
							"PwC Global CEO Survey 2024",
							"70%",
							"Of CEOs say AI will significantly change the way their company creates, delivers and captures value over the next 3 years"
						),
					}}
				/>,
			]}
			title="How AI is Impacting Business"
			footer={footer}
			index={index}
		/>
	);
};

export const AboutUs: React.FC<{ index?: number }> = ({ index = -1 }) => {
	return (
		<CallingCard
			title="About us"
			components={[
				<div
					style={{
						color: body_font_colour,
						fontSize: "2rem",
					}}
				>
					At AI Compatible, we believe not everyone needs to be an AI
					expert but everyone should be AI compatible. That means
					being alert to the opportunities and the risks: we help
					businesses navigate both, with tailored sessions giving you
					the right tools, skills, and literacy.
					<br />
					We strive for a world where AI goes right, and people are
					ready for it.
				</div>,
			]}
			index={index}
		/>
	);
};

import { StructuredCallout } from "../../components/callingcard/StructuredCallout";

import bulb from "../../assets/bulb.svg";
import target from "../../assets/target.svg";
import pen from "../../assets/pen.svg";

export const WWD: React.FC<{ index?: number }> = ({ index = -1 }) => {
	return (
		<CallingCard
			components={[
				<StructuredCallout
					data={{
						title: <div style={quoteBlock}>Consultancy</div>,
						description: (
							<div
								style={{
									color: body_font_colour,
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
						title: <div style={quoteBlock}>Training</div>,
						description: (
							<div
								style={{
									color: body_font_colour,
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
						title: <div style={quoteBlock}>Policy</div>,
						description: (
							<div
								style={{
									color: body_font_colour,
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

// import { CallOut } from "../../components/callingcard/CallOut";
