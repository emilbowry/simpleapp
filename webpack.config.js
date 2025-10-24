// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = (env, argv) => {
// 	const isProduction = argv.mode === "production";

// 	return {
// 		mode: isProduction ? "production" : "development",

// 		entry: path.resolve(__dirname, "src/index.tsx"),

// 		output: {
// 			path: path.resolve(__dirname, "dist"),
// 			filename: "bundle.js",
// 			clean: true,
// 		},

// 		devtool: isProduction ? "source-map" : "eval-source-map",

// 		devServer: isProduction
// 			? undefined
// 			: {
// 					static: path.resolve(__dirname, "dist"),
// 					port: 3000,
// 					hot: true,
// 					open: true,
// 			  },

// 		resolve: {
// 			extensions: [".ts", ".tsx", ".js", ".jsx"],
// 		},

// 		module: {
// 			rules: [
// 				{
// 					test: /\.[jt]sx?$/,
// 					exclude: /node_modules/,
// 					use: "babel-loader",
// 				},
// 				{
// 					test: /\.module\.css$/i,
// 					use: [
// 						"style-loader",
// 						{
// 							loader: "css-loader",
// 							options: {
// 								modules: true,
// 								esModule: false,
// 							},
// 						},
// 					],
// 				},
// 				{
// 					test: /\.(png|jpe?g|gif)$/i,
// 					oneOf: [
// 						{
// 							resourceQuery: /inline/,
// 							type: "asset/inline",
// 						},
// 						{
// 							type: "asset/resource",
// 						},
// 					],
// 				},
// 				{
// 					test: /\.css$/i,
// 					exclude: /\.module\.css$/i,
// 					use: ["style-loader", "css-loader"],
// 				},
// 				{
// 					test: /\.svg$/i,
// 					type: "asset/resource",
// 				},
// 			],
// 		},

// 		plugins: [
// 			new HtmlWebpackPlugin({
// 				template: "public/index.html",
// 			}),
// 		],
// 	};
// };
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
	const isProduction = argv.mode === "production";

	return {
		mode: isProduction ? "production" : "development",

		entry: path.resolve(__dirname, "src/index.tsx"),

		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "bundle.js",
			clean: true,
		},

		devtool: isProduction ? "source-map" : "eval-source-map",

		devServer: isProduction
			? undefined
			: {
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
					test: /\.(ico|json|png)$/i,
					include: [path.resolve(__dirname, "public")],
					type: "asset/resource",
					generator: {
						filename: "[name][ext]",
					},
				},
				{
					test: /\.(jpe?g|gif)$/i,
					oneOf: [
						{
							resourceQuery: /inline/,
							type: "asset/inline",
						},
						{
							type: "asset/resource",
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
			],
		},

		plugins: [
			new HtmlWebpackPlugin({
				template: "public/index.html",
			}),
		],
	};
};
