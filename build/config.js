const path = require('path');
const uniq = require('lodash/uniq');
const merge = require('webpack-merge');
const argv = require('minimist')(process.argv.slice(2));

const isProduction = !!((argv.env && argv.env.production) || argv.p);
const rootPath = process.cwd();
const sourceMapQueryStr = (!isProduction) ? '+sourceMap' : '-sourceMap';

const config = {
    entry: {
      main: [
        "./scripts/main.js",
        "./styles/main.scss",
      ],
    },
    paths: {
      root: rootPath,
      src: path.join(rootPath, 'src'),
      dist: path.join(rootPath, 'dist'),
    },
    enabled: {
      sourceMaps: !isProduction,
      optimize: isProduction,
      cacheBusting: isProduction,
      watcher: !!argv.watch,
    },
    assetsFilenames: '[name]',
    sourceMapQueryStr: sourceMapQueryStr,
    copy: 'images/**/*',
    proxyUrl: 'http://localhost:3000',
    cacheBusting: '[name]_[hash]',
    watch: [],
    browsers: [
      "last 2 versions",
      "android 4",
      "opera 12",
    ],
};

config.watch.push(`${path.basename(config.paths.src)}/${config.copy}`);
config.watch = uniq(config.watch);

module.exports = merge(config, {
  env: Object.assign({ production: isProduction, development: !isProduction }, argv.env),
  publicPath: `${config.publicPath}/${path.basename(config.paths.dist)}/`,
});
