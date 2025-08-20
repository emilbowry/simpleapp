// // // src/components/background/Background.tsx

// // import React, { useEffect, useState } from "react";
// // import backgroundPattern from "../../assets/bavkground.png";
// // import backgroundInline from "../../assets/bavkground.png?inline";
// // import ReactDOMServer from "react-dom/server";
// // import backgroundInline from "../../assets/bavkground.png?inline";
// // /// Possible by the followning change to webpack
// // // 	test: /\.(png|jpe?g|gif)$/i,
// // // 	oneOf: [
// // // 		{
// // // 			resourceQuery: /inline/, // e.g. foo.png?inline
// // // 			type: "asset/inline",
// // // 		},
// // // 		{
// // // 			type: "asset/resource", // default behavior
// // // 		},
// // // 	],
// // // },

// // // === Testing Dynamically Infered Background ===
const svg_el = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="200"
		height="200"
	>
		<circle
			cx="100"
			cy="100"
			r="80"
			fill="red"
		/>
	</svg>
);
const svg_str = `<svg
		xmlns="http://www.w3.org/2000/svg"
		width="200"
		height="200"
	>
		<circle
			cx="100"
			cy="100"
			r="80"
			fill="red"
		/>
	</svg>`;

export const BG_i: React.CSSProperties = {
	backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg_str)}")`,
};

export const BG_ii: React.CSSProperties = {
	backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
		ReactDOMServer.renderToStaticMarkup(svg_el)
	)}")`,
};
// // const svg = encodeURIComponent(`
// //   <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
// // 	<circle cx="100" cy="100" r="80" fill="red" />
// //   </svg>
// // `);

// // export const DynamicImage_BackgroundStyle: React.CSSProperties = {
// // 	backgroundImage: `url("data:image/svg+xml,${svg}")`,
// // };

// // export const createSvgUrl = (svg_el = composed_svg_el) => {
// // 	console.log(`Back: ${backgroundInline}`);
// // 	const composed_svg_string = ReactDOMServer.renderToStaticMarkup(svg_el);
// // 	const composed_svg_uri = encodeURIComponent(composed_svg_string);
// // 	return `url("data:image/svg+xml,${composed_svg_uri}")`;
// // };

// // export const tiled_svg_el = (
// // 	<svg
// // 		xmlns="http://www.w3.org/2000/svg"
// // 		width="4800"
// // 		height="2880"
// // 	>
// // 		{/* Original */}
// // 		<image
// // 			href={backgroundInline}
// // 			x="0"
// // 			y="0"
// // 			width="2400"
// // 			height="1440"
// // 		/>

// // 		{/* Horizontal reflection */}
// // 		<g transform="translate(4800,0) scale(-1,1)">
// // 			<image
// // 				href={backgroundInline}
// // 				x="0"
// // 				y="0"
// // 				width="2400"
// // 				height="1440"
// // 			/>
// // 		</g>

// // 		{/* Vertical reflection of the whole strip */}
// // 		<g transform="translate(0,2880) scale(1,-1)">
// // 			<g>
// // 				<image
// // 					href={backgroundInline}
// // 					x="0"
// // 					y="0"
// // 					width="2400"
// // 					height="1440"
// // 				/>
// // 				<g transform="translate(4800,0) scale(-1,1)">
// // 					<image
// // 						href={backgroundInline}
// // 						x="0"
// // 						y="0"
// // 						width="2400"
// // 						height="1440"
// // 					/>
// // 				</g>
// // 			</g>
// // 		</g>
// // 	</svg>
// // );
// // export const TiledImage_BackgroundStyle: React.CSSProperties = {
// // 	backgroundImage: createSvgUrl(tiled_svg_el),
// // 	backgroundRepeat: "repeat",
// // 	backgroundSize: "4800px 2880px",
// // 	backgroundAttachment: "fixed",
// // 	width: "100vw",
// // 	minHeight: "100vh",
// // 	zIndex: -1,
// // 	backgroundColor: "#f0f0f0",
// // 	paddingBottom: "100px",
// // };

// // export async function createBackgroundUrl(): Promise<string> {
// // 	const svgString = ReactDOMServer.renderToStaticMarkup(tiled_svg_el);
// // 	const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
// // 	const url = URL.createObjectURL(blob);

// // 	const img = new Image();
// // 	img.src = url;
// // 	await new Promise<void>((res, rej) => {
// // 		img.onload = () => res();
// // 		img.onerror = (e) => rej(e);
// // 	});

// // 	const canvas = document.createElement("canvas");
// // 	canvas.width = 4800;
// // 	canvas.height = 2880;
// // 	const ctx = canvas.getContext("2d")!;
// // 	ctx.drawImage(img, 0, 0);
// // 	return canvas.toDataURL("image/png");
// // }

// // export function makeBackgroundStyle(bgUrl: string): React.CSSProperties {
// // 	return {
// // 		backgroundImage: `url(${bgUrl})`,
// // 		backgroundRepeat: "repeat",
// // 		backgroundSize: "4800px 2880px",
// // 		backgroundAttachment: "fixed",
// // 		width: "100vw",
// // 		minHeight: "100vh",
// // 		zIndex: -1,
// // 		backgroundColor: "#f0f0f0",
// // 		paddingBottom: "100px",
// // 	};
// // }

// // // // cache so we only rasterize once
// // let cachedUrl: string | null = null;

// // export function useTiledBackgroundStyle(): React.CSSProperties {
// // 	const [style, setStyle] = useState<React.CSSProperties>({});

// // 	useEffect(() => {
// // 		let active = true;

// // 		const load = async () => {
// // 			if (!cachedUrl) {
// // 				cachedUrl = await createBackgroundUrl();
// // 			}
// // 			if (active) {
// // 				setStyle(makeBackgroundStyle(cachedUrl));
// // 			}
// // 		};

// // 		load();

// // 		return () => {
// // 			active = false;
// // 		};
// // 	}, []);

// // 	return style;
// // }

// // export const Background: React.FC = () => {
// // 	const bgStyle = useTiledBackgroundStyle();

// // 	return <div style={{ ...bgStyle, position: "absolute", inset: 0 }} />;
// // };
// // src/components/background/Background.tsx

// import React from "react";
// import ReactDOMServer from "react-dom/server";

// // ========== Types ==========
// interface IBackgroundFromSVGProps {
// 	svgElement: React.ReactElement;
// 	rasterize?: boolean;
// }

// interface IBackgroundFromSVGState {
// 	style: React.CSSProperties;
// }

// // ========== Styles ==========
// const baseBackgroundStyle: React.CSSProperties = {
// 	backgroundRepeat: "repeat",
// 	backgroundSize: "4800px 2880px",
// 	backgroundAttachment: "fixed",
// 	width: "100vw",
// 	minHeight: "100vh",
// 	zIndex: -1,
// 	backgroundColor: "#f0f0f0",
// 	paddingBottom: "100px",
// };

// const makeBackgroundStyle = (bgUrl: string): React.CSSProperties => ({
// 	...baseBackgroundStyle,
// 	backgroundImage: `url(${bgUrl})`,
// });

// // ========== Helpers ==========
// const svgToUrl = (svg: React.ReactElement): string => {
// 	const str = ReactDOMServer.renderToStaticMarkup(svg);
// 	return `url("data:image/svg+xml,${encodeURIComponent(str)}")`;
// };

// const rasterizeSvg = async (svg: React.ReactElement): Promise<string> => {
// 	const str = ReactDOMServer.renderToStaticMarkup(svg);
// 	const blob = new Blob([str], { type: "image/svg+xml;charset=utf-8" });
// 	const url = URL.createObjectURL(blob);

// 	const img = new Image();
// 	img.src = url;
// 	await new Promise<void>((res, rej) => {
// 		img.onload = () => res();
// 		img.onerror = (e) => rej(e);
// 	});

// 	const canvas = document.createElement("canvas");
// 	canvas.width = 4800;
// 	canvas.height = 2880;
// 	const ctx = canvas.getContext("2d")!;
// 	ctx.drawImage(img, 0, 0);
// 	return canvas.toDataURL("image/png");
// };

// // cache to avoid rerasterizing
// let cachedUrl: string | null = null;

// // ========== Class Component ==========
// export class BackgroundFromSVG extends React.Component<
// 	IBackgroundFromSVGProps,
// 	IBackgroundFromSVGState
// > {
// 	state: IBackgroundFromSVGState = { style: {} };

// 	async componentDidMount() {
// 		const { svgElement, rasterize } = this.props;
// 		let bgUrl: string;

// 		if (rasterize) {
// 			if (!cachedUrl) {
// 				cachedUrl = await rasterizeSvg(svgElement);
// 			}
// 			bgUrl = cachedUrl;
// 		} else {
// 			bgUrl = svgToUrl(svgElement);
// 		}

// 		this.setState({ style: makeBackgroundStyle(bgUrl) });
// 	}

// 	render() {
// 		return (
// 			<div
// 				style={{ ...this.state.style, position: "absolute", inset: 0 }}
// 			/>
// 		);
// 	}
// }

// // // ========== Example SVG (tiled background) ==========
// // export const tiled_svg_el = (
// // 	<svg
// // 		xmlns="http://www.w3.org/2000/svg"
// // 		width="4800"
// // 		height="2880"
// // 	>
// // 		{/* Original */}
// // 		<image
// // 			href={"/bavkground.png"}
// // 			x="0"
// // 			y="0"
// // 			width="2400"
// // 			height="1440"
// // 		/>

// // 		{/* Horizontal reflection */}
// // 		<g transform="translate(4800,0) scale(-1,1)">
// // 			<image
// // 				href={"/bavkground.png"}
// // 				x="0"
// // 				y="0"
// // 				width="2400"
// // 				height="1440"
// // 			/>
// // 		</g>

// // 		{/* Vertical reflection of the whole strip */}
// // 		<g transform="translate(0,2880) scale(1,-1)">
// // 			<g>
// // 				<image
// // 					href={"/bavkground.png"}
// // 					x="0"
// // 					y="0"
// // 					width="2400"
// // 					height="1440"
// // 				/>
// // 				<g transform="translate(4800,0) scale(-1,1)">
// // 					<image
// // 						href={"/bavkground.png"}
// // 						x="0"
// // 						y="0"
// // 						width="2400"
// // 						height="1440"
// // 					/>
// // 				</g>
// // 			</g>
// // 		</g>
// // 	</svg>
// // );
// import backgroundInline from "../../assets/bavkground.png?inline";
// // import backgroundInline from "../../assets/bavkground.png;

// export const tiled_svg_el = (
// 	<svg
// 		xmlns="http://www.w3.org/2000/svg"
// 		width="4800"
// 		height="2880"
// 	>
// 		<image
// 			href={backgroundInline}
// 			x="0"
// 			y="0"
// 			width="2400"
// 			height="1440"
// 		/>
// 		<g transform="translate(4800,0) scale(-1,1)">
// 			<image
// 				href={backgroundInline}
// 				x="0"
// 				y="0"
// 				width="2400"
// 				height="1440"
// 			/>
// 		</g>
// 		<g transform="translate(0,2880) scale(1,-1)">
// 			<g>
// 				<image
// 					href={backgroundInline}
// 					x="0"
// 					y="0"
// 					width="2400"
// 					height="1440"
// 				/>
// 				<g transform="translate(4800,0) scale(-1,1)">
// 					<image
// 						href={backgroundInline}
// 						x="0"
// 						y="0"
// 						width="2400"
// 						height="1440"
// 					/>
// 				</g>
// 			</g>
// 		</g>
// 	</svg>
// );

// // ========== Implementation ==========
// export const Background: React.FC = () => {
// 	return (
// 		<BackgroundFromSVG
// 			svgElement={tiled_svg_el}
// 			rasterize
// 		/>
// 	);
// };// src/components/background/Background.tsx

import React from "react";
import ReactDOMServer from "react-dom/server";
// import backgroundPattern from "../../assets/bavkground.png";

// ========== Types ==========
interface IBackgroundFromSVGProps {
	svgElement: (base64: string) => React.ReactElement; // factory, depends on Base64 img
	rasterize?: boolean;
}

interface IBackgroundFromSVGState {
	style: React.CSSProperties;
}

// ========== Styles ==========
const baseBackgroundStyle: React.CSSProperties = {
	backgroundRepeat: "repeat",
	backgroundSize: "4800px 2880px",
	backgroundAttachment: "fixed",
	width: "100vw",
	minHeight: "100vh",
	zIndex: -1,
	backgroundColor: "#f0f0f0",
	paddingBottom: "100px",
};

const makeBackgroundStyle = (bgUrl: string): React.CSSProperties => ({
	...baseBackgroundStyle,
	backgroundImage: `url(${bgUrl})`,
});

// ========== Helpers ==========
const imageToBase64 = async (url: string): Promise<string> => {
	const res = await fetch(url);
	const blob = await res.blob();

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
};

const svgToUrl = (svg: React.ReactElement): string => {
	const str = ReactDOMServer.renderToStaticMarkup(svg);
	return `url("data:image/svg+xml,${encodeURIComponent(str)}")`;
};

const rasterizeSvg = async (svg: React.ReactElement): Promise<string> => {
	const str = ReactDOMServer.renderToStaticMarkup(svg);
	const blob = new Blob([str], { type: "image/svg+xml;charset=utf-8" });
	const url = URL.createObjectURL(blob);

	const img = new Image();
	img.src = url;
	await new Promise<void>((res, rej) => {
		img.onload = () => res();
		img.onerror = (e) => rej(e);
	});

	const canvas = document.createElement("canvas");
	canvas.width = 4800;
	canvas.height = 2880;
	const ctx = canvas.getContext("2d")!;
	ctx.drawImage(img, 0, 0);
	return canvas.toDataURL("image/png");
};

// ========== Cache ==========
let cachedBase64: string | null = null;
let cachedUrl: string | null = null;

// ========== Class Component ==========
export class BackgroundFromSVG extends React.Component<
	IBackgroundFromSVGProps,
	IBackgroundFromSVGState
> {
	state: IBackgroundFromSVGState = { style: {} };

	async componentDidMount() {
		const { svgElement, rasterize } = this.props;

		// compute Base64 once
		if (!cachedBase64) {
			// @ts-ignore - will resolve at runtime
			cachedBase64 = await imageToBase64(
				require("../../assets/bavkground.png")
			);
		}

		// build the SVG element using the base64 image
		const svg = svgElement(cachedBase64);

		let bgUrl: string;
		if (rasterize) {
			if (!cachedUrl) cachedUrl = await rasterizeSvg(svg);
			bgUrl = cachedUrl;
		} else {
			bgUrl = svgToUrl(svg);
		}

		this.setState({ style: makeBackgroundStyle(bgUrl) });
	}

	render() {
		return (
			<div
				style={{ ...this.state.style, position: "absolute", inset: 0 }}
			/>
		);
	}
}

// ========== SVG Builder ==========
export const buildTiledSvg = (base64: string) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="4800"
		height="2880"
	>
		{/* Original */}
		<image
			href={base64}
			x="0"
			y="0"
			width="2400"
			height="1440"
		/>

		{/* Horizontal reflection */}
		<g transform="translate(4800,0) scale(-1,1)">
			<image
				href={base64}
				x="0"
				y="0"
				width="2400"
				height="1440"
			/>
		</g>

		{/* Vertical reflection of the whole strip */}
		<g transform="translate(0,2880) scale(1,-1)">
			<g>
				<image
					href={base64}
					x="0"
					y="0"
					width="2400"
					height="1440"
				/>
				<g transform="translate(4800,0) scale(-1,1)">
					<image
						href={base64}
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

// ========== Implementation ==========
export const Background: React.FC = () => {
	return (
		<BackgroundFromSVG
			svgElement={buildTiledSvg}
			rasterize
		/>
	);
};
