// src/pages/homepage/parts/AboutUS.tsx

import React from "react";

import aicompwork from "../../../../assets/aicwork.jpg";
import {
	bullseye,
	pencil,
	bulb,
} from "../../../../components/callingcard/graphics";

import { SideBarCallingCard } from "../../../../components/callingcard/CallingCard";
import { PartnershipWall } from "../../../../components/partnership-bar/PartnershipWall";
import { BoxedImage, getImageEl } from "../../../../utils/reactUtils";
import { imageStyling, titleStyle, footerStyle } from "./AboutUs.styles";
import { PointedtopHexagonFeatureGrid } from "../../../../components/hexagons/hexagon-row/pointed-hexagon-row/PointedHexagonRow";
import { bgwhite } from "../../../../utils/defaultColours";
import { partners } from "../Partners";
export const hStyle = { colour: bgwhite };

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
	[
		<BoxedImage
			image={bulb}
			width="30%"
			aspectRatio="1"
			imageStyling={imageStyling}
		/>,
		<div style={titleStyle}>Consultancy</div>,
		<div style={footerStyle}>
			Scoping <br /> Matching Tasks to Tools
		</div>,
	],
	[
		<BoxedImage
			image={bullseye}
			width="30%"
			aspectRatio="1"
			imageStyling={imageStyling}
		/>,
		<div style={titleStyle}>Training</div>,
		<div style={footerStyle}>
			Prompt Engineering
			<br />
			AI Ethics Literacy
		</div>,
	],
	[
		<BoxedImage
			image={pencil}
			width="30%"
			aspectRatio="1"
			imageStyling={imageStyling}
			wrapperStyling={{
				position: "relative",
				top: 0,
				display: "block",
			}}
		/>,
		<div style={titleStyle}>Policy</div>,
		<div style={footerStyle}>
			Drafting AI
			<br />
			Policy Reviewing AI Policy
		</div>,
		// <div style={{ ...genericSectionStyle }}>
		// 	<BoxedImage
		// 		image={pencil}
		// 		width="20%"
		// 		aspectRatio="1"
		// 		imageStyling={imageStyling}
		// 		wrapperStyling={{
		// 			position: "relative",
		// 			top: 0,
		// 			display: "block",
		// 		}}
		// 	/>
		// 	<div style={titleStyle}>Policy</div>
		// 	<div style={footerStyle}>
		// 		Drafting AI
		// 		<br />
		// 		Policy Reviewing AI Policy
		// 	</div>
		// </div>,
	],
];
export const AboutUsCallingCard: React.FC = () => (
	<>
		<SideBarCallingCard
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
				<PointedtopHexagonFeatureGrid
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
