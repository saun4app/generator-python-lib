'use strict';

var gulp = require('gulp');

var paths = {
  lintFiles: [
    'gulpfile.js',
    'generators/**/*.js',
    '!generators/**/*.spec.js',
    '!generators/**/templates/**/*.*',
  ],

  documentationFiles: [
    'README.md',
    'generators/**/*.js',
    '!generators/**/*.spec.js',
    '!generators/**/templates/**/*.*',
  ],

  sourceFiles: [
    'generators/**/*.js',
    '!generators/**/*.spec.js',
    '!generators/**/templates/**/*.*',
  ],

  templateFiles: [
    'generators/**/templates/',
  ],

  testFiles: [
    'generators/**/*.spec.js',
    '!generators/**/templates/**/*.*',
  ],
};

/*
 * Clean up coverage directory.
 */
gulp.task('clean:coverage', function () {
  var del = require('del');

  return del([
    'coverage/',
  ]);
});

/*
 * Clean up docs directory.
 */
gulp.task('clean:docs', function () {
  var del = require('del');

  return del([
    'docs/',
  ]);
});

/*
 * Execute unit and integration tests and generate a coverage reports.
 */
gulp.task('test', ['clean:coverage'], function (done) {
  var istanbul = require('gulp-istanbul');
  var mocha    = require('gulp-mocha');

  gulp.src(paths.sourceFiles)
    .pipe(istanbul({ includeUntested: true }))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(paths.testFiles)
        .pipe(mocha({
          reporter: ['progress'],
        }))
        .pipe(istanbul.writeReports({
          reporters: ['text', 'lcov'],
        }))
        .on('end', done)
      ;
    });
});

/*
 * Run source files through JSCS style checks.
 */
gulp.task('jscs', function () {
  var jscs = require('gulp-jscs');

  return gulp.src(paths.lintFiles)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
  ;
});

/*
 * Generate source documentation.
 */
gulp.task('docs', ['clean:docs'], function (done) {
  var jsdoc = require('gulp-jsdoc3');

  gulp.src(paths.documentationFiles, { read: false })
    .pipe(jsdoc(JSON.parse(require('fs').readFileSync('./.jsdocrc'))), done)
  ;
});

/*
 * Run source files through JSHint lint checks.
 */
gulp.task('jshint', function () {
  var jshint = require('gulp-jshint');

  return gulp.src(paths.lintFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
  ;
});

/*
 * Watch for file changes to either source, or test, files, and execute the appropriate task(s) associated with the
 * changed file(s).
 */
gulp.task('serve', ['default'], function () {
  var watch = require('gulp-watch');

  watch(paths.documentationFiles, function () {
    gulp.start('docs');
  });

  watch(paths.lintFiles, function () {
    gulp.start('jshint');
    gulp.start('jscs');
  });

  watch(paths.sourceFiles.concat(paths.testFiles), function () {
    gulp.start('test');
  });
});

gulp.task('default', ['jscs', 'jshint', 'test', 'docs']);
