'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var uglify = require('gulp-uglify');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var isDev = true;
var isBuild = false;

gulp.task('html', function() {
  return gulp.src('dev/index.html')
    .pipe(server.stream())
});

gulp.task('css', function () {
  return gulp.src('dev/css/style.css')
    .pipe(server.stream());
});

gulp.task('js', function() {
  return gulp.src('dev/js/app.js')
    .pipe(server.stream())
});

gulp.task('server', function () {
  server.init({
    server: 'dev/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('dev/css/style.css', gulp.series('css'));
  gulp.watch('dev/index.html', gulp.series('html'));
  gulp.watch('dev/js/app.js', gulp.series('js'));
  gulp.watch('dev/index.html').on('change', server.reload);
});

gulp.task('default', gulp.series('server'));