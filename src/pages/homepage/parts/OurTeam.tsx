import React from "react";
import { ImageHexagon } from "../../../components/hexagons/Hexagons";
import { genericSectionStyle, Theme } from "../../../styles";
import { CallingCard } from "../../../components/callingcard/CallingCard";
import joefennelhs from "../../../assets/joeheadshot.png";
import miranda from "../../../assets/miranda.jpg";
import omar from "../../../assets/dude3.jpg";
import ben from "../../../assets/dude2.jpg";
import will from "../../../assets/dude1.jpg";
interface IPersona {
	image: string;
	name: string;
	title?: string;
	email?: string;
	body: string;
	index?: number;
}
const personaWrapperStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "30% 70%",
	height: "100%",
	width: "100%",
	justifyContent: "center",
};
export class Persona extends React.Component<IPersona> {
	render() {
		const { image, name, title, email, body, index = 2 } = this.props;
		console.log(index);
		let _index = 0;
		if (index === 0) {
			_index = 0;
		} else if (index % 2 === 0) {
			_index = 1;
		}
		let theme = Theme(_index);
		console.log(theme.backgroundColor);
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
			<div style={{}}>
				<div
					style={{
						...personaWrapperStyle,
					}}
				>
					{/* <div style={{ height: "100%" }}> */}
					<div
						style={{
							boxSizing: "border-box",
							maxHeight: "30vh",
							minHeight: 0,
							minWidth: 0,
							maxWidth: "100%",
							height: "100%",
							aspectRatio: `${2 / Math.sqrt(3)}`,
							padding: "5%",
							margin: "auto",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignContent: "center",
						}}
					>
						<ImageHexagon args={{ img: image }} />
					</div>
					{/* </div> */}
					<div
						style={{
							backgroundColor: theme.backgroundColor,
							borderRadius: "100px 0 0 100px",
							// height: "30vh",
							margin: "auto",
						}}
					>
						{textual}
					</div>
				</div>
			</div>
		);
	}
}

export const DemoPersona: React.FC = () => {
	return (
		<CallingCard
			components={[
				<Persona
					index={0}
					image={joefennelhs}
					name="Joe Fennel"
					title="Founder"
					email="joe@aicompatible.co.uk"
					body="Since 2019, Joe has been grappling with the question of 
how to adjust to a world being transformed by AI. He
spent 4 years tackling this question at the University of
Cambridge, and the last 2 years tackling it with some of
the world’s biggest businesses, including Astra Zeneca,
Vodafone, Accenture Song and more."
				/>,
			]}
			fullSpread={true}
			index={-1}
		/>
	);
};

export const OurTeam: React.FC = () => (
	<div
		style={{
			display: "grid",
			rowGap: "1%",
			width: "100%",
			padding: "auto",
			paddingBottom: "10%",
		}}
	>
		<div style={{}}>
			<DemoPersona />
		</div>
		<div>
			<CallingCard
				components={[
					<Persona
						index={1}
						image={miranda}
						name="Miranda Read"
						title=" COO & Business Development Lead"
						email="miranda@aicompatible.co.uk"
						body="Miranda has 4 years of experience client-facing roles in
Cybersecurity and Tech. Wearing multiple hats under
the umbrella of Business Development, she has been
instrumental in AI Compatibles product development,
marketing strategy, operations and growth vision."
					/>,
				]}
				index={-1}
				fullSpread={true}
			/>
		</div>
		<div>
			<CallingCard
				components={[
					<Persona
						index={2}
						image={omar}
						name="Omer Bilgin"
						body="Omer is an AI ethics, policy, and governance researcher.
His unique expertise is grounded in both his academic
training in Practical Ethics at the University of Oxford,
and his professional roles as Co-founder and Chief
Ethics & Research Officer at an AI startup called
deliberAIde and as a Technology & Data Ethics Advisor
for Suffrago. "
					/>,
				]}
				index={-1}
				fullSpread={true}
			/>
		</div>
		<div>
			<CallingCard
				components={[
					<Persona
						index={2}
						image={ben}
						name="Benjamin Raho "
						body="Benjamin is an economics graduate and EPM sales
specialist, helping UK mid-market businesses optimize
financial planning and analytics through Oracle
NetSuite’s AI-powered tools. Bridging enterprise
software and applied AI, Benjamin brings a practical,
forward-thinking approach."
					/>,
				]}
				index={-1}
				fullSpread={true}
			/>
		</div>
		<div>
			<CallingCard
				components={[
					<Persona
						index={2}
						image={will}
						name="William Swain "
						body="Will has 10 years of experience as a Data and Reporting
Analyst for Nintendo, PwC and Everfox. His expertise is
in automation so founded Surrey Data Solutions (SDS),
a specialist consultancy delivering practical, high-
impact solutions in business intelligence, data
analytics, process automation, and robotic process
automation (RPA).  "
					/>,
				]}
				index={-1}
				fullSpread={true}
			/>
		</div>
	</div>
);
