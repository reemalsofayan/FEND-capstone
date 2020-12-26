const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtraPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {

        path: path.join(__dirname, 'dist'),
        filename: 'bundle.min.js',
        libraryTarget: 'var',
        library: 'Client'

    },
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtraPlugin.loader, 'css-loader', 'sass-loader']
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    
                    'file-loader',
                ],
            },
            
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },

        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtraPlugin({filename: 'style.css'}),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }),
        new CopyWebpackPlugin([
            {from:'src/client/media/assets/weather-icons',to:'weather-icons'} 
        ]),
    ]
}
