const merge = require('webpack-merge');
const webpack = require('webpack');
const qs = require('qs');
const autoprefixer = require('autoprefixer');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');

const assetsFilenames = (config.enabled.cacheBusting) ? config.cacheBusting : '[name]';
const sourceMapQueryStr = (config.enabled.sourceMaps) ? '+sourceMap' : '-sourceMap';

const extractStyle = new ExtractTextPlugin({
  filename: `styles/${assetsFilenames}.css`,
  disable: (config.enabled.watcher),
});

let webpackConfig = {
  context: config.paths.src,
  entry: config.entry,
  devtool: (config.enabled.sourceMaps ? '#source-map' : undefined),
  output: {
    path: config.paths.dist,
    publicPath: config.publicPath,
    filename: `scripts/${assetsFilenames}.js`,
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
        exclude: [/(node_modules)(?![/|\\](bootstrap|jquery))/],
        use: [{
          loader: 'buble',
          options: { objectAssign: 'Object.assign' },
        }],
      },
      {
        test: /\.pug$/,
        include: config.paths.src,
        use: ['html', 'pug-html?{"pretty":true,"exports":false}'],
      },
      {
        test: /\.css$/,
        include: config.paths.src,
        use: extractStyle.extract({
          fallback: 'style',
          publicPath: '../',
          use: [
            `css?${sourceMapQueryStr}`,
            'postcss',
          ],
        }),
      },
      {
        test: /\.scss$/,
        include: config.paths.src,
        use: extractStyle.extract({
          fallback: 'style',
          publicPath: '../',
          use: [
            `css?${sourceMapQueryStr}`,
            'postcss',
            `resolve-url?${sourceMapQueryStr}`,
            `sass?${sourceMapQueryStr}`,
          ],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        include: config.paths.src,
        use: `file?${qs.stringify({
          name: `[path]${assetsFilenames}.[ext]`,
        })}`,
      },
      {
        test: /\.(ttf|eot)$/,
        include: config.paths.src,
        use: `file?${qs.stringify({
          name: `[path]${assetsFilenames}.[ext]`,
        })}`,
      },
      {
        test: /\.woff2?$/,
        include: config.paths.src,
        use: `url?${qs.stringify({
          limit: 10000,
          mimetype: 'application/font-woff',
          name: `[path]${assetsFilenames}.[ext]`,
        })}`,
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg)$/,
        include: /node_modules/,
        use: [{
          loader: 'file',
          options: {
            name: `vendor/${assetsFilenames}.[ext]`,
            publicPath: '/',
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
  /*
  externals: {
    jquery: 'jQuery',
  },
  */
  plugins: [
    new CleanPlugin([config.paths.dist], {
      root: config.paths.root,
      verbose: false,
    }),
    new CopyPlugin([
      {
        from: config.copy,
        to: `[path]${assetsFilenames}.[ext]`,
      },
    ]),
    extractStyle,
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
    new HtmlWebpackPlugin({
      template: 'htdocs/index.pug'
    })
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
  webpackConfig.entry = require('./util/addHotMiddleware')(webpackConfig.entry);
  webpackConfig = merge(webpackConfig, require('./webpack.config.watch'));
}

module.exports = webpackConfig;
