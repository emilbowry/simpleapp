// src/pages/homepage/parts/AboutUS.tsx

import React from "react";
// import bulb from "../../../../assets/bulb.svg";
import bulb from "../../../../assets/simplebulb.svg";
import target from "../../../../assets/bullseye.svg";
// import target from "../../../../assets/target.svg";
import aicompwork from "../../../../assets/aicwork.jpg";

import pen from "../../../../assets/pencil.svg";
// import pen from "../../../../assets/pen.svg";

import HM from "../../../../assets/HewardMills.png";
import AZ from "../../../../assets/AZ.png";
import AS from "../../../../assets/AS.png";
import vf from "../../../../assets/vf.png";
import dct from "../../../../assets/dct.png";
import bm from "../../../../assets/BenchMark.png";
import tb from "../../../../assets/TB.png";
import wgif from "../../../../assets/WorkingMan.gif";

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
import { Partners } from "../../../../components/partnershipbar/PartnershipBar.types";
import { genericSectionStyle } from "../../../../styles";
import { VerticalHexagonGrid } from "../../../../components/hexagons/hexagonRow/VHexRow";
import { bgwhite, logo_blue } from "../../../../utils/defaultColours";
// const bgwhite = "transparent";
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

const partners = new Partners({
	partners: [
		{ image: HM },
		{ image: AZ },
		{ image: AS },
		{ image: vf },
		{ image: dct },
		{ image: bm },
		{ image: tb },
	],
	size: "Large",
});

export class HexWrapCallOut extends TriPartCallout_ALT {
	static {
		this.styler.updateStyle("wrapperStyle_style", {
			def_static_css: {
				...hexCallStyle,
				backgroundColor: "transparent",
			},
		});

		this.styler.updateStyle("wrapperStyle_style", {
			def_static_css: {
				...hexCallStyle,
				backgroundColor: "transparent",
			},
		});
	}
}

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
			image={target}
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
			image={pen}
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
		// styleOverides={{ backgroundColor: "transparent" }}
	/>
);

// const HexGridItem: React.FC<{
// 	element: ValidComponent;
// 	hexStyleOverride?: React.CSSProperties;
// }> = ({
// 	element,
// 	hexStyleOverride = { borderColor: "black", colour: "transparent" },
// }) => (
// 	<div style={HexWapStyle}>
// 		<VertHexagon
// 			args={hexStyleOverride}
// 			element={element}
// 		/>
// 	</div>
// );
// const comps = [
// 	<HexGridItem element={ConsultancyCallout} />,
// 	<HexGridItem element={TrainingCallout} />,
// 	<HexGridItem element={PolicyCallOut} />,
// ];

const wGif = (
	<div style={{ display: "flex", maxWidth: "100%" }}>
		{/* {getImageEl(wgif, { width: "100%" })} */}
		{getImageEl(aicompwork, { width: "100%" })}
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
						{...partners}
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
