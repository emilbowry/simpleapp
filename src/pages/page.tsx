// src/pages/page.tsx

import React from "react";
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
	height: "100vh",
	position: "fixed",
	zIndex: -1,
	inset: 0,
};

const DemoTiledBackground = () => {
	return <div style={BackgroundStyle}></div>;
};
import {
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

const Footer: React.FC = () => {
	const componentsToRender = [
		<CallOut
			body={<FooterSections />}
			index={-1}
		/>,
		<CallOut body={getImageEl(logo)} />,
	];
	const ccElement = (
		<CallingCard
			title={<FPB />}
			components={componentsToRender}
			index={0}
			fullSpread={true}
		/>
	);
	return <section>{ccElement}</section>;
};
import CustomCursor from "../components/cursor/Cursor";

const pageStyle: React.CSSProperties = {
	flexGrow: "1",
	height: "100%",
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
				<main
					className={"animated"}
					key={location.pathname}
					style={{
						display: "flex",
						flexDirection: "column", // Have to do both

						...(useCursor ? { cursor: "none" } : {}),
					}}
				>
					{useCursor ? <CustomCursor /> : null}
					{bg ? <DemoTiledBackground /> : null}
					<AppTitleBar />
					<section style={pageStyle}>
						<Page />
					</section>
					{/* <Footer /> */}
				</main>
			</>
		);
	}
}
