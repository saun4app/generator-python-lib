'use strict';

var gulp = require('gulp');

var paths = {
	lintFiles: [
		'gulpfile.js',
		'generators/**/*.js',
		'!generators/**/templates/*.*',
		'test/**/*.spec.js'
	],

	documentationFiles: [
		'README.md',
		'generators/**/*.js',
		'!generators/**/templates/*.*',
	],

	sourceFiles: [
		'generators/**/*.js',
		'!generators/**/templates/'
	],

	templateFiles: [
		'generators/**/templates/'
	],

	testFiles: [
		'test/**/*.spec.js'
	]
};

var instrumentCode = (function() {
	var istanbul	= require('gulp-istanbul');
	var lazypipe	= require('lazypipe');

	function tapAllFiles() {
		var tap			= require('gulp-tap');

		return tap(function(file) {
			require(file.path);
		});
	}

	return lazypipe()
	.pipe(istanbul)
	.pipe(tapAllFiles)
	;
})();

/*
 * Clean up build directories.
 */
gulp.task('clean', function(done) {
	var del = require('del');

	del([
		'coverage/',
		'docs/'
	], done);
});

/*
 * Generator a Cobertura coverage report.
 * TODO
 */
gulp.task('coverage:cobertura', [ 'test:unit' ], function() {
	var istanbul	= require('gulp-istanbul');
	var mocha		= require('gulp-mocha');

	return gulp.src(paths.sourceFiles)
	.pipe(instrumentCode())
	.on('end', function() {
		return gulp.src(paths.testFiles)
		.pipe(mocha())
		.pipe(istanbul.writeReports({
			reporters: [ 'text' ]
		}))
		;
	})
	;
});

/*
 * Generate a text-based coverage report.
 * TODO
 */
gulp.task('coverage:text', [ 'test:unit' ], function() {
});

/*
 * Run source files through JSCS style checks.
 */
gulp.task('jscs', function() {
	var jscs = require('gulp-jscs');

	return gulp.src(paths.lintFiles)
	.pipe(jscs())
	// TODO Fail the build if JSCS errors are encountered.
	;
});

/*
 * Generate source documentation.
 * TODO
 */
gulp.task('jsdoc', [ 'clean' ], function() {
	var jsdoc = require('gulp-jsdoc');

	return gulp.src(paths.documentationFiles)
	.pipe(jsdoc(
		'docs/',
		{
			path: 'ink-docstrap'
		}
	))
	;
});

/*
 * Run source files through JSHint lint checks.
 */
gulp.task('jshint', function() {
	var jshint	= require('gulp-jshint');

	return gulp.src(paths.lintFiles)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	// TODO Fail the build if JSHint errors are encountered.
	;
});

/*
 * Run unit tests.
 */
gulp.task('test:unit', [ 'clean' ], function() {
	var istanbul	= require('gulp-istanbul');
	var mocha		= require('gulp-mocha');

	return gulp.src(paths.sourceFiles)
	.pipe(instrumentCode())
	.on('end', function() {
		return gulp.src(paths.testFiles)
		.pipe(mocha())
		.pipe(istanbul.writeReports({
			reporters: [ 'text' ]
		}))
		;
	})
	;
});

/*
 * Generate a release of this product.
 * TODO
 */
gulp.task('release', function() {
});

/*
 * Watch for file changes to either source, or test, files, and execute the appropriate task(s) associated with the
 * changed file(s).
 * TODO
 */
gulp.task('serve', [ 'default' ], function() {
	var watch = require('gulp-watch');

	watch(paths.lintFiles, function() {
		gulp.start('jshint');
		gulp.start('jscs');
	});

	watch(paths.templateFiles.concat(paths.sourceFiles).concat(paths.testFiles), function() {
		gulp.start('test:unit');
	});
});

/*
 * Run a default build.
 */
gulp.task('default', [ 'clean', 'jscs', 'jshint', 'test:unit', 'jsdoc' ]);
