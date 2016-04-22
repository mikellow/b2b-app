var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');


var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});

function notifyLiveReload(event) {
  console.log('notify executed')
  var fileName = require('path').relative(__dirname, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}



gulp.task('express', function() {
  var express = require('express');
  var app = express();
  //app.use(require('connect-livereload')({port: 4002}));
  app.use(require('connect-livereload')({port: 4002}));
  //app.use(require('connect-livereload')());
  app.use(express.static(__dirname));
  app.listen(4000, '0.0.0.0');
});

gulp.task('styles', function() {
  return sass('sass', { style: 'expanded' })
    .pipe(gulp.dest('app/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {

  gulp.watch('sass/*.scss', ['styles']);
  gulp.watch('app/*.html', notifyLiveReload);
  gulp.watch('app/js/*.js', notifyLiveReload);
  gulp.watch('app/**/*.html', notifyLiveReload);
  gulp.watch('app/css/*.css', notifyLiveReload);
});

gulp.task('default', ['express','livereload','watch'], function() {

});