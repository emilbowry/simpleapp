// src/components/background/Background.tsx

import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import backgroundPattern from "../../assets/bavkground.png";

// ========== Types ==========
interface IBackgroundFromSVGProps {
	svgElement: React.ReactElement;
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
let cachedUrl: string | null = null;

// ========== Class Component ==========
export class BackgroundFromSVG extends React.Component<
	IBackgroundFromSVGProps,
	IBackgroundFromSVGState
> {
	state: IBackgroundFromSVGState = { style: {} };

	async componentDidMount() {
		const { svgElement, rasterize } = this.props;
		let bgUrl: string;

		if (rasterize) {
			if (!cachedUrl) cachedUrl = await rasterizeSvg(svgElement);
			bgUrl = cachedUrl;
		} else {
			bgUrl = svgToUrl(svgElement);
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

		{/* Vertical reflection */}
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
	const [svg, setSvg] = useState<React.ReactElement | null>(null);

	useEffect(() => {
		let active = true;

		const load = async () => {
			const base64 = await imageToBase64(backgroundPattern);
			if (active) {
				setSvg(buildTiledSvg(base64));
			}
		};

		load();
		return () => {
			active = false;
		};
	}, []);

	if (!svg) return null; // or a loading placeholder

	return (
		<BackgroundFromSVG
			svgElement={svg}
			rasterize
		/>
	);
};
