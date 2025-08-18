// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TitleBar } from "./components/titlebar/TitleBar";
import { DemoPage } from "./pages/demopage/DemoPage";
// import { Footer } from "./components/footer/Footer";
// import { FounderPage } from "./pages/founderpage/FounderPage"; // <-- Import the new page
import styles from "./GlobalStyles.module.css";
import { HomePage } from "./pages/homepage/HomePage";
// import { ContactPage } from "./pages/contactpage/ContactPage";
import { animationTagging } from "./utils/animationTagging";

import logo from "./assets/logo.png";
import { CallOut } from "./components/callingcard/CallOut";
import { getImageEl } from "./utils/reactUtils";
import { CallingCard } from "./components/callingcard/CallingCard";

const FooterBody: React.FC = () => <h1>The way to be 'AI-first'...</h1>;
export const Footer: React.FC = () => {
	const componentsToRender = [
		<CallOut data={getImageEl(logo)} />,
		<CallOut data={FooterBody} />,
	];
	const ccElement = (
		<CallingCard
			components={componentsToRender}
			index={1}
			fullSpread={true}
		/>
	);
	return <section className={styles.footer}>{ccElement}</section>;
};

const App: React.FC = () => {
	const location = useLocation();

	useEffect(animationTagging, [location.pathname]);
	return (
		<>
			<TitleBar />

			<main className={styles.animated} key={location.pathname}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/founder" element={<></>} />
					<Route path="/contn  act" element={<></>} />
					<Route path="/demo_page" element={<DemoPage />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
};

export default App;
