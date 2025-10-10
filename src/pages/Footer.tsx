// src/pages/Footer.tsx

import React, { useEffect, useState, useCallback } from "react";
import {
	BoxedImage,
	formatComponent,
	ValidComponent,
} from "../utils/reactUtils";
import logo from "../assets/logo.png";
import { PartnershipMarquee } from "../components/partnershipbar/PartnershipBar";
import { partners } from "./homepage/parts/Partners";
import { linkedin_svg } from "../components/callingcard/graphics";

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
	}
	const footerVH = 0.7;
	const [isVisible, setIsVisible] = useState(false);
	const [opacity, setOpacity] = useState(0);

	const handleScroll = useCallback(() => {
		const viewportHeight = window.innerHeight;
		const visability_mid = _percentage * viewportHeight * footerVH;
		const visability_top = borders[0] * viewportHeight * footerVH;
		const visability_bottom = borders[1] * viewportHeight * footerVH;
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

		setOpacity(_opacity);

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
		visibility: isVisible ? "visible" : "hidden",
		opacity: opacity,
		filter: `blur(${(1 - opacity) ** 2 * 16}px)`,
	};
	return <div style={_styling}>{formatComponent(element as any)}</div>;
};

const FooterLayoutHandler: React.FC<{
	component: ValidComponent;
	styling?: React.CSSProperties;
}> = ({ component, styling = {} }) => {
	return (
		<div
			style={{
				marginTop: "calc(-70vh - 60px)",
				fontSize: "1.5rem",
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

const scaleCorrection = (container_percentage: number) =>
	1 / container_percentage;

const centerable: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",

	margin: "auto 0",
};

const Quote1 = (
	<div>
		<div style={{ fontStyle: "italic" }}>
			<h2>
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

const GridFooter: React.FC<{ n_rows?: number; children?: React.ReactNode }> = ({
	n_rows = 3,
	children,
}) => {
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
					gridTemplateRows: `repeat(${n_rows}, ${70 / n_rows}vh)`,
				}}
			>
				{children}
			</div>
		</div>
	);
};

const GridFooterRows: React.FC<{
	colratio?: number[];
	children: ValidComponent[];
}> = ({ colratio = [1], children }) => {
	const sum = colratio.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		0
	);
	const fracs = colratio.map((number) => (100 * number) / sum);
	const percentageString = fracs.map((number) => number + "%").join(" ");
	console.log(percentageString);
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: percentageString,
			}}
		>
			{children.map((item, _index) => (
				<React.Fragment key={_index}>
					{item ? formatComponent(item) : <div />}
				</React.Fragment>
			))}
		</div>
	);
};
const NewFooter: React.FC = () => {
	const n = 3;
	const row1 = [
		null,
		<ScrollVisibilityDependent
			element={Quote1}
			styling={{ ...centerable, alignItems: "center" }}
			borders={[1, 2 / 3]}
		/>,
		null,
	];

	const row2 = [
		null,
		<ScrollVisibilityDependent
			element={
				<PartnershipMarquee
					{...partners}
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
		/>,
		null,
	];

	const row3 = [
		<div
			style={{
				display: "grid",
				gridTemplateRows: "25% 25% 25% 25%",
				height: "100%",
				margin: "0 auto",
			}}
		>
			<ScrollVisibilityDependent
				element={linkedin_svg}
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
		</div>,
		<ScrollVisibilityDependent
			element={Quote2}
			styling={{
				// ...genericSectionStyle,
				...centerable,

				justifyContent: "center",

				maxHeight: "50%",
			}}
			borders={[0.8 * (1 / 3), 0.2 * (1 / 3)]}
		/>,

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
					// <h2>
					<BoxedImage
						image={logo}
						aspectRatio={`${Math.sqrt(3) / 2}`}
						width={"50%"}
					/>
					// </h2>
				}
				styling={centerable}
				percentage={0.5 * (1 / 3)}
				borders={[1 / 3, 0]}
			/>
		</div>,
	];
	return (
		<GridFooter>
			<GridFooterRows
				colratio={[1, 2, 1]}
				children={row1}
			/>
			<GridFooterRows
				colratio={[1, 8, 1]}
				children={row2}
			/>
			<GridFooterRows
				colratio={[1, 2, 1]}
				children={row3}
			/>
		</GridFooter>
	);
};
export const Footer = <FooterLayoutHandler component={NewFooter} />;
