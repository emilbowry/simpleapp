// src/pages/homepage/parts/AboutUS.tsx

import React from "react";
// import bulb from "../../../../assets/bulb.svg";
import simp_bulb from "../../../../assets/simplebulb.svg";
import bull from "../../../../assets/bullseye.svg";
import pencil from "../../../../assets/pencil.svg";
import HM from "../../../../assets/HewardMills.png";
import AZ from "../../../../assets/AZ.png";
import AS from "../../../../assets/AS.png";
import vf from "../../../../assets/vf.png";
import dct from "../../../../assets/dct.png";
import bm from "../../../../assets/BenchMark.png";
import tb from "../../../../assets/TB.png";
import {
	TriPartCallout,
	TriPartCallout_ALT,
} from "../../../../components/callingcard/callout/CallOut";
import { NewCallingCard } from "../../../../components/callingcard/newCallingCard";
import { VertHexagon } from "../../../../components/hexagons/Hexagons";
import { PartnershipBar } from "../../../../components/partnershipbar/PartnershipBar";
import { BoxedImage, ValidComponent } from "../../../../utils/reactUtils";
import {
	hexCallStyle,
	imageStyling,
	titleStyle,
	footerStyle,
	HexWapStyle,
} from "./AboutUs.styles";
import { Partners } from "../../../../components/partnershipbar/PartnershipBar.types";

class HexWrapCallOut extends TriPartCallout {
	static {
		this.declareStyle("wrapperStyle", {
			styleOverides: { ...hexCallStyle, backgroundColor: "transparent" },
		});
	}
}

const callout_content_consultancy = {
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
};

const ConsultancyCallout = (
	<HexWrapCallOut
		{...callout_content_consultancy}
		theme_index={-1}
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
			image={bull}
			width="40%"
			aspectRatio="1"
			imageStyling={imageStyling}
		/>
	),
};

const TrainingCallout = (
	<HexWrapCallOut
		{...callout_content_training}
		theme_index={-1}
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
			width="40%"
			aspectRatio="1"
			imageStyling={imageStyling}
		/>
	),
};
const PolicyCallOut = (
	<HexWrapCallOut
		{...callout_content_policy}
		theme_index={-1}
		// styleOverides={{ backgroundColor: "transparent" }}
	/>
);

const HexGridItem: React.FC<{
	element: ValidComponent;
	hexStyleOverride?: React.CSSProperties;
}> = ({
	element,
	hexStyleOverride = { borderColor: "black", colour: "transparent" },
}) => (
	<div style={HexWapStyle}>
		<VertHexagon
			args={hexStyleOverride}
			element={element}
		/>
	</div>
);
const comps = [
	<HexGridItem element={ConsultancyCallout} />,
	<HexGridItem element={TrainingCallout} />,
	<HexGridItem element={PolicyCallOut} />,
];
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
export const AboutUsCallingCard: React.FC = () => (
	<NewCallingCard
		components={comps}
		header={
			<PartnershipBar
				{...partners}
				index={-1}
			/>
		}
		title={head}
		footer={foot}
	/>
);

export class HexWrapCallOut_ALT extends TriPartCallout_ALT {
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

const callout_content_consultancy_alt = {
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
};

const ConsultancyCallout_alt = (
	<HexWrapCallOut_ALT
		{...callout_content_consultancy_alt}
		themeId={-1}
	/>
);

const callout_content_training_alt = {
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
};

const TrainingCallout_alt = (
	<HexWrapCallOut_ALT
		{...callout_content_training_alt}
		themeId={-1}
	/>
);

const callout_content_policy_alt = {
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
};
const PolicyCallOut_alt = (
	<HexWrapCallOut_ALT
		{...callout_content_policy_alt}
		themeId={-1}
		// styleOverides={{ backgroundColor: "transparent" }}
	/>
);

const HexGridItem_alt: React.FC<{
	element: ValidComponent;
	hexStyleOverride?: React.CSSProperties;
}> = ({
	element,
	hexStyleOverride = { borderColor: "black", colour: "transparent" },
}) => (
	<div style={HexWapStyle}>
		<VertHexagon
			args={hexStyleOverride}
			element={element}
		/>
	</div>
);
const comps_alt = [
	<HexGridItem_alt element={ConsultancyCallout_alt} />,
	<HexGridItem_alt element={TrainingCallout_alt} />,
	<HexGridItem_alt element={PolicyCallOut_alt} />,
];

export const AboutUsCallingCard_alt: React.FC = () => (
	<NewCallingCard
		components={comps_alt}
		header={
			<PartnershipBar
				{...partners}
				index={-1}
			/>
		}
		title={head}
		footer={foot}
	/>
);
