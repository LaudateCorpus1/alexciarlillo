const merge = require('webpack-merge');
const webpack = require('webpack');
const qs = require('qs');
const autoprefixer = require('autoprefixer');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = require('./config');

process.traceDeprecation = true;

let webpackConfig = {
  context: config.paths.src,
  entry: config.entry,
  devtool: (config.enabled.sourceMaps ? '#source-map' : undefined),
  output: {
    path: config.paths.dist,
    publicPath: config.publicPath,
    filename: `scripts/${config.assetsFilenames}.js`,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        include: config.paths.src,
        use: [{
          loader: 'eslint'
        }],
      },
      {
        test: /\.js$/,
        exclude: [/(node_modules|bower_components)(?![/|\\](bootstrap|foundation-sites))/],
        use: [{
          loader: 'buble',
          options: { objectAssign: 'Object.assign' },
        }],
      },
      {
        test: /\.css$/,
        include: config.paths.src,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          publicPath: '../',
          use: [
            `css?${config.sourceMapQueryStr}`,
            'postcss',
          ],
        }),
      },
      {
        test: /\.scss$/,
        include: config.paths.src,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          publicPath: '/styles',
          use: [
            `css?${config.sourceMapQueryStr}`,
            'postcss',
            `resolve-url?${config.sourceMapQueryStr}`,
            `sass?${config.sourceMapQueryStr}`,
          ],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        include: config.paths.src,
        use: `file?${qs.stringify({
          name: `[path]${config.assetsFilenames}.[ext]`,
        })}`,
      },
      {
        test: /\.(ttf|eot)$/,
        include: config.paths.src,
        use: `file?${qs.stringify({
          name: `[path]${config.assetsFilenames}.[ext]`,
        })}`,
      },
      {
        test: /\.woff2?$/,
        include: config.paths.src,
        use: `url?${qs.stringify({
          limit: 10000,
          mimetype: 'application/font-woff',
          name: `[path]${config.assetsFilenames}.[ext]`,
        })}`,
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg)$/,
        include: /node_modules|bower_components/,
        use: [{
          loader: 'file',
          options: {
            name: `vendor/${config.cacheBusting}.[ext]`,
          },
        }],
      },
    ],
  },
  resolve: {
    modules: [
      config.paths.src,
      'node_modules',
    ],
    enforceExtension: false,
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new CleanPlugin([config.paths.dist], {
      root: config.paths.root,
      verbose: false,
    }),
    new CopyPlugin([
      {
        from: config.copy,
        to: `[path]${config.assetsFilenames}.[ext]`,
      },
    ]),
    new ExtractTextPlugin({
      filename: `styles/${config.assetsFilenames}.css`,
      allChunks: true,
      disable: (config.enabled.watcher),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: config.enabled.optimize,
      debug: config.enabled.watcher,
      stats: { colors: true },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.s?css$/,
      options: {
        output: { path: config.paths.dist },
        context: config.paths.src,
        postcss: [
          autoprefixer({ browsers: config.browsers }),
        ],
      },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: { failOnWarning: false, failOnError: true },
      },
    }),
  ],
};


/* eslint-disable global-require */ /** Let's only load dependencies as needed */

if (config.enabled.optimize) {
  webpackConfig = merge(webpackConfig, require('./webpack.config.optimize'));
}

if (config.env.production) {
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

if (config.enabled.watcher) {
  webpackConfig.entry = require('./build/util/addHotMiddleware')(webpackConfig.entry);
  webpackConfig = merge(webpackConfig, require('./webpack.config.watch'));
}

module.exports = webpackConfig;
