// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TitleBar } from "./components/titlebar/TitleBar";
import { DemoPage } from "./pages/demopage/DemoPage";
import { Footer } from "./components/footer/Footer";
import { FounderPage } from "./pages/founderpage/FounderPage"; // <-- Import the new page
import styles from "./GlobalStyles.module.css";
import { HomePage } from "./pages/homepage/HomePage";
import { ContactPage } from "./pages/contactpage/ContactPage";
import { animationTagging } from "./utils/animationTagging";

const App: React.FC = () => {
	const location = useLocation();

	useEffect(animationTagging, [location.pathname]);
	return (
		<>
			<TitleBar />

			<main className={styles.animated} key={location.pathname}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/founder" element={<FounderPage />} />
					<Route path="/contn  act" element={<ContactPage />} />
					<Route path="/demo_page" element={<DemoPage />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
};

export default App;
