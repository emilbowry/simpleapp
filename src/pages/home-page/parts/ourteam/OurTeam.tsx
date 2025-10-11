import React from "react";
import { ImageHexagon } from "../../../../components/hexagons/ImageHexagon";
import { genericSectionStyle, Theme } from "../../../../styles";
import { CallingCard } from "../../../../components/callingcard/CallingCard";

import joefennelhs from "../../../../assets/joeheadshot.png";
import miranda from "../../../../assets/miranda.jpg";
import omar from "../../../../assets/dude3.jpg";
import ben from "../../../../assets/dude2.jpg";
import will from "../../../../assets/dude1.jpg";
import {
	personaWrapperStyle,
	PersonaHeadshotStyle,
	PersonaTextStyle,
	OurTeamContainerStyle,
} from "./OurTeam.styles";
import { IPersona } from "./OurTeam.types";

const teamMembers: IPersona[] = [
	{
		image: joefennelhs,
		name: "Joe Fennel",
		title: "Founder",
		email: "joe@aicompatible.co.uk",
		body: "Since 2019, Joe has been grappling with the question of  how to adjust to a world being transformed by AI. He spent 4 years tackling this question at the University of Cambridge, and the last 2 years tackling it with some of the world’s biggest businesses, including Astra Zeneca, Vodafone, Accenture Song and more.",
	},
	{
		image: miranda,
		name: "Miranda Read",
		title: " COO & Business Development Lead",
		email: "miranda@aicompatible.co.uk",
		body: "Miranda has 4 years of experience client-facing roles in Cybersecurity and Tech. Wearing multiple hats under the umbrella of Business Development, she has been instrumental in AI Compatibles product development, marketing strategy, operations and growth vision.",
	},
	{
		image: omar,
		name: "Omer Bilgin",
		body: "Omer is an AI ethics, policy, and governance researcher. His unique expertise is grounded in both his academic training in Practical Ethics at the University of Oxford, and his professional roles as Co-founder and Chief Ethics & Research Officer at an AI startup called deliberAIde and as a Technology & Data Ethics Advisor for Suffrago.",
	},
	{
		image: ben,
		name: "Benjamin Raho ",
		body: "Benjamin is an economics graduate and EPM sales specialist, helping UK mid-market businesses optimize financial planning and analytics through Oracle NetSuite’s AI-powered tools. Bridging enterprise software and applied AI, Benjamin brings a practical, forward-thinking approach",
	},
	{
		image: will,
		name: "William Swain ",
		body: "Will has 10 years of experience as a Data and Reporting Analyst for Nintendo, PwC and Everfox. His expertise is in automation so founded Surrey Data Solutions (SDS), a specialist consultancy delivering practical, high- impact solutions in business intelligence, data analytics, process automation, and robotic process automation (RPA).",
	},
];

class Persona extends React.Component<IPersona> {
	render() {
		const { image, name, title, email, body, index = 2 } = this.props;
		let _index = 0;
		if (index === 0) {
			_index = 0;
		} else if (index % 2 === 0) {
			_index = 1;
		}
		let theme = Theme(_index);
		const header = (
			<div style={{ color: theme.tertiaryColor, fontSize: "2.5rem" }}>
				<h3>
					<span style={{ fontWeight: "bold" }}>{name}</span>
					<span style={{ fontWeight: "normal" }}>
						{title ? ` - ${title}` : null}
					</span>
				</h3>
				{email ? (
					<div style={{ color: theme.primaryColor }}>{email}</div>
				) : (
					<div></div>
				)}
			</div>
		);
		const descrition = (
			<div style={{ color: theme.secondaryColor, fontSize: "2rem" }}>
				<p>{body}</p>
			</div>
		);
		const textual = (
			<div style={{ padding: "2rem ", margin: "auto 0" }}>
				{header}
				{descrition}
			</div>
		);
		return (
			<div>
				<div style={personaWrapperStyle}>
					<div style={PersonaHeadshotStyle}>
						<ImageHexagon img={image} />
					</div>
					<div
						style={{
							backgroundColor: theme.backgroundColor,
							...PersonaTextStyle,
						}}
					>
						{textual}
					</div>
				</div>
			</div>
		);
	}
}

const OurTeam: React.FC = () => (
	<div style={OurTeamContainerStyle}>
		{teamMembers.map((member, arrayIndex) => {
			const personaIndex = member.title ? 1 : 2;

			return (
				<div key={arrayIndex}>
					<CallingCard
						components={[
							<Persona
								index={personaIndex}
								image={member.image}
								name={member.name}
								title={member.title}
								email={member.email}
								body={member.body}
							/>,
						]}
						index={-1}
						fullSpread={true}
					/>
				</div>
			);
		})}
	</div>
);

export { OurTeam };
