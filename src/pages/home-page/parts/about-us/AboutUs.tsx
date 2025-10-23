// src/pages/homepage/parts/AboutUS.tsx

import React from "react";

import aicompwork from "../../../../assets/aicwork.jpg";
import {
	bulb,
	bullseye,
	pencil,
} from "../../../../components/callingcard/graphics";

import { SideBarCallingCard } from "../../../../components/callingcard/CallingCard";
import { SideBarOverlapStyle } from "../../../../components/callingcard/CallingCard.styles";
import { PointedtopHexagonFeatureGrid } from "../../../../components/hexagons/hexagon-row/pointed-hexagon-row/PointedHexagonRow";
import { partners } from "../../../../components/partnership-bar/Partner";
import { PartnershipWall } from "../../../../components/partnership-bar/PartnershipWall";
import { bgwhite } from "../../../../utils/defaultColours";
import {
	BoxedImage,
	getImageEl,
	// isAndroid,
} from "../../../../utils/reactUtils";
import {
	footerStyle,
	hStyle,
	imageStyling,
	titleStyle,
} from "./AboutUs.styles";
import { IS_CHROME, volume_constant_size } from "../../../../styles";

const head = (
	<h2 style={{ fontSize: `calc(3*${volume_constant_size})` }}>About Us</h2>
);

const Foot = () => (
	<p style={{ fontSize: `calc(2*${volume_constant_size})` }}>
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
		{getImageEl(aicompwork, {
			width: "100%",
			borderRadius: "18px",
		})}
	</div>
);
const aboutUsFeatureCallouts = (renderIcon = true) => [
	[
		renderIcon && (
			<BoxedImage
				image={bulb}
				width="25%"
				aspectRatio="1"
				imageStyling={{
					...imageStyling,
					// scale: `${Math.sqrt(scale_adjustement)}`,
				}}
			/>
		),
		<div style={titleStyle}>Consultancy</div>,
		<div style={footerStyle}>
			Scoping <br /> Matching Tasks to Tools
		</div>,
	],
	[
		renderIcon && (
			<BoxedImage
				image={bullseye}
				width="25%"
				aspectRatio="1"
				imageStyling={{
					...imageStyling,
					// scale: `${1 / Math.sqrt(scale_adjustement)}`,

					// scale: `${1 / scale_adjustement}`,
				}}
			/>
		),
		<div style={titleStyle}>Training</div>,
		<div style={footerStyle}>
			Prompt Engineering
			<br />
			AI Ethics Literacy
		</div>,
	],
	[
		renderIcon && (
			<BoxedImage
				image={pencil}
				width="25%"
				aspectRatio="1"
				imageStyling={{
					...imageStyling,
					// scale: `${Math.sqrt(scale_adjustement)}`,

					// scale: `${1 / scale_adjustement}`,
				}}
				wrapperStyling={{
					position: "relative",
					top: 0,
					display: "block",
				}}
			/>
		),
		<div style={titleStyle}>Policy</div>,
		<div style={footerStyle}>
			Drafting AI
			<br />
			Policy Reviewing AI Policy
		</div>,
	],
];

const AboutUsCallingCard: React.FC = () => {
	// const scale_adj = useBrowserScale();
	return (
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
				sideBar={{ components: [<Foot />], header: head }}
				footer={
					<PointedtopHexagonFeatureGrid
						featureCallouts={aboutUsFeatureCallouts(!IS_CHROME)} // seems odd that it doesnt work on android
						useVerticalAlignment={true}
						hexagonArgs={hStyle}
						theme={-1}
					/>
				}
				styleOverrides={{
					backgroundColor: bgwhite,
					...SideBarOverlapStyle,
				}}
			/>
		</>
	);
};

export { AboutUsCallingCard };
