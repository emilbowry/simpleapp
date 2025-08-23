// src/App.tsx
import React, { useEffect } from "react";

import "./styles.css";
import { Routes, Route, useLocation } from "react-router-dom";

// ==================== Utils ==================== //
import { animationTagging } from "./utils/animationTagging";

// ==================== Pages ==================== //

import { DemoPage } from "./pages/demopage/DemoPage";
// import { FounderPage } from "./pages/founderpage/FounderPage";
import { HomePage } from "./pages/homepage/HomePage";
import { TheJourneyPage } from "./pages/thejourneypage/TheJourney";
import { ContactPage } from "./pages/contactpage/ContactPage";

const App: React.FC = () => {
	const location = useLocation();

	useEffect(animationTagging, [location.pathname]);
	return (
		<>
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
					path="/contact"
					element={ContactPage}
				/>
				<Route
					path="/demo_page"
					element={DemoPage}
				/>
				{/* </Route> */}
			</Routes>
			{/* </main> */}
		</>
	);
};

export default App;
