import webpack from 'webpack';
import ReloadPlugin from 'reload-html-webpack-plugin';
import BrowserSyncPlugin from 'browsersync-webpack-plugin';

import config from './config';

export default {
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
