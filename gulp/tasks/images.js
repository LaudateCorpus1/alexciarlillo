var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var imagemin     = require('gulp-imagemin');
var config       = require('../config').images;

gulp.task('images', function() { 
    return gulp.src(config.src) 
        .pipe(imagemin({
          progressive: true,
          interlaced: true,
          svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.stream());
});