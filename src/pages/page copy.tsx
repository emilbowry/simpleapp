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

const FooterSections: React.FC = () => {
	return (
		<>
			<h3>The way to be 'AI-first'...</h3>
			<h3>
				<a
					href={"https://www.linkedin.com/company/ai-compatible-ltd"}
					style={{ color: "inherit", textDecoration: "none" }}
				>
					Follow us on LinkedIn
				</a>
			</h3>
		</>
	);
};
// footerSmallPB

// const Footer: React.FC = () => {
// 	return (
// 		<div>
// 			<div
// 				// className="no-aos"
// 				style={{
// 					...genericSectionStyle,

// 					position: "sticky",
// 					// position: "fixed",

// 					// paddingTop: "0",
// 					// height: "20vh",
// 					// minHeight: "20vh",
// 					// marginTop: "100vh",

// 					// minHeight: "10vh",
// 					// minHeight: "50vh",
// 					// paddingTop: "40vh",

// 					// marginBottom: "-50vh",
// 					// minHeight: "50vh",

// 					bottom: 0,
// 					left: "10%",
// 					right: "10%",
// 					zIndex: -10,
// 				}}
// 			>
// 				{/* footer .site-footer {} */}
// 				<div
// 					style={{
// 						...genericSectionStyle,
// 						position: "relative",
// 						display: "flex",
// 						flexDirection: "column",
// 						justifyContent: "flex-end",
// 						height: "inherit",
// 						// minHeight: "0vh",
// 						// marginTop: "10vh",
// 						// marginTop: "20vh",

// 						// height: "50vh",
// 						// minHeight: "100vh",
// 						// marginTop: "50vh",
// 						// margin: "auto 0",

// 						// minHeight: "50vh",
// 						// alignContent: "center",
// 						// alignItems: "center",

// 						// paddingBottom: "25vh",
// 					}}
// 				>
// 					<div
// 						style={{
// 							...genericSectionStyle,
// 							alignItems: "center",
// 							// paddingTop: "10vh",
// 							// marginTop: "10vh",

// 							// top: "100%",
// 							// height: "100%",

// 							// margin: "auto 0",
// 							position: "relative",
// 							// height: "50vh",

// 							// display: "flex",
// 							// flexDirection: "column",
// 							// justifyContent: "flex-end",
// 						}}
// 					>
// 						<PartnershipBar
// 							{...demoSmallPartnershipBarData}
// 							index={-1}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

const Footer: React.FC = () => {
	return (
		<div style={{ ...genericSectionStyle }}>
			<div style={{ ...genericSectionStyle }}></div>
			<div
				// className="no-aos"
				style={{
					...genericSectionStyle,

					position: "sticky",
					// position: "fixed",

					paddingTop: "0",
					// height: "20vh",
					// minHeight: "20vh",
					marginTop: "40vh",

					// minHeight: "10vh",
					// minHeight: "70vh",
					// paddingTop: "40vh",

					// marginBottom: "-50vh",
					// minHeight: "50vh",

					bottom: 0,
					left: "10%",
					right: "10%",
					zIndex: -10,
				}}
			>
				{/* footer .site-footer {} */}
				<div
					style={{
						...genericSectionStyle,
						position: "relative",
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
						height: "inherit",
						// minHeight: "0vh",
						// marginTop: "10vh",
						// marginTop: "20vh",

						// height: "50vh",
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
						style={{
							...genericSectionStyle,
							alignItems: "center",
							// paddingTop: "10vh",
							// marginTop: "10vh",

							// top: "100%",
							// height: "100%",

							// margin: "auto 0",
							position: "relative",
							// height: "50vh",

							// display: "flex",
							// flexDirection: "column",
							// justifyContent: "flex-end",
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
		const { page: Page, bg = false, useCursor = false } = this.props;

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
						// cursor: "none",
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
