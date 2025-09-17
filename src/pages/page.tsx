// src/pages/page.tsx

import React, { useEffect } from "react";
import background from "../assets/Untitled.png";

import { useState, useCallback } from "react";
import { genericSectionStyle } from "../styles"; //used for debugging adds a transparent red background and border
import logo from "../assets/logo.png";
import CustomCursor from "../components/cursor/Cursor";

const ScrollVisibilityDependent: React.FC<{
	element: ValidComponent;
	percentage?: number;
	borders?: [number, number];
	styling?: React.CSSProperties;
}> = ({ element, styling = {}, borders = undefined }) => {
	const rows = 3;
	if (borders === undefined) {
		return <div style={styling}>{element as any}</div>;
	}
	let _percentage = 0;
	if (borders) {
		_percentage = (borders[0] + borders[1]) / 2;
		// console.log(_percentage);
	}
	const footerVH = 0.7;
	const [isVisible, setIsVisible] = useState(false);
	const [opacity, setOpacity] = useState(0);

	const viewportHeight = window.innerHeight;
	const visability_mid = _percentage * viewportHeight * footerVH;
	const visability_top = borders[0] * viewportHeight * footerVH;
	const visability_bottom = borders[1] * viewportHeight * footerVH;

	const handleScroll = useCallback(() => {
		const currentScrollY = window.scrollY;
		const docHeight = document.documentElement.scrollHeight;
		const offset = docHeight - (1 + footerVH) * viewportHeight;
		const minVis = offset + visability_bottom;
		const maxVis = offset + visability_top;

		const mid_Vis = offset + visability_mid;
		let _opacity = 0;
		if (currentScrollY < minVis) {
			_opacity = 0;
		} else if (currentScrollY >= maxVis) {
			_opacity = 1;
		} else {
			_opacity = (currentScrollY - minVis) / (maxVis - minVis);
		}
		// _opacity = (currentScrollY - maxVis) / (maxVis - minVis);

		// console.log(`${minVis},${maxVis}, ${currentScrollY}, ${_opacity}`);
		// if (currentScrollY < minVis) {
		// 	setOpacity(0);
		// }
		// if (currentScrollY >= minVis) {
		// 	setOpacity(opacity);
		// }
		// if (currentScrollY >= maxVis) {
		// setOpacity(_opacity);
		// }
		setOpacity(_opacity);
		// console.log(opacity);

		setIsVisible(currentScrollY >= minVis);
	}, []);
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);
	const _styling: React.CSSProperties = {
		...styling,
		visibility: isVisible ? "visible" : "hidden", // Control visibility
		opacity: opacity, // Optional: add a fade effect
		// transition: "opacity 0.3s ease-in-out", // Optional: smooth transition
		filter: `blur(${(1 - opacity) ** 2 * 16}px)`, // Optional: smooth transition
	};
	return <div style={_styling}>{formatComponent(element as any)}</div>;
};

import {
	BoxedImage,
	formatComponent,
	// getImageEl,
	ValidComponent,
	// wrapLink,
} from "../utils/reactUtils";

export const BackgroundStyle: React.CSSProperties = {
	backgroundImage: `url(${background})`,
	backgroundRepeat: "repeat",

	backgroundSize: "cover",
	backgroundAttachment: "fixed",

	width: "100vw",
	position: "fixed",
	zIndex: -20,
	inset: 0,
};

const DemoTiledBackground = () => {
	return <div style={BackgroundStyle}></div>;
};
import { demoSmallPartnershipBarData } from "./homepage/parts/smallPartnershipBar";
import { TestPillTitleBar as AppTitleBar } from "../components/titlebar/TitleBar";

const Footer: React.FC<{
	component: ValidComponent;
	styling?: React.CSSProperties;
}> = ({ component, styling = {} }) => {
	return (
		<div
			style={{
				marginTop: "calc(-70vh - 60px)",
				zIndex: "-15",
			}}
		>
			<div
				style={{
					height: "70vh", // resultant height cut
					width: "100vw",
				}}
			/>
			<div
				style={{
					// ...genericSectionStyle,

					position: "sticky",
					width: "100vw",

					bottom: "0",
					height: "70vh",
				}}
			>
				<div
					style={{
						position: "relative",
						isolation: "isolate",
						width: "100vw",
						height: "70vh",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",

						alignContent: "center",
					}}
				>
					{formatComponent(component)}
				</div>
			</div>
		</div>
	);
};

import { PartnershipBar } from "../components/partnershipbar/PartnershipBar";

const pageStyle: React.CSSProperties = {
	flexGrow: "1",
	position: "relative",
	marginTop: "5%",
	flexDirection: "column", // Have to do both
};

export class Page extends React.Component<{
	page: React.FC;
	bg?: boolean;
	useCursor?: boolean;
}> {
	render() {
		const { page: Page, bg = false, useCursor = true } = this.props;

		return (
			<>
				<AppTitleBar />
				{bg ? <DemoTiledBackground /> : null}

				<main
					key={location.pathname}
					style={{
						position: "relative",
						height: "100%",
						marginTop: "60px", //title bar offset
						display: "flex",
						flexDirection: "column",
						zIndex: "5",
					}}
				>
					{useCursor ? <CustomCursor /> : null}
					<section
						className="aos-ignore"
						style={{
							...pageStyle,
						}}
					>
						<Page />
					</section>
				</main>
				<Footer component={footer_comp} />
			</>
		);
	}
}
const linkedin = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		height="100%"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
		<rect
			width="4"
			height="12"
			x="2"
			y="9"
		/>
		<circle
			cx="4"
			cy="4"
			r="2"
		/>
	</svg>
);
const centerable: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",

	margin: "auto 0",
};

const Quote1 = (
	<div>
		<div style={{ fontStyle: "italic" }}>
			<h2>
				{" "}
				"The future has already arrived. It's just not evenly
				distributed yet."
			</h2>
		</div>
		<div> - William Gibson</div>
	</div>
);
const Quote2 = (
	<div>
		<div style={{ fontStyle: "italic" }}>
			<h2>
				"That fear of AI has gone, which is what we wanted, so it’s done
				exactly what we needed it to do. The overall feedback from the
				teams is 'Phenomenal'"
			</h2>
		</div>
		<div>
			<h3>- Olivia Hatton, VodafoneThree</h3>
		</div>
	</div>
);

const footer_comp: React.FC = () => {
	const n = 3;

	return (
		<div>
			<div
				style={{
					// ...genericSectionStyle,

					width: "100vw",
					height: "70vh",
					margin: "0 auto",
					minWidth: 0,
					color: "white",
					display: "grid",
					gridTemplateRows: `repeat(${n}, ${70 / n}vh)`,
				}}
			>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "25% 50% 25%",
					}}
				>
					<div></div>
					<ScrollVisibilityDependent
						element={Quote1}
						styling={{ ...centerable, alignItems: "center" }}
						borders={[1, 2 / 3]}
					/>
				</div>
				<div
					style={{
						// ...genericSectionStyle,
						display: "grid",
						gridTemplateColumns: "10% 80% 10%",
					}}
				>
					<div></div>

					<ScrollVisibilityDependent
						element={
							<PartnershipBar
								{...demoSmallPartnershipBarData}
								index={-1}
							/>
						}
						styling={{
							position: "relative",
							minWidth: 0,
							isolation: "isolate",

							minHeight: 0,
							width: "125%", //correction factor  0.8/0.8*0.8
							marginLeft: "-12.5%", //correction factor 0.1/0.1*0.8
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
						borders={[18 / 30, 12 / 30]}
					/>

					<div></div>
				</div>
				<div
					style={{
						// ...genericSectionStyle,

						display: "grid",
						gridTemplateColumns: "25% 50% 25%",
					}}
				>
					<div
						style={{
							display: "grid",
							gridTemplateRows: "25% 25% 25% 25%",
							height: "100%",
							margin: "0 auto",
						}}
					>
						<ScrollVisibilityDependent
							element={linkedin}
							styling={{
								display: "flex",
								justifyContent: "left",
								marginLeft: 0,
							}}
							borders={[1 / 3, 0.75 * (1 / 3)]}
						/>
						<ScrollVisibilityDependent
							element={<h2>Joe Fennel</h2>}
							styling={centerable}
							borders={[0.75 * (1 / 3), 0.5 * (1 / 3)]}
						/>
						<ScrollVisibilityDependent
							element={<h2>Inquiries</h2>}
							styling={{ ...centerable }}
							borders={[0.5 * (1 / 3), 0.25 * (1 / 3)]}
						/>

						<ScrollVisibilityDependent
							element={<h2>www.aicompatible.com</h2>}
							styling={centerable}
							borders={[0.25 * (1 / 3), 0]}
						/>
					</div>
					<ScrollVisibilityDependent
						element={Quote2}
						styling={{
							// ...genericSectionStyle,
							...centerable,

							justifyContent: "center",

							maxHeight: "50%",
						}}
						borders={[0.8 * (1 / 3), 0.2 * (1 / 3)]}
					/>

					<div
						style={{
							...centerable,

							height: "100%",
							minWidth: 0,
							minHeight: 0,
						}}
					>
						<ScrollVisibilityDependent
							element={
								<h2>
									<BoxedImage
										image={logo}
										aspectRatio={`${Math.sqrt(3) / 2}`}
										width={"50%"}
									/>
								</h2>
							}
							styling={centerable}
							percentage={0.5 * (1 / 3)}
							borders={[1 / 3, 0]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
