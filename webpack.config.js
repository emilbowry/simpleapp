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
				test: /\.css$/i,
				exclude: /\.module\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.svg$/i,
				type: "asset/resource",
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/i,
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
