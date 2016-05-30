var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            // Test expects a RegExp! Note the slashes!
            test: /\.css$/,
            loaders: ['style', 'css'],
            // Include accepts either a path or an array of paths.
            include: __dirname
        }, {
            test: /\.jsx$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: __dirname
        }],
        query: {
          presets: ['react']
        }
    }
}
