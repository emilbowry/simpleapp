const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('⏳  Using this webpack.config.js');
module.exports = {
  mode: 'development',

  // 1. Point entry at your TSX bootstrap file:
  entry: path.resolve(__dirname, 'src/index.tsx'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },

  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    hot: true,
    open: true,
  },

  // 2. Resolve .ts/.tsx along with .js/.jsx:
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        // 3. Use Babel (with @babel/preset-typescript) or ts-loader:
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.module\.css$/i,          // target only .module.css
        use: [
          'style-loader',
     {
           loader: 'css-loader',
           options: {
            modules: true,    // enable CSS Modules
             esModule: false,  // export as CommonJS so default is the class map
           },
         },
        ],
      },
    
      // 2. Global CSS rule
      {
        test: /\.css$/i,                  // all other .css files
        exclude: /\.module\.css$/i,
        use: [
          'style-loader',
          'css-loader',                   // no modules option
        ],
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',   // emits a file and exports the URL
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Matches all common image types
        type: 'asset/resource', // This tells Webpack 5 to handle it as a file asset
      },
      // other asset rules...
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
};
