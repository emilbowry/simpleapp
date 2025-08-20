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

// ===== Tiled Background =====
type Reflection = "left" | "right" | "above" | "below";

interface TiledBackgroundOptions {
	image: string;
	reflections?: Reflection[];
	styling?: React.CSSProperties;
}

export class TiledBackgroundStyle extends BackgroundStyle {
	static tiledBackgroundStyle(
		opts: TiledBackgroundOptions
	): React.CSSProperties {
		const [style, setStyle] = React.useState<React.CSSProperties>();

		React.useEffect(() => {
			async function build() {
				const { image, reflections = [], styling = {} } = opts;

				const base64 = await TiledBackgroundStyle.imageToBase64Cached(
					image
				);
				const { width, height } =
					await TiledBackgroundStyle.getImageSize(base64);

				const svg = TiledBackgroundStyle.buildTiledSvg(
					base64,
					width,
					height,
					reflections
				);

				setStyle(new TiledBackgroundStyle(svg, styling));
			}
			build();
		}, [
			opts.image,
			JSON.stringify(opts.reflections),
			JSON.stringify(opts.styling),
		]);

		return style || {};
	}
	// constructor(
	// 	image: string,
	// 	styling: React.CSSProperties = {},
	// 	reflections?: Reflection[]
	// ) {
	// 	let new_styling = TiledBackgroundStyle.tiledBackgroundStyle({
	// 		image,
	// 		reflections,
	// 		styling,
	// 	});
	// 	super(<svg></svg>, new_styling); /// since styling is spread after it will overwrite background image
	// but ideally we want to do super(f(image), styling)
	// }

	constructor(svg: React.ReactElement, styling: React.CSSProperties = {}) {
		super(svg, styling);
	}

	static cache = new Map<string, string>();

	static async imageToBase64Cached(url: string): Promise<string> {
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

	static async getImageSize(
		base64: string
	): Promise<{ width: number; height: number }> {
		const img = new Image();
		img.src = base64;
		await new Promise<void>((res, rej) => {
			img.onload = () => res();
			img.onerror = rej;
		});
		return { width: img.width, height: img.height };
	}

	static buildTiledSvg(
		base64: string,
		width: number,
		height: number,
		reflections: Reflection[]
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

export function useTiledBackgroundStyle(
	opts: TiledBackgroundOptions
): React.CSSProperties {
	const [style, setStyle] = React.useState<React.CSSProperties>();

	React.useEffect(() => {
		async function build() {
			const { image, reflections = [], styling = {} } = opts;

			const base64 = await TiledBackgroundStyle.imageToBase64Cached(
				image
			);
			const { width, height } = await TiledBackgroundStyle.getImageSize(
				base64
			);

			const svg = TiledBackgroundStyle.buildTiledSvg(
				base64,
				width,
				height,
				reflections
			);

			setStyle(new TiledBackgroundStyle(svg, styling));
		}
		build();
	}, [
		opts.image,
		JSON.stringify(opts.reflections),
		JSON.stringify(opts.styling),
	]);

	return style || {};
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

export const DemoTiledBackground: React.FC = () => {
	const style = useTiledBackgroundStyle({
		image: backgroundPattern,
		reflections: ["right", "below"],
		styling: { backgroundRepeat: "repeat", backgroundAttachment: "fixed" },
	});

	return <div style={style} />;
};
