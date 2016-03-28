var webpack = require('webpack');
var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');

var config = require('./webpack.config');

config.devtool = 'source-map';
config.output.filename = '[name].[chunkhash].js';
config.output.sourceMapFilename = '[name].[chunkhash].map';
config.output.chunkFilename = '[chunkhash].js';

config.plugins = [
    new CleanPlugin(['build'], 'www'),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[chunkhash].js', minChunks: Infinity }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.[chunkhash].js', minChunks: 2, chunks: ['app', 'vendor'] }),
    new webpack.optimize.DedupePlugin(),
    new HtmlPlugin({
        template: './www/index.html',
        inject: 'body',
        favicon: './www/favicon.ico',
        minify: { collapseWhitespace: true }
    })
];

module.exports = config;