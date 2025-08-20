import backgroundPattern from "../../assets/bavkground.png";
import ReactDOMServer from "react-dom/server";
// src/components/background/Background.tsx

import React from "react";

// === Testing Dynamically Infered Background ===
const svg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
	<circle cx="100" cy="100" r="80" fill="red" />
  </svg>
`);

export const DynamicImage_BackgroundStyle: React.CSSProperties = {
	backgroundImage: `url("data:image/svg+xml,${svg}")`,
};

// === Testing Composed SVG ===
export const composed_svg_el = (
	<svg
		width="300"
		height="300"
		viewBox="0 -150 300 300"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<mask id="cutout">
				<path
					d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z"
					fill="white"
				/>
			</mask>

			<pattern
				id="img1"
				width="1"
				height="1"
				patternContentUnits="objectBoundingBox"
			>
				<image
					href={backgroundPattern}
					width="1"
					height="1"
					preserveAspectRatio="xMidYMid slice"
				/>
			</pattern>
		</defs>

		<path
			d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z"
			mask="url(#cutout)"
			// fill="url(#img1)" // Works fine when removed
		/>
	</svg>
);

// === Background image does work ===
export const Test_With_Background: React.FC = () => (
	<svg
		width="300"
		height="300"
		viewBox="0 -150 300 300"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<mask id="cutout">
				<path
					d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z"
					fill="white"
				/>
			</mask>

			<pattern
				id="img1"
				width="1"
				height="1"
				patternContentUnits="objectBoundingBox"
			>
				<image
					href={backgroundPattern}
					width="1"
					height="1"
					preserveAspectRatio="xMidYMid slice"
				/>
			</pattern>
		</defs>

		<path
			d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z"
			mask="url(#cutout)"
			// fill="url(#img1)"
		/>
	</svg>
);

export const createSvgUrl = (svg_el = composed_svg_el) => {
	const composed_svg_string = ReactDOMServer.renderToStaticMarkup(svg_el);
	const composed_svg_uri = encodeURIComponent(composed_svg_string);
	return `url("data:image/svg+xml,${composed_svg_uri}")`;
};

export const ComposedSvgStyle: React.CSSProperties = {
	// backgroundImage: `url("data:image/svg+xml,${composed_svg}")`,
	backgroundImage: createSvgUrl(composed_svg_el),
};

// === Testing Dynamically Tiled Background ===

const tiled_svg = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="4800"
		height="2880"
	>
		<image
			href={backgroundPattern}
			x="0"
			y="0"
			width="2400"
			height="1440"
		/>

		<g transform="translate(4800,0) scale(-1,1)">
			<image
				href={backgroundPattern}
				x="0"
				y="0"
				width="2400"
				height="1440"
			/>
		</g>

		<g transform="translate(0,2880) scale(1,-1)">
			<g>
				<image
					href={backgroundPattern}
					x="0"
					y="0"
					width="2400"
					height="1440"
				/>
				<g transform="translate(4800,0) scale(-1,1)">
					<image
						href={backgroundPattern}
						x="0"
						y="0"
						width="2400"
						height="1440"
					/>
				</g>
			</g>
		</g>
	</svg>
);

export const TiledImage_BackgroundStyle: React.CSSProperties = {
	backgroundImage: createSvgUrl(tiled_svg),

	backgroundRepeat: "repeat",
	backgroundSize: "4800px 2880px",
};
