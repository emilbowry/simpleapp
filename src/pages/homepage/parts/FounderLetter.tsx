// src/pages/homepage/parts/FounderLetter.tsx

import React from "react";
import logo from "../../../assets/logo.png";
import cam from "../../../assets/cam.png";
import LH from "../../../assets/leverCent.png";

import { getImageEl } from "../../../utils/reactUtils";
import { Theme } from "../../../styles";
import { CallingCard } from "../../../components/callingcard/CallingCard";
const LetterFooter: React.FC<{ index?: number }> = ({ index = 0 }) => {
	let theme = Theme(index);
	return (
		<div
			style={{
				scale: "0.5",
				// justifyContent: "left",
				marginLeft: "-700px",
				// alignContent: "flex-start",
			}}
		>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "30% 70%",
					alignContent: "center",
					justifyContent: "left",
				}}
			>
				<div>{getImageEl(logo)}</div>
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
					alignContent: "center",
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
		<div>
			<p>
				The Alignment Problem’ is the challenge of aligning powerful AI
				systems with human values. That is, to make sure that AI systems
				only ‘wants’ what we want.
			</p>
			<p>
				There are lots of hardworking researchers, policymakers and
				businesses working on the problem of how to align powerful AI
				systems to human values. One of my favorite books on the
				alignment problem is ‘Human Compatible’, by Stuart Russell.
			</p>

			<p>
				But Alignment from AI to humans isn’t enough: we need to do our
				bit too. That is, we need to have values to begin with to be
				aligned, and we need to be familiar enough with AI systems that
				we are informed, able, and well-intentioned with the powerful AI
				systems that are being released.
			</p>
			<p>
				AI Compatible is a consultancy that works on this neglected side
				of the alignment problem – the human side. We boost AI literacy,
				familiarity, and ethics: in a word, compatibility.
			</p>
			<div>
				<LetterFooter index={index} />
			</div>
		</div>
	);

	return letter;
};
