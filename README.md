# generator-python-lib

[![Build Status](https://travis-ci.org/hbetts/generator-python-lib.svg?branch=master)](https://travis-ci.org/hbetts/generator-python-lib)
[![codecov.io](https://codecov.io/github/hbetts/generator-python-lib/coverage.svg?branch=master)](https://codecov.io/github/hbetts/generator-python-lib?branch=master)
[![Dependency Status](https://david-dm.org/hbetts/generator-python-lib.svg)](https://david-dm.org/hbetts/generator-python-lib)
[![devDependency Status](https://david-dm.org/hbetts/generator-python-lib/dev-status.svg)](https://david-dm.org/hbetts/generator-python-lib#info=devDependencies)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> Generator for boostrapping a Python library.

`generator-python-lib` scaffolds a basic Python library, with a build, and example source files, using your responses to a series of command line prompts.

## Features

* [&#x2713;] Bootstrap [Tox](https://tox.readthedocs.org/en/latest/index.html) configuration file [tox.ini](https://tox.readthedocs.org/en/latest/config.html) to support executing tests against multiple Python interpretors.
* [&#x2713;] Bootstrap Git configuration files, [.gitattributes](https://www.kernel.org/pub/software/scm/git/docs/gitattributes.html) and [.gitignore](https://www.kernel.org/pub/software/scm/git/docs/gitignore.html).
* [&#x2713;] Bootstrap CONTRIBUTING.md file.
* [&#x2713;] Bootstrap [README.md](https://en.wikipedia.org/wiki/README) file.

## Installation

To install `generator-python-lib` from the npm registry run:

```bash
npm install --global generator-python-lib
```

## Usage

Make sure you have the Yeoman CLI tool, `yo`, installed globally. You can install Yeoman via the following command:

```bash
npm install --global yo
```

Now create a new directory to host your project and navigate into it:

```bash
mkdir my-new-lib && cd $_
```

Then run the generator:

```bash
yo python-lib
```

You will be prompted for input that will be used to bootstrap your project. Keep in mind that your responses, and the resulting file contents, can be changed at a later date by re-running the generator.

Once your Python library has been scaffolded create a virtual environment:

```bash
virtualenv --python=python3 venv
```

Next you'll need to activate the virtual environment by sourcing the `activate` script created within the virtual environment directory:

```bash
source ./venv/bin/activate
```

Now your shell environment is configured to expose all tools and libraries installed within the virtual environment. For example, to install the required development tools, run the following:

```bash
pip install -r requirements-dev.txt
```

This installs, among other things, `tox`, which can run your library's unit tests against all versions of Python installed on your system. To run `tox`, and the library's unit tests, run the following:

```bash
python setup.py test
```

For a full list of tasks available through `setup.py` run:

```bash
python setup.py --help-commands
```

## Composability

`generator-python-lib` may be integrated into other Yeoman generators through Yeoman's [composability](http://yeoman.io/authoring/composability.html) feature.

First off you will need to add `generator-python-lib` to your generator's `dependencies`:

```bash
npm install generator-python-lib --save
```

To invoke `generator-python-lib` add the following code to any method in your generator:

```javascript
this.composeWith('python-lib', {
    options: {}
});
```

If passing options to the generator:

```javascript
this.composeWith('python-lib', {
    options: {
        'skip-welcome-message': true
    }
});
```

## Options

`generator-python-lib` supports several options; their default values are listed below.

Options may be provided on the command line, such as passing `--projectName=my-project-name` when calling `generator-python-lib` directly, or via the options argument passed to `composeWith`.

When the value for an option is fetched from the working directory's `.yo-rc.json` file, or passed as a command line argument, this yeoman generator will **not** prompt you for the value.

### skip-welcome-message
**Default:** _UNDEFINED_

Should the generator's welcome message be skipped (suppressed)?

### projectName
**Default:** _[Name of project folder]_

Used as the module name for your Python library,

### fullName
**Default:** _Previously defined value in .yo-rc.json file or UNDEFINED_

Your full name.

### email
**Default:** _Previously defined value in .yo-rc.json file or UNDEFINED_

Contact e-mail for those trying to reach you as the author of the library.

### githubName
**Default:** _Previously defined value in .yo-rc.json file or UNDEFINED_

Your GitHub username.

### ciProvider
**Default:** _Previously defined value in .yo-rc.json file or UNDEFINED_

Continuous Integration provider, such as Travis CI (option value of `Travis CI`).

## Contributing

Read [CONTRIBUTING](CONTRIBUTING.md).
