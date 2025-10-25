// src/App.tsx
import React, { lazy, Suspense, useState } from "react";

import { Route, Routes } from "react-router-dom";
import logo from "./assets/logoshape.svg";
import { useAnimationTagging } from "./hooks/AnimationTagging";
import "./styles.css";

const ContactPage = lazy(() => import("./pages/contact-page/ContactPage"));
const ToolPage = lazy(() => import("./pages/dpo-tool/tool"));
const HomePage = lazy(() => import("./pages/home-page/HomePage"));
const OurServices = lazy(() => import("./pages/our-services-page/OurServices"));
const TheJourneyPage = lazy(
	() => import("./pages/the-journey-page/TheJourney")
);
const DemoPage = lazy(() => import("./pages/demo/DemoPage"));

import { CursorContext, CustomCursor } from "./components/cursor/Cursor";
import { useScrollToTop } from "./hooks/ScrollToTop";
import { dark_midnight_green, lighter_logo_blue } from "./utils/defaultColours";
const LoadingFC = () => (
	<>
		<div
			style={{
				height: "100vh",
				width: "100vw",
				padding: "5%",
				color: lighter_logo_blue,
				background: dark_midnight_green,
			}}
		>
			<img src={logo} />
		</div>
	</>
);

const App: React.FC = () => {
	const [hasCustomCursor, setHasCustomCursor] = useState(true);
	const [global_position, setGlobalMousePosition] = useState({ x: 0, y: 0 }); // to track between navlinks
	useAnimationTagging();
	useScrollToTop();
	return (
		<>
			<Suspense fallback={<LoadingFC />}>
				<CursorContext
					value={{
						hasCustomCursor,
						setHasCustomCursor,
						global_position,
						setGlobalMousePosition,
					}}
				>
					<CustomCursor />
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
				</CursorContext>
			</Suspense>
		</>
	);
};

export default App;
