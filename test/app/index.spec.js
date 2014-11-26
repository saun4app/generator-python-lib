'use strict';

var path	= require('path');
var assert	= require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os		= require('os');

var PROMPTS = {
	projectName: 'test'
};

var EXPECTED_FILES = [
	'.gitattributes',
	'.gitignore',
	'.travis.yml',
	'CONTRIBUTING.md',
	'README.md',
	'setup.py',
	'tox.ini'
];

describe('python-library:app', function() {
	var runGenerator;

	describe('basic', function() {

		it('should load via require without crashing', function() {
			require(path.join(__dirname, '../../generators/app'));
		});
	});

	describe('generating', function() {

		beforeEach(function() {
			runGenerator = helpers.run(path.join(__dirname, '../../generators/app'))
			.inDir(path.join(os.tmpdir(), 'generator-python-library-test'))
			.withPrompt(PROMPTS)
			;
		});

		afterEach(function() {
			// Must set directory back to root of project to ensure other
			// processes will execute within the correct context.
			process.chdir(path.join(__dirname, '../../'));
		});

		it('creates files', function(done) {
			runGenerator.on('end', function() {
				assert.file(EXPECTED_FILES);

				done();
			});
		});
	});
});
