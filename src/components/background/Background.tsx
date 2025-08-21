// src/components/background/background.tsx
import React from "react";
import ReactDOMServer from "react-dom/server";

// ========== Base Background ==========

export interface BackgroundProps {
	svg?: string | React.ReactElement;
	styleOverrides?: React.CSSProperties;
}

export class Background<
	P extends BackgroundProps = BackgroundProps
> extends React.Component<P> {
	// state = { style: {} as React.CSSProperties };
	state = { style: this.props.styleOverrides || ({} as React.CSSProperties) };

	componentDidMount() {
		this.setState({ style: this.getComputedStyle() });
	}

	componentDidUpdate(prevProps: P) {
		if (
			prevProps.svg !== this.props.svg ||
			JSON.stringify(prevProps.styleOverrides) !==
				JSON.stringify(this.props.styleOverrides)
		) {
			this.setState({ style: this.getComputedStyle() });
		}
	}

	static fromSVGString(svgString: string): string {
		const uri = encodeURIComponent(svgString);
		return `url("data:image/svg+xml,${uri}")`;
	}

	static stringifySVG(svg: React.ReactElement): string {
		return ReactDOMServer.renderToStaticMarkup(svg);
	}

	protected computeStyle(
		svg?: string | React.ReactElement,
		styleOverrides?: React.CSSProperties
	): React.CSSProperties {
		let backgroundImage: string | undefined;

		if (svg) {
			if (typeof svg === "string") {
				backgroundImage = Background.fromSVGString(svg);
			} else {
				const svgString = Background.stringifySVG(svg);
				backgroundImage = Background.fromSVGString(svgString);
			}
		}

		return {
			// width: "100vw",
			// minHeight: "100vh",
			// zIndex: -1,
			// backgroundColor: "#f0f0f0",
			// paddingBottom: "100px",
			// position: "absolute",
			// inset: 0,
			// backgroundImage,
			..._BackgroundStyle,
			...styleOverrides,
		};
	}

	/** 🔑 Subclasses override this to customize style generation */
	protected getComputedStyle(): React.CSSProperties {
		const { svg, styleOverrides } = this.props;
		return this.computeStyle(svg, styleOverrides);
	}

	render() {
		return (
			<div
				style={this.state.style}
				className="no-aos"
			/>
		);
	}
}

// ========== TiledBackground ==========

interface TiledBackgroundProps extends Omit<BackgroundProps, "svg"> {
	image: string;
	reflections?: Array<"left" | "right" | "above" | "below">;
}

export class TiledBackground extends Background<TiledBackgroundProps> {
	private static cache = new Map<string, React.CSSProperties>();

	async componentDidMount() {
		await this.ensureStyle();
	}

	async componentDidUpdate(prevProps: TiledBackgroundProps) {
		if (
			prevProps.image !== this.props.image ||
			JSON.stringify(prevProps.reflections) !==
				JSON.stringify(this.props.reflections)
		) {
			await this.ensureStyle();
		}
	}

	private async ensureStyle() {
		const { image, reflections = [] } = this.props;
		const cacheKey = `${image}|${reflections.sort().join(",")}`;

		if (!TiledBackground.cache.has(cacheKey)) {
			const style = await this.computeAndCacheStyle();
			TiledBackground.cache.set(cacheKey, style);
		}

		this.setState({ style: TiledBackground.cache.get(cacheKey)! });
	}

	private async computeAndCacheStyle(): Promise<React.CSSProperties> {
		const { image, reflections = [], styleOverrides } = this.props;

		// Load image → base64
		const res = await fetch(image);
		const blob = await res.blob();
		const base64 = await new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});

		// Get dimensions
		const tempImg = new Image();
		tempImg.src = base64;
		await new Promise<void>((res, rej) => {
			tempImg.onload = () => res();
			tempImg.onerror = rej;
		});
		const width = tempImg.width;
		const height = tempImg.height;

		// Build repeatable tile SVG
		const tileSvg = TiledBackground.buildTiledSvg(
			base64,
			width,
			height,
			reflections
		);
		const svgStr = ReactDOMServer.renderToStaticMarkup(tileSvg);

		// Rasterize that tile
		const tilePng = await TiledBackground.rasterizeSvgToPng(
			svgStr,
			width *
				(reflections.includes("left") || reflections.includes("right")
					? 2
					: 1),
			height *
				(reflections.includes("above") || reflections.includes("below")
					? 2
					: 1)
		);

		// Use super.computeStyle for baseline
		return super.computeStyle(undefined, {
			backgroundImage: `url(${tilePng})`,
			// backgroundRepeat: "repeat",
			...styleOverrides,
		});
	}

	private static async rasterizeSvgToPng(
		svg: string,
		width: number,
		height: number
	): Promise<string> {
		const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
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
		ctx.drawImage(img, 0, 0);

		return canvas.toDataURL("image/png");
	}
	private static buildTiledSvg(
		base64: string,
		width: number,
		height: number,
		reflections: Array<"left" | "right" | "above" | "below">
	): React.ReactElement {
		let svgWidth = width;
		let svgHeight = height;

		// base block
		let tiles: React.ReactNode[] = [
			<image
				key="base"
				href={base64}
				x="0"
				y="0"
				width={width}
				height={height}
			/>,
		];

		// mirror horizontally
		if (reflections.includes("right")) {
			tiles = [
				<g key="horiz">
					{tiles}
					<g transform={`translate(${2 * width},0) scale(-1,1)`}>
						{tiles}
					</g>
				</g>,
			];
			svgWidth *= 2;
		}

		// mirror vertically
		if (reflections.includes("below")) {
			tiles = [
				<g key="vert">
					{tiles}
					<g transform={`translate(0,${2 * height}) scale(1,-1)`}>
						{tiles}
					</g>
				</g>,
			];
			svgHeight *= 2;
		}

		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={svgWidth}
				height={svgHeight}
			>
				{tiles}
			</svg>
		);
	}
}

// ========== Demo ==========

import backgroundPattern from "../../assets/bavkground.png";

export const _BackgroundStyle: React.CSSProperties = {
	// backgroundPosition: "0 0",
	backgroundRepeat: "repeat",
	backgroundPosition: "center",
	backgroundSize: "", // Some reason doesnt work with ContactPage
	backgroundAttachment: "fixed",
	width: "100vw",
	height: "100vh",
	position: "fixed",
	zIndex: -1,
	inset: 0,
	backgroundColor: "#f0f0f0",
	paddingBottom: "100px",
};

export const DemoTiledBackground: React.FC = () => {
	return (
		<TiledBackground
			image={backgroundPattern}
			reflections={["right", "below"]}
			styleOverrides={_BackgroundStyle}
		/>
	);
};

// // //// Example usage:
// const BackgroundStyle = {
// 	..._BackgroundStyle,
// 	backgroundImage: `url(${backgroundPattern})`,
// };
// export const DemoPage: React.FC = () => {
// 	return (
// 		<div>
// 			<div style={BackgroundStyle} /> // Fixed on scroll
// 			{/* <DemoTiledBackground /> */} // Moves on scroll (incorrect)
// 			<CallingCard
// 				components={[<CallOut body={<DemoHexTimeline />} />]}
// 				index={-1}
// 			/>
// 		</div>
// 	);
// };
