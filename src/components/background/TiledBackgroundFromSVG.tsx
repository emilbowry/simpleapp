// src/components/background/TiledBackgroundFromSVG.tsx

import React from "react";
import ReactDOMServer from "react-dom/server";

// ========== Helpers ==========

// Cache for base64-encoded rasters
const base64Cache = new Map<string, string>();

async function imageToBase64Cached(url: string): Promise<string> {
	if (base64Cache.has(url)) return base64Cache.get(url)!;

	const res = await fetch(url);
	const blob = await res.blob();

	const base64 = await new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});

	base64Cache.set(url, base64);
	return base64;
}

// Infer dimensions from <svg> props
function getSvgDimensions(svg: React.ReactElement): {
	width: number;
	height: number;
} {
	const props = svg.props as any;

	if (props.width && props.height) {
		return {
			width: parseInt(props.width, 10),
			height: parseInt(props.height, 10),
		};
	}

	if (props.viewBox) {
		const parts = props.viewBox.split(/\s+|,/).map(Number);
		if (parts.length === 4) {
			const [, , w, h] = parts;
			return { width: w, height: h };
		}
	}

	return { width: 300, height: 150 }; // sensible default
}

// ========== BackgroundStyle Container ==========

export class BackgroundStyle {
	private style: React.CSSProperties;

	private constructor(style: React.CSSProperties) {
		this.style = style;
	}

	// -------- Accessor --------
	toCSS(): React.CSSProperties {
		return this.style;
	}

	// -------- Algebraic Ops --------
	map(
		f: (style: React.CSSProperties) => React.CSSProperties
	): BackgroundStyle {
		return new BackgroundStyle(f(this.style));
	}

	extend(overrides: React.CSSProperties): BackgroundStyle {
		return new BackgroundStyle({ ...this.style, ...overrides });
	}

	combine(other: BackgroundStyle): BackgroundStyle {
		return new BackgroundStyle({
			...this.style,
			...other.toCSS(),
		});
	}

	// -------- Factory Methods --------

	// From raw CSS (escape hatch)
	static fromCSS(style: React.CSSProperties): BackgroundStyle {
		return new BackgroundStyle(style);
	}

	// From raster image (png/jpg)
	static async fromRaster(imageUrl: string): Promise<BackgroundStyle> {
		const base64 = await imageToBase64Cached(imageUrl);
		return new BackgroundStyle({
			backgroundImage: `url(${base64})`,
		});
	}

	// From SVG element (always rasterized now)
	static async fromSVG(svg: React.ReactElement): Promise<BackgroundStyle> {
		const { width, height } = getSvgDimensions(svg);

		const str = ReactDOMServer.renderToStaticMarkup(svg);
		const blob = new Blob([str], { type: "image/svg+xml;charset=utf-8" });
		const url = URL.createObjectURL(blob);

		const img = new Image();
		img.src = url;
		await new Promise<void>((res, rej) => {
			img.onload = () => res();
			img.onerror = rej;
		});

		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d")!;
		ctx.drawImage(img, 0, 0, width, height);

		const pngUrl = canvas.toDataURL("image/png");
		return new BackgroundStyle({
			backgroundImage: `url(${pngUrl})`,
			backgroundSize: `${width}px ${height}px`,
		});
	}
}
