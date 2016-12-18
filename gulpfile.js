var gulp        = require('gulp');
var requireDir  = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

// Expose runnable and default tasks here
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
gulp.task('build', ['browserify', 'sass', 'icons', 'pug', 'images']);
