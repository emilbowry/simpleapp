// src/pages/page.tsx

import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import background from "../assets/Untitled.png";

import { CallingCard } from "../components/callingcard/CallingCard";
import { CallOut } from "../components/callingcard/callout/CallOut";
import { getImageEl } from "../utils/reactUtils";

export const BackgroundStyle: React.CSSProperties = {
	backgroundImage: `url(${background})`,
	backgroundRepeat: "repeat",

	backgroundSize: "cover",
	backgroundAttachment: "fixed",

	width: "100vw",
	// height: "150%",
	position: "fixed",
	zIndex: -15,
	inset: 0,
};

const DemoTiledBackground = () => {
	return <div style={BackgroundStyle}></div>;
};
import {
	demoSmallPartnershipBarData,
	demoSmallPB as DPB,
	footerSmallPB as FPB,
} from "./homepage/parts/smallPartnershipBar";
import { TestPillTitleBar as AppTitleBar } from "../components/titlebar/TitleBar";

const Footer: React.FC = () => {
	return (
		<div
			style={{
				...genericSectionStyle,
				position: "sticky",
				// // display: "flex",
				// // flexDirection: "column",
				// paddingTop: 0,
				top: 0,
				minHeight: "100vh",
			}}
		>
			<div style={{ ...genericSectionStyle, minHeight: "40vh" }}></div>
			<div
				style={{
					...genericSectionStyle,
					position: "sticky",
					// display: "flex",
					// flexDirection: "column",
					paddingTop: 0,
					// bottom: "-10vh",
					bottom: "0",

					minHeight: "40vh",
					// position: "sticky",

					// paddingTop: "0",
					// marginTop: "40vh",

					// bottom: 0,
				}}
			>
				<div
					style={{
						// ...genericSectionStyle,
						position: "relative",
						// display: "flex",
						// flexDirection: "column",
						// justifyContent: "flex-end",
					}}
				>
					<div
						style={{
							// ...genericSectionStyle,
							alignItems: "center",
						}}
					>
						<PartnershipBar
							{...demoSmallPartnershipBarData}
							index={-1}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
import CustomCursor from "../components/cursor/Cursor";
import { PartnershipBar } from "../components/partnershipbar/PartnershipBar";
import { animationTagging } from "../utils/animationTagging";
import { useLocation } from "react-router-dom";
import { genericSectionStyle } from "../styles";

const pageStyle: React.CSSProperties = {
	flexGrow: "1",
	// height: "100%",
	position: "relative",
	marginTop: "5%",
	flexDirection: "column", // Have to do both
};

// runAnimationTagging = () => {
// 	animationTagging();
// };

// componentDidMount() {
// 	this.runAnimationTagging();
// }
export class Page extends React.Component<{
	page: React.FC;
	bg?: boolean;
	useCursor?: boolean;
}> {
	render() {
		const { page: Page, bg = false, useCursor = true } = this.props;

		return (
			<>
				<AppTitleBar />
				{bg ? <DemoTiledBackground /> : null}

				<main
					key={location.pathname}
					style={{
						position: "relative",
						display: "flex",
						flexDirection: "column",
						...(useCursor ? { cursor: "none" } : {}),
					}}
				>
					{useCursor ? <CustomCursor /> : null}
					<section
						// className={"animated"}
						style={{
							...pageStyle,
						}}
					>
						<Page />
					</section>
				</main>
				<Footer />
			</>
		);
	}
}
