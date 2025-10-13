// src/App.tsx
import React, { useEffect } from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import "./styles.css";

import { animationTagging } from "./utils/animationTagging";

import { ContactPage } from "./pages/contact-page/ContactPage";
import { ToolPage } from "./pages/dpo-tool/tool";
import { HomePage } from "./pages/home-page/HomePage";
import { OurServices } from "./pages/our-services-page/OurServices";
import { TheJourneyPage } from "./pages/the-journey-page/TheJourney";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null; // doesn’t render anything
}
const App: React.FC = () => {
	const location = useLocation();

	useEffect(animationTagging, [location.pathname]);
	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route
					path="/"
					element={HomePage}
				/>
				<Route
					path="/thejourney"
					element={TheJourneyPage}
				/>
				<Route
					path="/ourservices"
					element={OurServices}
				/>
				<Route
					path="/contact"
					element={ContactPage}
				/>
				<Route
					path="/dpotool"
					element={ToolPage}
				/>
			</Routes>
		</>
	);
};

export default App;
