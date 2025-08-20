// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TitleBar } from "./features/titlebar/TitleBar";
import { DemoPage } from "./pages/demopage/DemoPage";
import { Footer } from "./features/footer/Footer";
// import { FounderPage } from "./pages/founderpage/FounderPage"; // <-- Import the new page
import gstyles from "./GlobalStyles.module.css";
import "./styles.css"; // add this near the top, once
import { HomePage } from "./pages/homepage/HomePage";
// import { ContactPage } from "./pages/contactpage/ContactPage";
import { animationTagging } from "./utils/animationTagging";
import { TheJourneyPage } from "./pages/thejourneypage/TheJourney";
import { ContactPage } from "./pages/contactpage/ContactPage";

import logo from "./assets/logo.png";
import { ITitleBarLinkConfig } from "./features/titlebar/TitleBar.types";

export const AppTitleBar: React.FC = () => {
	const links: Record<string, ITitleBarLinkConfig> = {
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

const App: React.FC = () => {
	const location = useLocation();

	useEffect(animationTagging, [location.pathname]);
	return (
		<>
			<AppTitleBar />

			{/* <main
				className={gstyles.animated}
				key={location.pathname}
			> */}
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
