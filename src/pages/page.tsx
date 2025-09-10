// src/pages/page.tsx

import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import background from "../assets/Untitled.png";

import { CallingCard } from "../components/callingcard/CallingCard";
import { CallOut } from "../components/callingcard/callout/CallOut";
import { getImageEl, ValidComponent } from "../utils/reactUtils";

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

const Footer1: React.FC = (FooterEl:ValidComponent) => {
	return (
		<div
			style={{
				// height: "70vh", // resultant height cut

				...genericSectionStyle,
				marginTop: "calc(-70vh)",
			}}
		>
			<div
				style={{
					writingMode: "horizontal-tb",
					...genericSectionStyle,
					height: "70vh", // resultant height cut
				}}
			/>
			<div
				style={{
					...genericSectionStyle,
					position: "sticky",
					marginTop: "0vh",
					paddingTop: "0vh",

					bottom: "0",
					// top: "0",
					height: "70vh",
				}}
			>
				<div
					style={{
						position: "relative",
						overflow: "visible",
					}}
				>
					<div
						style={{
							isolation: "isolate",
						}}
					>
						{formatComponent(FooterEl)}
					</div>
				</div>
			</div>
		</div>
	);
};
<
const Footer2: React.FC = () => {
	return (
		// <div>
		<div
			// className="no-aos"
			style={{
				...genericSectionStyle,

				position: "sticky",
				// position: "fixed",
				// isolation: "isolate",

				// position: "absolute",

				// height: "stretch",

				// paddingTop: "0",
				// height: "20vh",
				// minHeight: "20vh",
				// marginBottom: "50vh",

				// minHeight: "10vh",
				// minHeight: "50vh",
				// paddingTop: "40vh",

				marginTop: "-50vh",
				height: "70vh",
				// height: "90%",
				// width: "100%",
				// bottom: "-80vh",
				// bottom: "0",
				// width: "100px",
				// height: "100px",
				// top: "0",

				zIndex: 10,
			}}
		>
			<div
				style={{
					...genericSectionStyle,
					isolation: "isolate",
					// position: "absolute",

					position: "sticky",

					// // position: "relative",
					// // display: "flex",
					// // flexDirection: "column",
					// // justifyContent: "flex-end",
					// // height: "inherit",
					// // minHeight: "0vh",
					marginTop: "-25vh",
					// // marginTop: "20vh",
					width: "100%",
					// height: "10%",

					height: "50vh",
					// top: "0",
					bottom: "0",

					// minHeight: "100vh",
					// marginTop: "50vh",
					// margin: "auto 0",

					// minHeight: "50vh",
					// alignContent: "center",
					// alignItems: "center",

					// paddingBottom: "25vh",
				}}
			>
				<div
					style={
						{
							// ...genericSectionStyle,
							// alignItems: "center",
							// paddingTop: "10vh",
							// marginTop: "10vh",
							// top: "100%",
							// height: "100%",
							// margin: "auto 0",
							// position: "relative",
							// height: "50vh",
							// display: "flex",
							// flexDirection: "column",
							// justifyContent: "flex-end",
						}
					}
				>
					<div style={{ isolation: "isolate", height: "70vh" }}></div>
					{/* <PartnershipBar
						{...demoSmallPartnershipBarData}
						index={-1}
					/> */}
				</div>
			</div>
		</div>
		// </div>
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
						// paddingBottom: "-70vh",
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
				<Footer1 />
			</>
		);
	}
}
