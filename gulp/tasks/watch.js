var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch', ['build', 'watchify','browserSync'], function(callback) {
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.pug.src,   ['pug-watch']);
  gulp.watch(config.images.src, ['images']);
});
