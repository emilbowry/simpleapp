// src/components/background/bg.tsx

import React from "react";
import ReactDOMServer from "react-dom/server";
import backgroundPattern from "../../assets/bavkground.png";

// ===== Base BackgroundStyle =====
export class BackgroundStyle {
	static fromSVGString(svgString: string): string {
		const uri = encodeURIComponent(svgString);
		return `url("data:image/svg+xml,${uri}")`;
	}

	static stringifySVG(svg: React.ReactElement): string {
		return ReactDOMServer.renderToStaticMarkup(svg);
	}

	constructor(
		image: string | React.ReactElement,
		styling: React.CSSProperties = {}
	) {
		let _image = image;
		if (typeof image !== "string") {
			_image = BackgroundStyle.stringifySVG(image);
		}
		_image = BackgroundStyle.fromSVGString(_image as string);

		return {
			backgroundImage: _image,
			width: "100vw",
			minHeight: "100vh",
			zIndex: -1,
			backgroundColor: "#f0f0f0",
			paddingBottom: "100px",
			position: "absolute",
			inset: 0,
			...styling,
		} as React.CSSProperties;
	}
}
// ===== Tiled Background (sync, using build before super) =====
type Reflection = "left" | "right" | "above" | "below";

interface TiledBackgroundOptions {
	base64: string; // data URL string, e.g. "data:image/png;base64,..."
	reflections?: Reflection[];
	styling?: React.CSSProperties;
}

export class TiledBackgroundStyle extends BackgroundStyle {
	constructor({
		base64,
		reflections = [],
		styling = {},
	}: TiledBackgroundOptions) {
		const svg = TiledBackgroundStyle.buildTiledSvg(base64, reflections);
		super(svg, styling);
	}

	private static buildTiledSvg(
		base64: string,
		reflections: Reflection[]
	): React.ReactElement {
		const images: React.ReactNode[] = [
			<image
				key="base"
				href={base64}
				x="0"
				y="0"
				width="100%"
				height="100%"
				preserveAspectRatio="none"
			/>,
		];

		if (reflections.includes("right")) {
			images.push(
				<g
					key="right"
					transform="translate(200%,0) scale(-1,1)"
				>
					<image
						href={base64}
						x="0"
						y="0"
						width="100%"
						height="100%"
						preserveAspectRatio="none"
					/>
				</g>
			);
		}
		if (reflections.includes("left")) {
			images.push(
				<g
					key="left"
					transform="translate(100%,0) scale(-1,1)"
				>
					<image
						href={base64}
						x="0"
						y="0"
						width="100%"
						height="100%"
						preserveAspectRatio="none"
					/>
				</g>
			);
		}
		if (reflections.includes("below")) {
			images.push(
				<g
					key="below"
					transform="translate(0,200%) scale(1,-1)"
				>
					<image
						href={base64}
						x="0"
						y="0"
						width="100%"
						height="100%"
						preserveAspectRatio="none"
					/>
				</g>
			);
		}
		if (reflections.includes("above")) {
			images.push(
				<g
					key="above"
					transform="translate(0,100%) scale(1,-1)"
				>
					<image
						href={base64}
						x="0"
						y="0"
						width="100%"
						height="100%"
						preserveAspectRatio="none"
					/>
				</g>
			);
		}

		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
			>
				{images}
			</svg>
		);
	}
}

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

export const DemoSimpleBackground: React.FC = () => {
	const style = new BackgroundStyle(svg_el);

	return <div style={style} />;
};

let cache = new Map<string, string>();
async function imageToBase64Cached(url: string): Promise<string> {
	if (cache.has(url)) return cache.get(url)!;

	const res = await fetch(url);
	const blob = await res.blob();
	const base64 = await new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});

	cache.set(url, base64);
	return base64;
}
let b64 = imageToBase64Cached(backgroundPattern);
export const DemoTiledBackground: React.FC = () => {
	const style = new TiledBackgroundStyle({
		base64: b64, // must already be a data URL string
		reflections: ["right", "below"],
		styling: { backgroundRepeat: "repeat", backgroundAttachment: "fixed" },
	});

	return <div style={style} />;
};
