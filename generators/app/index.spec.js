'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var PROMPTS = {
  projectName: 'test',
  name: 'Full Name',
  email: 'name@example.com',
  website: 'www.example.com',
  license: 'Apache-2.0',
};

var EXPECTED_FILES = [
  '.gitattributes',
  '.gitignore',
  'CONTRIBUTING.md',
  'README.md',
  'setup.py',
  'tox.ini',
];

describe('python-library:app', function() {
  var runGenerator;

  describe('basic', function() {

    it('should load via require without crashing', function() {
      assert(require(path.join(__dirname, './')) !== undefined);
    });
  });

  describe('generating', function() {

    beforeEach(function() {
      runGenerator = helpers
        .run(path.join(__dirname, './'))
        .withPrompts(PROMPTS)
      ;
    });

    it('creates files', function(done) {
      runGenerator.on('end', function() {
        assert.file(EXPECTED_FILES);

        assert.noFile([
          '.travis.yml',
        ]);

        done();
      });
    });

    it('creates travis CI file', function(done) {
      runGenerator.withPrompts({ ciProvider: 1 }).on('end', function() {
        assert.file(EXPECTED_FILES);

        assert.file([
          '.travis.yml',
        ]);

        done();
      });
    });
  });
});
