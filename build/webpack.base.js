'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');

const {
	directories: { app: APP_DIR }
} = config;

module.exports = {
	entry: {
		app: [`${APP_DIR}/polyfills.js`, `${APP_DIR}/index.jsx`]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: APP_DIR,
				loader: 'babel-loader',
				options: {
					cacheDirectory: true
				}
			},
			{
				test: /\.s?css$/,
				include: APP_DIR,
				use: [
					config.isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.md$/,
				loader: 'babel-loader!react-markdown-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'images/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'media/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[hash:7].[ext]'
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.md'],
		alias: {
			'@src': APP_DIR,
			'@api': `${APP_DIR}/api`,
			'@assets': `${APP_DIR}/assets`,
			'@common': `${APP_DIR}/common`,
			'@components': `${APP_DIR}/components`,
			'@shared': `${APP_DIR}/components/shared`,
			'@routes': `${APP_DIR}/routes`,
			'@scss': `${APP_DIR}/scss`,
			'@services': `${APP_DIR}/services`,
			'@theme': `${APP_DIR}/theme`,
			'react-dom': '@hot-loader/react-dom'
		}
	}
};
