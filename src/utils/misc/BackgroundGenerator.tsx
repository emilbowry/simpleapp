// src/components/background/Background.tsx
// Reference Page
import React from "react";
import ReactDOMServer from "react-dom/server";

export interface BackgroundProps {
	svg?: string | React.ReactElement;
	styleOverrides?: React.CSSProperties;
}

export class Background<
	P extends BackgroundProps = BackgroundProps
> extends React.Component<P> {
	state = { style: this.props.styleOverrides || ({} as React.CSSProperties) };

	componentDidMount() {
		this.computeStyle();
	}

	componentDidUpdate(prevProps: P) {
		if (
			prevProps.svg !== this.props.svg ||
			JSON.stringify(prevProps.styleOverrides) !==
				JSON.stringify(this.props.styleOverrides)
		) {
			this.computeStyle();
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
		const s = {
			// ...dynamicStyles,
			...this.state.style,

			...styleOverrides,
		};

		this.setState({
			style: s,
		});
		return s;
	}

	constructor(props: any) {
		super(props);
		const { svg, styleOverrides } = this.props;
		const dynamicStyles: React.CSSProperties = {};

		if (svg) {
			let svgString: string;
			if (typeof svg === "string") {
				svgString = svg;
			} else {
				svgString = Background.stringifySVG(svg);
			}
			dynamicStyles.backgroundImage = Background.fromSVGString(svgString);
		}

		let _styles: React.CSSProperties = {
			...dynamicStyles,
			...styleOverrides,
		};
		this.computeStyle(undefined, _styles);
	}

	render() {
		return <div style={this.state.style} />;
	}
}

interface TiledBackgroundProps extends Omit<BackgroundProps, "svg"> {
	image: string;
	reflections?: Array<"left" | "right" | "above" | "below">;
}

export class TiledBackground extends Background<TiledBackgroundProps> {
	// 	[TODO]:
	// 		- Abstract into ImageBabackground then TiledBackground implements ImageBackground
	private static cache = new Map<string, React.CSSProperties>();
	render() {
		return <div style={this.state.style} />;
	}
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
	private cacheKey: string;
	private isSet: boolean = false;

	constructor(props: any) {
		super(props);
		const { image, reflections = [] } = this.props;
		const cacheKey = `${image}|${reflections.sort().join(",")}`;
		this.cacheKey = cacheKey;
	}
	private async ensureStyle() {
		if (!TiledBackground.cache.has(this.cacheKey)) {
			const style = await this.computeAndCacheStyle();
			TiledBackground.cache.set(this.cacheKey, style);
		}
		await this.computeAndCacheStyle(this.cacheKey);
	}

	private async computeAndCacheStyle(
		cacheKey?: string
	): Promise<React.CSSProperties> {
		let _style: React.CSSProperties;
		if (!cacheKey) {
			const { image, reflections = [], styleOverrides } = this.props;

			const res = await fetch(image);
			const blob = await res.blob();
			const base64 = await new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result as string);
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});

			const tempImg = new Image();
			tempImg.src = base64;
			await new Promise<void>((res, rej) => {
				tempImg.onload = () => res();
				tempImg.onerror = rej;
			});
			const width = tempImg.width;
			const height = tempImg.height;

			const tileSvg = TiledBackground.buildTiledSvg(
				base64,
				width,
				height,
				reflections
			);

			const svgStr = ReactDOMServer.renderToStaticMarkup(tileSvg);

			const tilePng = await TiledBackground.rasterizeSvgToPng(
				svgStr,
				width *
					(reflections.includes("left") ||
					reflections.includes("right")
						? 2
						: 1),
				height *
					(reflections.includes("above") ||
					reflections.includes("below")
						? 2
						: 1)
			);
			_style = { backgroundImage: `url(${tilePng})` };
			super.computeStyle(undefined, _style);
		} else {
			if (!this.isSet) {
				_style = TiledBackground.cache.get(cacheKey)!;
				super.computeStyle(undefined, _style);

				this.isSet = true;
			} else {
				_style = this.state.style;
			}
		}
		return _style;
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
		const testArr = [
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={svgWidth}
				height={svgHeight}
			>
				, ...tiles,
			</svg>,
		];
		console.log(testArr[1]);
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

	buildSVG(tiles: React.ReactNode[], svgWidth: number, svgHeight: number) {
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
	backgroundRepeat: "repeat",
	// backgroundSize: "auto 100%",
	// backgroundPosition: "0 0",

	// backgroundPosition: "center",
	backgroundSize: "cover",
	backgroundAttachment: "fixed",
	// backgroundOrigin: "border-box",
	// position:"absolute",

	width: "100vw",
	height: "100vh",
	position: "fixed",
	zIndex: -1,
	inset: 0,
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
