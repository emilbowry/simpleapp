// src/pages/page.tsx

import React, { useEffect } from "react";
import background from "../assets/Untitled.png";

import {
	formatComponent,
	getImageEl,
	ValidComponent,
} from "../utils/reactUtils";

export const BackgroundStyle: React.CSSProperties = {
	backgroundImage: `url(${background})`,
	backgroundRepeat: "repeat",

	backgroundSize: "cover",
	backgroundAttachment: "fixed",

	width: "100vw",
	position: "fixed",
	zIndex: -20,
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

const Footer1: React.FC<{ component: ValidComponent }> = ({ component }) => {
	return (
		<div
			style={{
				marginTop: "calc(-70vh)",
				zIndex: "-15",
			}}
		>
			<div
				style={{
					height: "70vh", // resultant height cut
				}}
			/>
			<div
				style={{
					position: "sticky",

					bottom: "0",
					height: "70vh",
				}}
			>
				<div
					style={{
						position: "relative",
						// overflow: "visible",
						isolation: "isolate",
						width: "100vw",
						height: "70vh",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",

						alignContent: "center",
					}}
				>
					{formatComponent(component)}
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
						height: "100%",
						marginTop: "50px",
						display: "flex",
						flexDirection: "column",
						...(useCursor ? { cursor: "none" } : {}),
						zIndex: "5",
					}}
				>
					{useCursor ? <CustomCursor /> : null}
					<section
						className="aos-ignore"
						style={{
							...pageStyle,
						}}
					>
						<Page />
					</section>
				</main>
				<Footer1
					component={
						<PartnershipBar
							{...demoSmallPartnershipBarData}
							index={-1}
						/>
					}
				/>
			</>
		);
	}
}
