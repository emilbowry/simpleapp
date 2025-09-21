// src/pages/homepage/parts/AboutUS.tsx

import React from "react";

import aicompwork from "../../../../assets/aicwork.jpg";
import {
	bullseye,
	pencil,
	bulb,
} from "../../../../components/callingcard/callout/HexCallout";

import {
	// TriPartCallout,
	TriPartCallout_ALT,
} from "../../../../components/callingcard/callout/CallOut";
import { NewCallingCard } from "../../../../components/callingcard/newCallingCard";
import { VertHexagon } from "../../../../components/hexagons/Hexagons";
import { PartnershipBar } from "../../../../components/partnershipbar/PartnershipBar";
import {
	BoxedImage,
	getImageEl,
	ValidComponent,
} from "../../../../utils/reactUtils";
import {
	hexCallStyle,
	imageStyling,
	titleStyle,
	footerStyle,
	HexWapStyle,
} from "./AboutUs.styles";
import { VerticalHexagonGrid } from "../../../../components/hexagons/hexagonRow/VHexRow";
import { bgwhite } from "../../../../utils/defaultColours";
const hStyle = { /* borderColor: logo_blue,  */ colour: bgwhite };
export const VHexGrid: React.FC = () => {
	return (
		<div
			style={{
				width: "100%",
				zIndex: 25,
			}}
		>
			<VerticalHexagonGrid
				elements={[
					<VertHexagon
						args={hStyle}
						element={ConsultancyCallout}
						opacity={1}
					/>,
					<VertHexagon
						args={hStyle}
						element={TrainingCallout}
						opacity={1}
					/>,
					<VertHexagon
						args={hStyle}
						element={PolicyCallOut}
						opacity={1}
					/>,
				]}
			/>
		</div>
	);
};
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
import { partners } from "../Partners";

const large_partners = {
	...partners,
	size: "Large",
};

export class HexWrapCallOut extends TriPartCallout_ALT {
	static {
		this.styler.updateStyle("wrapperStyle_style", {
			def_static_css: {
				...hexCallStyle,

				backgroundColor: "transparent",
			},
		});
	}
}
import pen from "../../../../assets/pencil.svg";

const callout_content_consultancy = {
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
};

const ConsultancyCallout = (
	<HexWrapCallOut
		{...callout_content_consultancy}
		themeId={-1}
	/>
);

const callout_content_training = {
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
};

const TrainingCallout = (
	<HexWrapCallOut
		{...callout_content_training}
		themeId={-1}
	/>
);

const callout_content_policy = {
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
};
const PolicyCallOut = (
	<HexWrapCallOut
		{...callout_content_policy}
		themeId={-1}
	/>
);

const wGif = (
	<div style={{ display: "flex", maxWidth: "100%" }}>
		{/* {getImageEl(wgif, { width: "100%" })} */}
		{getImageEl(aicompwork, {
			width: "100%",
			borderRadius: "18px",
		})}
	</div>
);
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
					<PartnershipBar
						{...(large_partners as any)}
						index={-1}
					/>
				</div>
			}
			title={head}
			footer={foot}
			styleOverrides={{
				backgroundColor: bgwhite,
				paddingBottom: "20%",
				marginBottom: "-20%",
				zIndex: 10,
			}}
		/>
		<VHexGrid />
	</>
);
