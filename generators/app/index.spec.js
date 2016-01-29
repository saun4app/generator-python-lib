'use strict';

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

describe('python-library:app', function () {

  describe('basic', function () {

    it('should load via require without crashing', function () {
      assert(require(__dirname) !== undefined);
    });
  });

  describe('generating', function () {
    var runGenerator;

    // Because this test suite runs the actual generator, its runtime is dependent on the underlying file system.
    // If writes are slow then the tests will timeout. Therefore we must arbitrarily increase the default Mocha
    // timeout applied to test cases.
    this.timeout(10000);

    beforeEach(function () {
      runGenerator = helpers
        .run(__dirname)
        .withPrompts(PROMPTS)
      ;
    });

    it('creates files', function (done) {
      runGenerator.on('end', function () {
        assert.file(EXPECTED_FILES);

        assert.noFile([
          '.travis.yml',
        ]);

        done();
      });
    });

    it('creates travis CI file', function (done) {
      runGenerator.withPrompts({ ciProvider: 1 }).on('end', function () {
        assert.file(EXPECTED_FILES);

        assert.file([
          '.travis.yml',
        ]);

        done();
      });
    });
  });
});
