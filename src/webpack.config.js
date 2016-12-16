var path = require('path');

module.exports = {
    entry: {
        main: './src/js/main.js'
    },
    output: {
        filename: './dist/js/[name].js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                loader: 'url'
            },
            {   test: /\.png$/,
                loader: "url-loader?mimetype=image/png"
            },
            {   test: /\.css$/,
                loaders:['style', 'css']
            },
        ]
    },
    devServer: {
        historyApiFallback: true
    }
}
