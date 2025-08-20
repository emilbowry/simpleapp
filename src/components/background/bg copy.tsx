// src/components/background/bg_old.tsx

import React from "react";
import ReactDOMServer from "react-dom/server";
import backgroundPattern from "../../assets/bavkground.png";

export class BackgroundStyle {
	private style: React.CSSProperties;

	private constructor(style: React.CSSProperties) {
		this.style = {
			width: "100vw",
			minHeight: "100vh",
			zIndex: -1,
			backgroundColor: "#f0f0f0",
			paddingBottom: "100px",
			position: "absolute",
			inset: 0,
			...style,
		};
	}

	static fromCSS(style: React.CSSProperties): BackgroundStyle {
		return new BackgroundStyle(style);
	}

	static async fromSVG(svg: React.ReactElement): Promise<BackgroundStyle> {
		const pngUrl = await this.rasterizeSvg(svg);
		return new BackgroundStyle({
			backgroundImage: `url(${pngUrl})`,
		});
	}

	static fromSVGString(svgString: string): BackgroundStyle {
		const uri = encodeURIComponent(svgString);
		return new BackgroundStyle({
			backgroundImage: `url("data:image/svg+xml,${uri}")`,
		});
	}

	static async fromRaster(url: string): Promise<BackgroundStyle> {
		const res = await fetch(url);
		const blob = await res.blob();
		const base64 = await new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
		return new BackgroundStyle({
			backgroundImage: `url(${base64})`,
		});
	}

	toCSS(): React.CSSProperties {
		return this.style;
	}

	map(
		f: (style: React.CSSProperties) => React.CSSProperties
	): BackgroundStyle {
		return new BackgroundStyle(f(this.style));
	}

	extend(overrides: React.CSSProperties): BackgroundStyle {
		return new BackgroundStyle({ ...this.style, ...overrides });
	}

	combine(other: BackgroundStyle): BackgroundStyle {
		return new BackgroundStyle({ ...this.style, ...other.style });
	}

	private static async rasterizeSvg(
		svg: React.ReactElement
	): Promise<string> {
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
		canvas.width = img.width || 1920;
		canvas.height = img.height || 1080;

		const ctx = canvas.getContext("2d")!;
		ctx.drawImage(img, 0, 0);

		return canvas.toDataURL("image/png");
	}
}

interface TiledBackgroundOptions {
	image: string;
	reflections?: Array<"left" | "right" | "above" | "below">;
	styleOverrides?: React.CSSProperties;
}

export class TiledBackgroundStyle {
	private inner: BackgroundStyle;
	private static cache = new Map<string, string>();

	private constructor(inner: BackgroundStyle) {
		this.inner = inner;
	}

	toCSS(): React.CSSProperties {
		return this.inner.toCSS();
	}

	map(
		f: (style: React.CSSProperties) => React.CSSProperties
	): TiledBackgroundStyle {
		return new TiledBackgroundStyle(this.inner.map(f));
	}

	extend(overrides: React.CSSProperties): TiledBackgroundStyle {
		return new TiledBackgroundStyle(this.inner.extend(overrides));
	}

	combine(other: TiledBackgroundStyle): TiledBackgroundStyle {
		return new TiledBackgroundStyle(this.inner.combine(other.inner));
	}

	static async fromImage(
		opts: TiledBackgroundOptions
	): Promise<TiledBackgroundStyle> {
		const { image, reflections = [], styleOverrides } = opts;

		const base64 = await this.imageToBase64Cached(image);

		const tempImg = new Image();
		tempImg.src = base64;
		await new Promise<void>((res, rej) => {
			tempImg.onload = () => res();
			tempImg.onerror = rej;
		});
		const width = tempImg.width;
		const height = tempImg.height;

		const svg = this.buildTiledSvg(base64, width, height, reflections);

		const bg = await BackgroundStyle.fromSVG(svg);

		return new TiledBackgroundStyle(bg.extend(styleOverrides ?? {}));
	}

	private static async imageToBase64Cached(url: string): Promise<string> {
		if (this.cache.has(url)) return this.cache.get(url)!;

		const res = await fetch(url);
		const blob = await res.blob();
		const base64 = await new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});

		this.cache.set(url, base64);
		return base64;
	}

	private static buildTiledSvg(
		base64: string,
		width: number,
		height: number,
		reflections: Array<"left" | "right" | "above" | "below">
	): React.ReactElement {
		let svgWidth = width;
		let svgHeight = height;

		if (reflections.includes("left") || reflections.includes("right")) {
			svgWidth *= 2;
		}
		if (reflections.includes("above") || reflections.includes("below")) {
			svgHeight *= 2;
		}

		const images: React.ReactNode[] = [
			<image
				key="base"
				href={base64}
				x="0"
				y="0"
				width={width}
				height={height}
			/>,
		];

		if (reflections.includes("right")) {
			images.push(
				<g
					key="right"
					transform={`translate(${2 * width},0) scale(-1,1)`}
				>
					<image
						href={base64}
						x="0"
						y="0"
						width={width}
						height={height}
					/>
				</g>
			);
		}
		if (reflections.includes("left")) {
			images.push(
				<g
					key="left"
					transform={`translate(${width},0) scale(-1,1)`}
				>
					<image
						href={base64}
						x="0"
						y="0"
						width={width}
						height={height}
					/>
				</g>
			);
		}
		if (reflections.includes("below")) {
			images.push(
				<g
					key="below"
					transform={`translate(0,${2 * height}) scale(1,-1)`}
				>
					<image
						href={base64}
						x="0"
						y="0"
						width={width}
						height={height}
					/>
				</g>
			);
		}
		if (reflections.includes("above")) {
			images.push(
				<g
					key="above"
					transform={`translate(0,${height}) scale(1,-1)`}
				>
					<image
						href={base64}
						x="0"
						y="0"
						width={width}
						height={height}
					/>
				</g>
			);
		}

		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={svgWidth}
				height={svgHeight}
			>
				{images}
			</svg>
		);
	}
}

const testSVG_string = `
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <circle cx="100" cy="100" r="80" fill="red" />
  </svg>
`;

const testSvg_el = (
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

export const TestBackgroundString: React.FC = () => {
	const style = BackgroundStyle.fromSVGString(testSVG_string).toCSS();
	return <div style={style} />;
};

export const TestBackgroundElement: React.FC = () => {
	const [style, setStyle] = React.useState<React.CSSProperties>();

	React.useEffect(() => {
		BackgroundStyle.fromSVG(testSvg_el).then((bg) => setStyle(bg.toCSS()));
	}, []);

	return <div style={style} />;
};

export const DemoTiledBackground: React.FC = () => {
	const [style, setStyle] = React.useState<React.CSSProperties>();

	React.useEffect(() => {
		TiledBackgroundStyle.fromImage({
			image: backgroundPattern,
			reflections: ["right", "below"],
			styleOverrides: {
				backgroundRepeat: "repeat",
				backgroundAttachment: "fixed",
			},
		}).then((bg) => setStyle(bg.toCSS()));
	}, []);

	return <div style={style} />;
};
