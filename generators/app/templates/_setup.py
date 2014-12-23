"""
Setup script.
"""

from setuptools import setup
from setuptools.command.test import test as TestCommand
import sys


class Tox(TestCommand):
    user_options = [('tox-args=', 'a', "Arguments to pass to tox.")]

    def initialize_options(self):
        TestCommand.initialize_options(self)
        self.tox_args = ''

    def finalize_options(self):
        TestCommand.finalize_options(self)
        self.test_args = []
        self.test_suite = True

    def run_tests(self):
        import shlex
        import tox
        errno = tox.cmdline(args=shlex.split(self.tox_args))
        sys.exit(errno)

setup(
    description='<%= projectName %>',
    author='<%= fullName %>',
    url='',
    download_url='',
    author_email='<%= email %>',
    version='1.0.0',
    install_requires=[
    ],
    packages=[
        '<%= projectName %>',
    ],
    scripts=[],
    name='<%= projectName %>',
    tests_require=[
        'tox>=1.8.0,<2.0.0',
        'virtualenv>=1.11.6,<2.0.0'
    ],
    cmdclass={
        'test': Tox
    }
)
