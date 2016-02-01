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

## Contributing

Read [CONTRIBUTING](CONTRIBUTING.md).
