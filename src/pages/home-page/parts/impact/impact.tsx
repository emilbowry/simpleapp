// // src/pages/homepage/impact.tsx

import React from "react";

import { SideBarCallingCard } from "../../../../components/callingcard/CallingCard";
import { PointedtopHexagonFeatureGrid } from "../../../../components/hexagons/hexagon-row/pointed-hexagon-row/PointedHexagonRow";
import { BoxedImage } from "../../../../utils/reactUtils";

import logo from "../../../../assets/logo.png";
import { SideBarFullOverlapStyle } from "../../../../components/callingcard/CallingCard.styles";
import { Theme } from "../../../../styles";
import {
	FounderLetterWrapperStyle,
	LetterFooterContainerStyle,
	LetterFooterWrapperStyle,
	stat_body_style,
	stat_value_style,
} from "./impact.styles";

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

const impactFeatureCallouts = [
	[
		<p style={stat_value_style}>$200 Billion</p>,
		<p style={stat_body_style}>spent by businesses on AI in 2024.</p>,
	],
	[
		<p style={stat_value_style}>96%</p>,
		<p style={stat_body_style}>
			confidence increase in people who take our sessions in their use of
			generative AI.
		</p>,
	],
	[
		<p style={stat_value_style}>70%</p>,
		<p style={stat_body_style}>
			of CEOs say AI will significantly change the way their company
			creates value of the next 3 years <br />-
			<i>PwC Global CEO Survey 2024</i>.
		</p>,
	],
];
const LetterFooter: React.FC<{ index?: number }> = ({ index = 0 }) => {
	let theme = Theme(index);
	return (
		<div style={LetterFooterWrapperStyle}>
			<div style={LetterFooterContainerStyle}>
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

const FounderLetter: React.FC<{ index?: number }> = ({ index = 0 }) => {
	const letter = (
		<div style={FounderLetterWrapperStyle}>
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

const ImpactCC: React.FC<{ index?: number }> = ({ index = 1 }) => (
	<>
		<SideBarCallingCard
			components={[
				<div style={{ position: "relative" }}>
					<FounderLetter index={index} />
				</div>,
			]}
			sideBar={{ components: [foot] }}
			footer={
				<PointedtopHexagonFeatureGrid
					featureCallouts={impactFeatureCallouts}
					hexagonArgs={{ colour: Theme(index).backgroundColor }}
				/>
			}
			index={1}
			styleOverrides={SideBarFullOverlapStyle}
		/>
	</>
);
export { ImpactCC };
