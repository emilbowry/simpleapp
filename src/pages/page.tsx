// src/pages/page.tsx

import React from "react";
// import { AppTitleBar, Footer } from "../App";
import { DemoTiledBackground } from "../components/background/Background";
// import { TTitleBarLinkConfig } from "../components/titlebar/TitleBar.types";
import { TitleBar } from "../components/titlebar/TitleBar";
import logo from "../assets/logo.png";
import { CallingCard } from "../components/callingcard/CallingCard";
import { CallOut } from "../components/callingcard/callout/CallOut";
import { getImageEl } from "../utils/reactUtils";

// const AppTitleBar: React.FC = () => {
// 	const links: TTitleBarLinkConfig = {
// 		home: {
// 			layout: { inline: true, dropdown: true },
// 		},
// 		thejourney: {
// 			layout: { inline: false, dropdown: true },
// 			alias: "The Journey",
// 		},
// 		contact: {
// 			layout: { inline: false, dropdown: true },
// 		},
// 		demo_page: {
// 			layout: { inline: true, dropdown: true },
// 		},
// 	};

// 	return (
// 		<TitleBar
// 			logoSrc={logo}
// 			links={links}
// 		/>
// 	);
// };
import { demoSmallPB as DPB } from "./homepage/parts/smallPartnershipBar";
import { TestPillTitleBar as AppTitleBar } from "../components/titlebar/TitleBar";
const Footer: React.FC = () => {
	const componentsToRender = [
		<CallOut body={getImageEl(logo)} />,
		<CallOut
			body={<h1>The way to be 'AI-first'...</h1>}
			index={1}
		/>,
	];
	const ccElement = (
		<CallingCard
			title={<DPB index={-1} />}
			components={componentsToRender}
			index={1}
			fullSpread={true}
		/>
	);
	return <section>{ccElement}</section>;
};
export class Page extends React.Component<{ page: React.FC; bg?: boolean }> {
	render() {
		const { page: Page, bg = false } = this.props;

		return (
			<main
				className={"animated"}
				key={location.pathname}
			>
				{bg ? <DemoTiledBackground /> : null}
				<AppTitleBar />
				<Page />
				<Footer />
			</main>
		);
	}
}
