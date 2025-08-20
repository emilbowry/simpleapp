// src/pages/homepage/parts/OurTeam.tsx

import React from "react";
import { ImageHexagon } from "../../../components/hexagons/Hexagons";
import { Theme } from "../../../styles";
import { CallingCard } from "../../../components/callingcard/CallingCard";
import testimage from "../../../assets/joeheadshot.png";
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
	gridTemplateColumns: "30% 60%",
	// alignContent: "center",
	justifyContent: "center",
};
export class Persona extends React.Component<IPersona> {
	render() {
		const { image, name, title, email, body, index = 0 } = this.props;
		let _index = 0;
		if (index === -1) {
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
				{email ? <div>{email}</div> : <div></div>}
			</div>
		);
		const descrition = (
			<div style={{ color: theme.secondaryColor, fontSize: "2rem" }}>
				<p>{body}</p>
			</div>
		);
		const textual = (
			<div style={{ padding: "2rem" }}>
				{header}
				{descrition}
			</div>
		);

		return (
			<div style={personaWrapperStyle}>
				<div>
					<ImageHexagon args={{ img: image }} />
				</div>
				<div
					style={{
						backgroundColor: theme.backgroundColor,
						borderRadius: "100px 0 0 100px",
					}}
				>
					{textual}
				</div>
			</div>
		);
	}
}

export const demoPersona: React.FC = () => {
	return (
		<CallingCard
			components={[
				<Persona
					index={0}
					image={testimage}
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
			index={-1}
		/>
	);
};
