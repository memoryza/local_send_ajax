var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    entry: {
        index: './static/js/index',
        vendor: ['react']
    },
    output: {
        path: './dest/',
        filename: '[name].js',
        chunkFilename: "[id].js",
        jsonpFunction: '__wpjp_'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react'],
                cacheDirectory: true
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=25000'
        }, {
            test: /\.less$/,
            loader: 'style!css'
        }]
    },
    plugins: [
        new Clean(['dest']),
        new CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.DefinePlugin({
            DEBUG: process.env.NODE_ENV !== 'production'
        })
    ]
};
