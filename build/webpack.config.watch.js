const webpack = require('webpack');
const BrowserSyncPlugin = require('browsersync-webpack-plugin');
const ReloadPlugin = require('reload-html-webpack-plugin');

const config = require('./config');

module.exports = {
  output: {
    pathinfo: true,
    publicPath: config.proxyUrl + config.publicPath,
  },
  devtool: '#cheap-module-source-map',
  stats: false,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ReloadPlugin(),
    new BrowserSyncPlugin({
      target: config.devUrl,
      proxyUrl: config.proxyUrl,
    }),
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: config.publicPath,
  },
};
