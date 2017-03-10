import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import path from 'path';
import glob from 'glob';
import PurifyCSSPlugin from 'purifycss-webpack';
import cssnano from 'cssnano';

import config from './config';

export default {
  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        autoprefixer: { browsers: config.browsers },
      },
      canPrint: true,
    }),
    new ImageminPlugin({
      optipng: { optimizationLevel: 7 },
      gifsicle: { optimizationLevel: 3 },
      svgo: { removeUnknownsAndDefaults: false, cleanupIDs: false },
      plugins: [imageminMozjpeg({ quality: 75 })],
      disable: (config.enabled.watcher),
    }),
    new PurifyCSSPlugin({
      paths: [].concat.apply([],
                config.purify.map((items) => {
                  return glob.sync(path.join(config.paths.src, items));
                })),
    }),
  ],
};
