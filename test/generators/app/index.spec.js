'use strict';

var path	= require('path');
var assert	= require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

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
			assert(require(path.join(__dirname, '../../../generators/app')) !== undefined);
		});
	});

	describe('generating', function() {

		beforeEach(function() {
			runGenerator = helpers.run(path.join(__dirname, '../../../generators/app'))
			.withPrompt(PROMPTS)
			;
		});

		it('creates files', function(done) {
			runGenerator.on('end', function() {
				assert.file(EXPECTED_FILES);

				done();
			});
		});
	});
});
