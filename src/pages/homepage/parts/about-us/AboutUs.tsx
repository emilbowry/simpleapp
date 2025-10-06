// src/pages/homepage/parts/AboutUS.tsx

import React from "react";

import aicompwork from "../../../../assets/aicwork.jpg";
import {
	bullseye,
	pencil,
	bulb,
} from "../../../../components/callingcard/graphics";

import { NewCallingCard } from "../../../../components/callingcard/CallingCard";
import { PartnershipWall } from "../../../../components/partnershipbar/PartnershipBar";
import { BoxedImage, getImageEl } from "../../../../utils/reactUtils";
import { imageStyling, titleStyle, footerStyle } from "./AboutUs.styles";
import { VerticalHexagonFeatureGrid } from "../../../../components/hexagons/hexagonRow/VHexRow";
import { bgwhite } from "../../../../utils/defaultColours";
import { partners } from "../Partners";
export const hStyle = { /* borderColor: logo_blue,  */ colour: bgwhite };

const head = <h2>About Us</h2>;

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

const large_partners = {
	...partners,
	size: "Large",
};

const wGif = (
	<div style={{ display: "flex", maxWidth: "100%" }}>
		{/* {getImageEl(wgif, { width: "100%" })} */}
		{getImageEl(aicompwork, {
			width: "100%",
			borderRadius: "18px",
		})}
	</div>
);
const aboutUsFeatureCallouts = [
	{
		header: (
			<BoxedImage
				image={bulb}
				width="30%"
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
		themeId: -1,
	},
	{
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
				image={bullseye}
				width="30%"
				aspectRatio="1"
				imageStyling={imageStyling}
			/>
		),
		themeId: -1,
	},
	{
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
				width="30%"
				aspectRatio="1"
				imageStyling={imageStyling}
			/>
		),
		themeId: -1,
	},
];
import { PolicyAnalyzer } from "../../../dpotool/tool";
// import { _NewCallingCard } from "../../../../components/callingcard/improvedCallingCard";
// export const AboutUsCallingCard: React.FC = () => (
// 	<>
// 		<NewCallingCard
// 			components={[wGif]}
// 			header={
// 				<div
// 					style={{
// 						width: "100%",
// 						minHeight: "30vh",
// 						display: "flex",
// 						flexDirection: "column",
// 						justifyContent: "center",
// 					}}
// 				>
// 					<PartnershipWall
// 						{...(large_partners as any)}
// 						index={-1}
// 					/>
// 				</div>
// 			}
// 			title={head}
// 			footer={foot}
// 			styleOverrides={{
// 				backgroundColor: bgwhite,
// 				paddingBottom: "20%",
// 				marginBottom: "-20%",
// 				zIndex: 10,
// 			}}
// 		/>
// 		<VerticalHexagonFeatureGrid
// 			featureCallouts={aboutUsFeatureCallouts}
// 			useVerticalAlignment={true}
// 			hexagonArgs={hStyle}
// 			theme={-1}
// 		/>
// 	</>
// );

export const AboutUsCallingCard: React.FC = () => (
	<>
		<NewCallingCard
			components={[wGif]}
			header={
				<div
					style={{
						width: "100%",
						minHeight: "30vh",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					<PartnershipWall
						{...(large_partners as any)}
						index={-1}
					/>
				</div>
			}
			sideBar={{ components: [foot], header: head }}
			// title={head}
			footer={
				<VerticalHexagonFeatureGrid
					featureCallouts={aboutUsFeatureCallouts}
					useVerticalAlignment={true}
					hexagonArgs={hStyle}
					theme={-1}
				/>
			}
			styleOverrides={{
				backgroundColor: bgwhite,
				paddingBottom: "20%",
				marginBottom: "-20%",
				zIndex: 10,
			}}
		/>
	</>
);
