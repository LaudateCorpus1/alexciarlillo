var gulp    = require('gulp');
var config  = require('../config').clean;

gulp.task('clean', require('del').bind(null, [config.dest]));