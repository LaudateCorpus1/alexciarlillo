var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: 'src/scripts/main.js'
    },
    output: {
        path: 'dist',
        filename: 'index_bundle.js'
    },
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
            {   test: /\.pug$/,
                loaders:['pug']
            },
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({  // Also generate a test.html
        filename: 'index.html',
        template: 'src/pages/index.pug'
      })
    ]
}
