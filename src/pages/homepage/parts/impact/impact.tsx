// // src/pages/homepage/impact.tsx

import React from "react";

import { TriPartCallout } from "../../../../components/callingcard/callout/CallOut";
import { NewCallingCard } from "../../../../components/callingcard/newCallingCard";
import {
	VerticalHexagonFeatureGrid,
	VerticalHexagonGrid,
} from "../../../../components/hexagons/hexagonRow/VHexRow";
import { VertHexagon } from "../../../../components/hexagons/Hexagons";
import { BoxedImage, getImageEl } from "../../../../utils/reactUtils";
import cam from "../../../../assets/cam.png";
import LH from "../../../../assets/leverCent.png";
import logo from "../../../../assets/logo.png";
import { borderGrad, Theme } from "../../../../styles";
import { hexCallStyle } from "../about-us/AboutUs.styles";

const idx = 1;
let theme = Theme(idx);

const stat_value_style: React.CSSProperties = {
	color: theme.tertiaryColor,
	fontSize: "3rem",
	margin: "1%",
	height: "5rem",
	fontWeight: "500",
	justifySelf: "center",
};

const stat_body_style: React.CSSProperties = {
	color: theme.primaryColor,
	borderTop: `1px solid`,
	borderImage: borderGrad,
	margin: "auto 0",
	padding: "1%",
	height: "20rem",
	// marginTop: "-1%",
	fontSize: "2rem",
};

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

/**
@improvement 
- Generalise this into a more concrete FC since it is repeated 
 */

const impactFeatureCallouts = [
	{
		header: <p style={stat_value_style}>$200 Billion</p>,
		body: <p style={stat_body_style}>spent by businesses on AI in 2024.</p>,
	},
	{
		body: (
			<p style={stat_body_style}>
				confidence increase in people who take our sessions in their use
				of generative AI.
			</p>
		),
		header: <p style={stat_value_style}>96%</p>,
	},
	{
		header: <p style={stat_value_style}>70%</p>,
		body: (
			<p style={stat_body_style}>
				of CEOs say AI will significantly change the way their company
				creates value of the next 3 years <br />-
				<i>PwC Global CEO Survey 2024</i>.
			</p>
		),
	},
];

const LetterFooter: React.FC<{ index?: number }> = ({ index = 0 }) => {
	let theme = Theme(index);
	return (
		<div
			style={
				{
					// scale: "0.5",
					// justifyContent: "left",
					// marginLeft: "-700px",
					// alignContent: "flex-start",
				}
			}
		>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "30% 70%",
					// alignContent: "center",
					textAlign: "left",
					width: "100%",
					// justifyContent: "left",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<BoxedImage
						image={logo}
						aspectRatio={`${Math.sqrt(3) / 2}`}
						width={"50%"}
					/>
				</div>
				<div style={{ alignContent: "center" }}>
					<h3 style={{ color: theme.primaryColor }}>Joe Fennel</h3>
					<h4 style={{ color: theme.tertiaryColor }}>
						Chief Executive Officer
					</h4>
					<h5 style={{ color: theme.secondaryColor }}>
						MPhil The Ethics of AI
					</h5>
				</div>
			</div>
		</div>
	);
};
export const FFoouter: React.FC = () => {
	return (
		<section>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					// alignContent: "center",
					// justifyContent: "left",
				}}
			>
				<div>{getImageEl(cam)}</div>
				<div>{getImageEl(LH)}</div>
			</div>
		</section>
	);
};
export const FounderLetter: React.FC<{ index?: number }> = ({ index = 0 }) => {
	const letter = (
		<div
			style={{
				// isolation: "isolate",
				width: "100%",
				// alignContent: "flex-end",
				// justifyContent: "left",
				// flexDirection: "row",
			}}
		>
			<div style={{ textAlign: "left" }}>
				<h2 style={{ color: Theme(index).primaryColor }}>
					A letter from our Founder
				</h2>
				<p>
					The Alignment Problem’ is the challenge of aligning powerful
					AI systems with human values. That is, to make sure that AI
					systems only ‘wants’ what we want.
				</p>
				<p>
					There are lots of hardworking researchers, policymakers and
					businesses working on the problem of how to align powerful
					AI systems to human values. One of my favorite books on the
					alignment problem is ‘Human Compatible’, by Stuart Russell.
				</p>

				<p>
					But Alignment from AI to humans isn’t enough: we need to do
					our bit too. That is, we need to have values to begin with
					to be aligned, and we need to be familiar enough with AI
					systems that we are informed, able, and well-intentioned
					with the powerful AI systems that are being released.
				</p>
				<p>
					AI Compatible is a consultancy that works on this neglected
					side of the alignment problem – the human side. We boost AI
					literacy, familiarity, and ethics: in a word, compatibility.
				</p>
			</div>
			<div>
				<LetterFooter index={index} />
			</div>
		</div>
	);

	return letter;
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
		<VerticalHexagonFeatureGrid
			featureCallouts={impactFeatureCallouts}
			hexagonArgs={{ colour: Theme(idx).backgroundColor }}
		/>
	</>
);
