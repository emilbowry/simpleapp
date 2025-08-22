const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// console.log('⏳  Using this webpack.config.js');
module.exports = {
	mode: "development",

	entry: path.resolve(__dirname, "src/index.tsx"),

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		clean: true,
	},

	devtool: "inline-source-map",
	devServer: {
		static: path.resolve(__dirname, "dist"),
		port: 3000,
		hot: true,
		open: true,
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
	},

	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.module\.css$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				oneOf: [
					{
						resourceQuery: /inline/, // e.g. foo.png?inline
						type: "asset/inline",
					},
					{
						type: "asset/resource", // default behavior
					},
				],
			},
			{
				test: /\.css$/i,
				exclude: /\.module\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.svg$/i,
				type: "asset/resource",
			},
			// {
			// 	test: /\.(png|jpg|jpeg|gif|svg)$/i,
			// 	type: "asset/resource",
			// },
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html",
		}),
	],
};

// ```
// ### 1. `Background` Component

// The `Background` component serves as a foundational, generic class for displaying various types of backgrounds.

// *   **Core Functionality:**
//     *   Accepts either an SVG string or a React SVG element via the `svg` prop to generate a `backgroundImage` data URI.
//     *   Allows for extensive style customization through the `styleOverrides` prop, which intelligently merges with a base background style (`_BackgroundStyle`).
// *   **SVG Handling:**
//     *   **`static fromSVGString(svgString: string): string`**: Encodes raw SVG strings into a URL-safe data URI format (`data:image/svg+xml,...`), making them directly usable as CSS `backgroundImage` values.
//     *   **`static stringifySVG(svg: React.ReactElement): string`**: Leverages `ReactDOMServer.renderToStaticMarkup` to convert React-defined SVG elements into their corresponding static HTML string representation. This is crucial for dynamically building complex SVG patterns in React and then applying them as CSS backgrounds.
// *   **Dynamic Styling:**
//     *   Manages its internal `style` state, which is computed based on the `svg` and `styleOverrides` props.
//     *   Updates the style dynamically in `componentDidMount` for initial rendering and `componentDidUpdate` to react to prop changes, ensuring the background always reflects the latest configuration.

// ### 2. `TiledBackground` Component

// Extending the `Background` component, `TiledBackground` specializes in creating complex, tiled image backgrounds with optional reflections, optimized for performance.

// *   **Specialized Props:**
//     *   **`image: string`**: The URL of the base image to be tiled. This allows for standard image imports (e.g., `import image from './image.png';`) without requiring special inline loaders, as the image data is fetched and processed at runtime.
//     *   **`reflections?: Array<"left" | "right" | "above" | "below">`**: Defines how the base image tile should be mirrored (horizontally or vertically) to create a larger, seamless pattern.
// *   **Asynchronous Processing (Necessity for Standard Image Imports):**
//     *   The component *must* perform asynchronous operations (`fetch`, `FileReader`, `Image` loading) to retrieve the raw pixel data and dimensions of the `image` specified by its URL. This is essential because standard image imports (like `import backgroundPattern from "../../assets/bavkground.png";`) provide a URL to the asset, not its raw content or dimensions directly.
//     *   These asynchronous steps are handled in `computeAndCacheStyle`, ensuring that the image data is fully loaded and processed before the background style is applied.
// *   **Efficient Tiling with SVG Generation:**
//     *   **`static buildTiledSvg(...)`**: Dynamically constructs a React SVG element that represents the tiled pattern, including any specified reflections. This involves:
//         *   Embedding the base image as a Base64 data URL within an `<image>` tag.
//         *   Using SVG `<g>` (group) elements with `transform` attributes (`translate`, `scale`) to efficiently create mirrored copies of the base image. This declarative SVG approach allows for precise control over the tiling and reflection logic.
// *   **Performance Optimization: Rasterization and Caching:**
//     *   **`static rasterizeSvgToPng(...)` (Rasterization):** This is a critical performance enhancement. Instead of directly using the potentially complex and large SVG data URI as the `backgroundImage`, the generated SVG is rendered onto an HTML `canvas` and then converted into a PNG data URL.
//         *   **Why Rasterize?** Browsers are generally much more efficient at rendering and repeating simple raster images (like PNGs) as backgrounds compared to complex SVG data URIs, especially when those SVGs involve transformations and multiple elements. This significantly reduces the CPU overhead during scrolling or other layout changes.
//     *   **`private static cache = new Map<string, React.CSSProperties>()` (Caching):**
//         *   A static `Map` is used to store the computed and rasterized background styles.
//         *   Before re-computing a style, the component checks if the exact combination of `image` and `reflections` has been processed before.
//         *   **Efficiency Gain:** This prevents redundant and computationally expensive operations (fetching, Base64 conversion, SVG generation, and especially rasterization) for identical background configurations, leading to faster subsequent renders and reduced resource consumption.
// *   **Lifecycle Management:**
//     *   `componentDidMount` and `componentDidUpdate` trigger the `ensureStyle` method, which orchestrates the asynchronous processing and caching logic, ensuring the background is correctly rendered and updated.

// ### 3. `_BackgroundStyle` Constant

// *   Defines a set of common, default CSS properties for the background, such as `backgroundRepeat: "repeat"`, `backgroundPosition: "center"`, `width: "100vw"`, `height: "100vh"`, `position: "fixed"`, and `zIndex: -1`.
// *   These defaults provide a consistent base for backgrounds, which can then be overridden or extended by individual component props.
// ```
