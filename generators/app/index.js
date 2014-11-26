'use strict';

var yeoman	= require('yeoman-generator');
var yosay	= require('yosay');

var PythonLibraryGenerator = yeoman.generators.Base.extend({
	constructor: function() {
		yeoman.generators.Base.apply(this, arguments);
	},

	initializing: function() {
		this.pkg = require('../../package.json');
	},

	prompting: function() {
		var done = this.async();

		this.log(yosay(
			'Welcome to the python library generator!'
		));

		var prompts = [
		];

		this.prompt(prompts, function(/* answers */) {
			done();
		}.bind(this));
	},

	writing: {
		buildFiles: function() {
			this.copy('travis.yml', '.travis.yml');
			this.template('_setup.py', 'setup.py');
			this.template('_tox.ini', 'tox.ini');
		},

		gitFiles: function() {
			this.copy('gitattributes', '.gitattributes');
			this.copy('gitignore', '.gitignore');
		},

		projectFiles: function() {
			this.template('_CONTRIBUTING.md', 'CONTRIBUTING.md');
			this.template('_README.md', 'README.md');
		}
	},

	end: function() {
	}
});

module.exports = PythonLibraryGenerator;
