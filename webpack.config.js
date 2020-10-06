const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (configEnv = {}, { mode = 'production', $0 = '' }) => {
	const WEBPACK_DEV_SERVER = $0.includes('webpack-dev-server');

	const webpackConfig = {
		entry: {
			index: ['./src/index.tsx']
		},
		output: {
			filename: '[name].js',
			publicPath: '/',
			path: path.join(__dirname, 'build')
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.json'],
			modules: ['node_modules', 'src']
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					loaders: ['style-loader', 'css-loader']
				},
				{
					test: /\.scss$/,
					loaders: ['style-loader', 'css-loader', 'sass-loader']
				},
				{
					test: /\.(gif|png|jpe?g|svg|eot|woff|woff2|ttf)$/,
					use: [
						'file-loader',
						{
							loader: 'image-webpack-loader',
							options: {
								disable: mode !== 'production'
							}
						}
					]
				},
				{
					test: /\.exec\.js$/,
					include: path.resolve(__dirname, 'src/lib'),
					use: ['script-loader']
				}
			]
		},
		optimization: {
			minimizer: [new TerserJSPlugin()],
			minimize: mode == 'production'
		},
		plugins: [
			new ExtractCssChunks({
				filename: '[name].css',
				hot: true,
				cssModules: true
			}),
			new HtmlWebpackPlugin({
				template: 'public/index.html'
			}),
			new Dotenv()
		]
	};

	if (mode === 'development') {
		Object.assign(webpackConfig, {
			devtool: 'eval-source-map'
		});
	}

	if (WEBPACK_DEV_SERVER) {
		Object.assign(webpackConfig, {
			devServer: {
				contentBase: path.join(__dirname, 'build'),
				compress: false,
				port: 3000,
				hot: true,
				historyApiFallback: true
			}
		});
	}

	return webpackConfig;
};
