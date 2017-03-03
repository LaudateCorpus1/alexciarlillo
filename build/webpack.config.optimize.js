import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import imageminMozjpeg from 'imagemin-mozjpeg';
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
      pngquant: { quality: '65-90', speed: 4 },
      svgo: { removeUnknownsAndDefaults: false, cleanupIDs: false },
      plugins: [imageminMozjpeg({ quality: 75 })],
      disable: (config.enabled.watcher),
    }),
  ],
};
