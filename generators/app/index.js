'use strict';

var _		= require('lodash');
var yeoman	= require('yeoman-generator');
var yosay	= require('yosay');

var PythonLibraryGenerator = yeoman.generators.Base.extend({
	constructor: function () {
		yeoman.generators.Base.apply(this, arguments);

		this.option('projectName',
			{
				defaults: this.config.get('projectName') || _.kebabCase(this.appname),
				desc: 'Name of your project.',
				type: 'string'
			}
		);

		this.option(
			'fullName',
			{
				defaults: this.config.get('fullName'),
				desc: 'Your full name.',
				type: 'string'
			}
		);

		this.option('email',
			{
				defaults: this.config.get('email'),
				desc: 'Your e-mail address.',
				type: 'string'
			}
		);

		this.option('githubName',
			{
				defaults: this.config.get('githubName'),
				desc: 'Your GitHub username.',
				type: 'string'
			}
		);
	},

	initializing: function () {
		this.pkg = require('../../package.json');
	},

	prompting: function () {
		var done = this.async();

		this.log(yosay(
			'Welcome to the python library generator!'
		));

		var prompts = [
			{
				default: this.options.projectName,
				message: 'Name of your project',
				name: 'projectName',
				type: 'input',
				validate: function (answer) {
					return answer.length > 0;
				}
			},
			{
				default: this.options.fullName,
				message: 'Your full name',
				name: 'fullName',
				type: 'input',
				validate: function (answer) {
					return answer.length > 0;
				}
			},
			{
				default: this.options.email,
				message: 'Your e-mail address',
				name: 'email',
				type: 'input',
				validate: function (answer) {
					return answer.length > 0;
				}
			},
			{
				default: this.options.githubName,
				message: 'Your GitHub username',
				name: 'githubName',
				type: 'input',
				validate: function (answer) {
					return answer.length > 0;
				}
			}
		];

		this.prompt(prompts, function (answers) {
			this.projectName = answers.projectName;
			this.config.set('projectName', this.projectName);

			this.fullName = answers.fullName;
			this.config.set('fullName', this.fullName);

			this.email = answers.email;
			this.config.set('email', this.email);

			this.githubName = answers.githubName;
			this.config.set('githubName', this.githubName);

			done();
		}.bind(this));
	},

	writing: {
		buildFiles: function () {
			this.fs.copy(
				this.templatePath('_requirements-dev.txt'),
				this.destinationPath('requirements-dev.txt')
			);
			this.fs.copy(
				this.templatePath('_requirements.txt'),
				this.destinationPath('requirements.txt')
			);
			this.fs.copy(
				this.templatePath('travis.yml'),
				this.destinationPath('.travis.yml')
			);
			this.fs.copyTpl(
				this.templatePath('_setup.py'),
				this.destinationPath('setup.py'),
				{
					email: this.email,
					fullName: this.fullName,
					projectName: this.projectName,
				}
			);
			this.fs.copyTpl(
				this.templatePath('_tox.ini'),
				this.destinationPath('tox.ini'),
				{
					projectName: this.projectName
				}
			);
		},

		gitFiles: function () {
			this.fs.copy(
				this.templatePath('gitattributes'),
				this.destinationPath('.gitattributes')
			);
			this.fs.copy(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore')
			);
		},

		libraryFiles: function () {
			this.fs.write(
				this.destinationPath(this.projectName + '/__init__.py'),
				''
			);
		},

		projectFiles: function () {
			this.fs.copyTpl(
				this.templatePath('_CONTRIBUTING.md'),
				this.destinationPath('CONTRIBUTING.md'),
				{
					githubName: this.githubName,
					projectName: this.projectName
				}
			);
			this.fs.copy(
				this.templatePath('_LICENSE'),
				this.destinationPath('LICENSE')
			);
			this.fs.copyTpl(
				this.templatePath('_README.md'),
				this.destinationPath('README.md'),
				{
					fullName: this.fullName,
					githubName: this.githubName,
					projectName: this.projectName
				}
			);
		},

		testFiles: function () {
			this.fs.write(
				this.destinationPath('tests/__init__.py'),
				''
			);
		},

		configurationFile: function () {
			this.config.set('version', this.pkg.version);
		}
	},

	end: function () {
	}
});

module.exports = PythonLibraryGenerator;
