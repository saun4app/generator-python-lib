'use strict';

var _ = require('lodash');
var yeoman = require('yeoman-generator');
var validators = require('./validators');

var PythonLibraryGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.option('projectName',
      {
        defaults: this.config.get('projectName') || _.kebabCase(this.appname),
        desc: 'Name of your project.',
        type: 'string',
      }
    );

    this.option(
      'fullName',
      {
        defaults: this.config.get('fullName'),
        desc: 'Your full name.',
        type: String,
      }
    );

    this.option('email',
      {
        defaults: this.config.get('email'),
        desc: 'Your e-mail address.',
        type: String,
      }
    );

    this.option('githubName',
      {
        defaults: this.config.get('githubName'),
        desc: 'Your GitHub username.',
        type: String,
      }
    );

    this.option('ciProvider',
      {
        defaults: this.config.get('ciProvider'),
        desc: 'CI Provider.',
        type: Number,
      }
    );
  },

  initializing: function () {
    this.pkg = require('../../package.json');

    var updateNotifier = require('update-notifier');

    updateNotifier({ pkg: this.pkg }).notify();
  },

  prompting: function () {
    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(require('yosay')(
        'Welcome to the python library generator!'
      ));
    }

    var prompts = [
      {
        default: this.options.projectName,
        message: 'Name of your project',
        name: 'projectName',
        type: 'input',
        validate: validators.validateProjectName,
      },
      {
        default: this.options.fullName,
        message: 'Your full name',
        name: 'fullName',
        type: 'input',
        validate: validators.validateFullName,
      },
      {
        default: this.options.email,
        message: 'Your e-mail address',
        name: 'email',
        type: 'input',
        validate: validators.validateEmail,
      },
      {
        default: this.options.githubName,
        message: 'Your GitHub username',
        name: 'githubName',
        type: 'input',
        validate: validators.validateGithubName,
      },
      {
        default: this.options.ciProvider || 0,
        choices: [
          'None',
          'Travis CI',
        ],
        message: 'Your CI provider',
        name: 'ciProvider',
        type: 'list',
        validate: validators.validateCIProvider,
      },
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

      this.ciProvider = answers.ciProvider;
      this.config.set('ciProvider', this.ciProvider);

      done();
    }.bind(this));
  },

  writing: {
    licenseFiles: function () {
      this.composeWith(
        'license',
        {
          options: {
            name: this.fullName,
            email: this.email,
          },
        },
        {
          local: require.resolve('generator-license'),
        }
      );
    },

    buildFiles: function () {
      this.fs.copyTpl(
        this.templatePath('coveragerc'),
        this.destinationPath('.coveragerc'),
        {
          projectName: this.projectName,
        }
      );
      this.fs.copy(
        this.templatePath('pylintrc'),
        this.destinationPath('.pylintrc')
      );
      this.fs.copy(
        this.templatePath('_requirements-dev.txt'),
        this.destinationPath('requirements-dev.txt')
      );
      this.fs.copy(
        this.templatePath('_requirements.txt'),
        this.destinationPath('requirements.txt')
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
          projectName: this.projectName,
        }
      );
    },

    ciFiles: function () {
      if (this.ciProvider === 'Travis CI') {
        this.fs.copy(
          this.templatePath('travis.yml'),
          this.destinationPath('.travis.yml')
        );
      }
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
      var path = require('path');

      this.fs.write(
        this.destinationPath(this.projectName + '/__init__.py'),
        ''
      );
      this.fs.copy(
        this.templatePath('pkg/_utils.py'),
        this.destinationPath(path.join(this.projectName, 'utils.py'))
      );
      this.fs.copyTpl(
        this.templatePath('tests/_test_utils.py'),
        this.destinationPath('tests/test_utils.py'),
        {
          projectName: this.projectName,
        }
      );
    },

    projectFiles: function () {
      this.fs.copyTpl(
        this.templatePath('_CONTRIBUTING.md'),
        this.destinationPath('CONTRIBUTING.md'),
        {
          githubName: this.githubName,
          projectName: this.projectName,
        }
      );
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        {
          fullName: this.fullName,
          githubName: this.githubName,
          projectName: this.projectName,
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
    },
  },

  end: function () {
  },
});

module.exports = PythonLibraryGenerator;
