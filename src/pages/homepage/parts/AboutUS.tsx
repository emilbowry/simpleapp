// src/pages/homepage/parts/AboutUS.tsx

import React from "react";
import bulb from "../../../assets/bulb.svg";
import simp_bulb from "../../../assets/simplebulb.svg";
import bull from "../../../assets/bullseye.svg";
import pencil from "../../../assets/pencil.svg";

import target from "../../../assets/target.svg";
import pen from "../../../assets/pen.svg";
import { TriPartCallout } from "../../../components/callingcard/callout/CallOut";
import { NewCallingCard } from "../../../components/callingcard/newCallingCard";
import { VertHexagon } from "../../../components/hexagons/Hexagons";
import { PartnershipBar } from "../../../components/partnershipbar/PartnershipBar";
import { BoxedImage } from "../../../utils/reactUtils";
import { demoLargelPartnershipBarData } from "./smallPartnershipBar";
export const titleStyle: React.CSSProperties = {
	fontSize: "2rem",
	fontWeight: "400",
	textAlign: "center",
	margin: "1%",
};

export const footerStyle: React.CSSProperties = {
	fontSize: "1.5rem",
	textAlign: "center",
};

export const imageStyling: React.CSSProperties = {
	marginTop: "-10%",
	marginBottom: "10%",
};
const hexCallStyle: React.CSSProperties = {
	display: "flex",
	width: "100%",
	minWidth: 0,
	minHeight: 0,
	margin: "0 auto",
	marginTop: "-15%",
};

import { CSSProperties } from "react";
import { DemoClassA, DemoClassB } from "../../../test_copy";
import { Theme } from "../../../styles";
import {
	dark_midnight_green,
	midnight_green,
} from "../../../utils/defaultColours";
type d = CSSProperties;

class HexWrapCallOut extends TriPartCallout {
	static {
		this.declareStyle("wrapperStyle", {
			static_css: { ...hexCallStyle, backgroundColor: "transparent" },
		});
	}
}
const TestEl1 = () => {
	return (
		// >
		<HexWrapCallOut
			{...{
				header: (
					<BoxedImage
						image={simp_bulb}
						width="40%"
						aspectRatio="1"
						imageStyling={imageStyling}
					/>
				),

				body: <div style={titleStyle}>Consultancy</div>,
				footer: (
					<div style={footerStyle}>
						Scoping <br /> Matching Tasks to Tools
					</div>
				),
			}}
			theme_index={-1}
		/>
	);
};

const TestEl2 = (
	<HexWrapCallOut
		{...{
			body: <div style={titleStyle}>Training</div>,
			footer: (
				<div style={footerStyle}>
					Prompt Engineering
					<br />
					AI Ethics Literacy
				</div>
			),
			header: (
				<BoxedImage
					image={bull}
					width="40%"
					aspectRatio="1"
					imageStyling={imageStyling}
				/>
			),
		}}
		theme_index={-1}
	/>
);
const TestEl3 = (
	<HexWrapCallOut
		{...{
			body: <div style={titleStyle}>Policy</div>,
			footer: (
				<div style={footerStyle}>
					Drafting AI
					<br />
					Policy Reviewing AI Policy
				</div>
			),
			header: (
				<BoxedImage
					image={pencil}
					width="40%"
					aspectRatio="1"
					imageStyling={imageStyling}
				/>
			),
		}}
		theme_index={-1}
		// styleOverides={{ backgroundColor: "transparent" }}
	/>
);
const HexWapStyle: React.CSSProperties = {
	margin: "0 5%",
};
const comps = [
	<div style={HexWapStyle}>
		<VertHexagon
			args={{ borderColor: "black", colour: "transparent" }}
			element={TestEl1()}
		/>
	</div>,
	<div style={HexWapStyle}>
		<VertHexagon
			args={{ borderColor: "black", colour: "transparent" }}
			element={TestEl2}
		/>
	</div>,
	<div style={HexWapStyle}>
		<VertHexagon
			args={{ borderColor: "black", colour: "transparent" }}
			element={TestEl3}
		/>
	</div>,
];
const head = <h2>About Us</h2>;
// const comps = [head, head, head]; // This works

const foot = (
	<p>
		At AI Compatible, we believe not everyone needs to be an AI expert but
		everyone should be AI compatible. That means being alert to the
		opportunities and the risks: we help businesses navigate both, with
		tailored sessions giving you the right tools, skills, and literacy.
		<br />
		<br />
		We strive for a world where AI goes right, and people are ready for it.
	</p>
);
export const DemoNewCC: React.FC = () => (
	<NewCallingCard
		components={comps}
		header={
			<PartnershipBar
				{...demoLargelPartnershipBarData}
				index={-1}
			/>
		}
		title={head}
		footer={foot}
	/>
);
