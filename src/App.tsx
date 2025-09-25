// src/App.tsx
import React, { useEffect } from "react";

import "./styles.css";
import { Routes, Route, useLocation } from "react-router-dom";

import { animationTagging } from "./utils/animationTagging";

import { HomePage } from "./pages/homepage/HomePage";
import { TheJourneyPage } from "./pages/thejourneypage/TheJourney";
import { ContactPage } from "./pages/contactpage/ContactPage";
import { OurServices } from "./pages/ourservices/OurServices";

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
					path="/ourservices"
					element={OurServices}
				/>
				<Route
					path="/contact"
					element={ContactPage}
				/>
			</Routes>
		</>
	);
};

export default App;
