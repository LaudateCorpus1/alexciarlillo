var gulp        = require('gulp');
var browserSync = require('browser-sync');
var pug        = require('gulp-pug');
var notify       = require('gulp-notify');
var config      = require('../config').pug;

gulp.task('pug', function() {
    return gulp.src(config.compile)
        .pipe(pug({pretty: true}))
        .on('error', notify.onError({
          title: "Pug Compile Error",
          message: "<%= error.message %>"
        }))
        .pipe(gulp.dest(config.dest));
});

gulp.task('pug-watch', ['pug'], browserSync.reload);
