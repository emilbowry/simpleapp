// src/App.tsx
import React, { useEffect } from "react";

import "./styles.css";
import { Routes, Route, useLocation } from "react-router-dom";

// Utils
import { animationTagging } from "./utils/animationTagging";
import { getImageEl } from "./utils/reactUtils";
import logo from "./assets/logo.png";

import { TTitleBarLinkConfig } from "./features/titlebar/TitleBar.types";

import { CallOut } from "./components/callingcard/callout/CallOut";
import { CallingCard } from "./components/callingcard/CallingCard";

//Components
// import { TitleBar } from "./features/titlebar/TitleBar";

// Pages
import { DemoPage } from "./pages/demopage/DemoPage";
// import { FounderPage } from "./pages/founderpage/FounderPage";
import { HomePage } from "./pages/homepage/HomePage";
import { TitleBar } from "./features/titlebar/TitleBar";
import { ContactPage } from "./pages/contactpage/ContactPage";
import { TheJourneyPage } from "./pages/thejourneypage/TheJourney";

export const AppTitleBar: React.FC = () => {
	const links: TTitleBarLinkConfig = {
		home: {
			layout: { inline: true, dropdown: true },
			alias: "Home",
			path: "/",
		},
		thejourney: {
			layout: { inline: false, dropdown: true },
			alias: "The Journey",
			path: "/thejourney",
		},
		contact: {
			layout: { inline: false, dropdown: true },
			// alias auto-formats → "Contact"
			path: "/contact",
		},
		demo_page: {
			layout: { inline: true, dropdown: true },
			// alias auto-formats → "Demo Page"
			path: "/demo_page",
		},
	};

	return (
		<TitleBar
			logoSrc={logo}
			links={links}
		/>
	);
};

export const Footer: React.FC = () => {
	const componentsToRender = [
		<CallOut body={getImageEl(logo)} />,
		<CallOut
			body={<h1>The way to be 'AI-first'...</h1>}
			index={1}
		/>,
	];
	const ccElement = (
		<CallingCard
			components={componentsToRender}
			index={1}
			fullSpread={true}
		/>
	);
	return <section>{ccElement}</section>;
};

const App: React.FC = () => {
	const location = useLocation();

	useEffect(animationTagging, [location.pathname]);
	return (
		<>
			<AppTitleBar />

			<main
				className={"animated"}
				key={location.pathname}
			>
				<Routes>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/thejourney"
						element={<TheJourneyPage />}
					/>
					<Route
						path="/contact"
						element={<ContactPage />}
					/>
					<Route
						path="/demo_page"
						element={<DemoPage />}
					/>
				</Routes>
			</main>
			<Footer />
		</>
	);
};

export default App;
