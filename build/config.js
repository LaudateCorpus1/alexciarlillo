const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const isProduction = !!((argv.env && argv.env.production) || argv.p);
const rootPath = process.cwd();
const dist = path.join(rootPath, 'dist');
const src = path.join(rootPath, 'src');
const sourceMapQueryStr = (!isProduction) ? '+sourceMap' : '-sourceMap';

const config = {
    entry: "./scripts/main.js",
    paths: {
      root: rootPath,
      src: src,
      dist: dist,
    },
    enabled: {
      sourceMaps: !isProduction,
      optimize: isProduction,
      cacheBusting: isProduction,
      watcher: !!argv.watch,
    },
    assetsFilenames: '[name]',
    sourceMapQueryStr: sourceMapQueryStr,
    env: Object.assign({ production: isProduction, development: !isProduction }, argv.env),
    publicPath: `/`,
    copy: 'images/**/*',
    proxyUrl: 'http://localhost:3000',
    cacheBusting: '[name]_[hash]',
    watch: [`${path.basename(src)}/images/**/*`],
    "browsers": [
    "last 2 versions",
    "android 4",
    "opera 12"
  ]
};

module.exports = config;
