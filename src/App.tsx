// src/App.tsx
import React, { useEffect, lazy, Suspense } from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import "./styles.css";
import logo from "./assets/logoshape.svg";
import { animationTagging } from "./utils/animationTagging";
// import { LogoHexagon } from "./components/hexagons/LogoHexagon";

// import { ContactPage } from "./pages/contact-page/ContactPage";
// import { ToolPage } from "./pages/dpo-tool/tool";
// import { HomePage } from "./pages/home-page/HomePage";
// import { OurServices } from "./pages/our-services-page/OurServices";
// import { TheJourneyPage } from "./pages/the-journey-page/TheJourney";
// import { DemoPage } from "./pages/demo/DemoPage";
const ContactPage = lazy(() => import("./pages/contact-page/ContactPage"));
const ToolPage = lazy(() => import("./pages/dpo-tool/tool"));
const HomePage = lazy(() => import("./pages/home-page/HomePage"));
const OurServices = lazy(() => import("./pages/our-services-page/OurServices"));
const TheJourneyPage = lazy(
	() => import("./pages/the-journey-page/TheJourney")
);
const DemoPage = lazy(() => import("./pages/demo/DemoPage"));
function ScrollToTop() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [useLocation()]);

	return null; // doesn’t render anything
}
import { dark_midnight_green, lighter_logo_blue } from "./utils/defaultColours";
// const stylestr =
const LoadingFC = () => (
	<>
		<div
			// id="loading"
			style={{
				height: "100vh",
				width: "100vw",
				// display: "flex",
				// alignItems: "center",
				// justifyContent: "center",
				// flexDirection: "column",
				// position: "absolute",
				padding: "5%",
				// top: 0,
				// left: -100,
				color: lighter_logo_blue,
				background: dark_midnight_green,
			}}
		>
			{/* <h1 style={{ padding: "20px" }}>AI Compatible</h1> */}
			{/* <BoxedImage
				image={logo}
				width="400px"
				aspectRatio={`${Math.sqrt(3) / 2}`}
			/> */}
			<img src={logo} />
		</div>
	</>
);
const App: React.FC = () => {
	useEffect(animationTagging, [useLocation().pathname]);
	return (
		<>
			<ScrollToTop />

			<Suspense fallback={<LoadingFC />}>
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
						path="/ourservices"
						element={<OurServices />}
					/>
					<Route
						path="/contact"
						element={<ContactPage />}
					/>
					<Route
						path="/dpotool"
						element={<ToolPage />}
					/>
					<Route
						path="/demo_and_testing"
						element={<DemoPage />}
					/>
				</Routes>
			</Suspense>
		</>
	);
};

export default App;
