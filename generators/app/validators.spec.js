'use strict';

var expect = require('chai').expect;
var validators = require('./validators');

describe('validators', function() {
  it('validates a project name', function() {
    expect(validators.validateProjectName('')).to.be.false;
    expect(validators.validateProjectName('validName')).to.be.true;
  });

  it('validates a full name', function() {
    expect(validators.validateFullName('')).to.be.false;
    expect(validators.validateFullName('Full Name')).to.be.true;
  });

  it('validates email', function() {
    expect(validators.validateEmail('')).to.be.false;
    expect(validators.validateEmail('name@example.com')).to.be.true;
  });

  it('validates a GitHub user name', function() {
    expect(validators.validateGithubName('')).to.be.false;
    expect(validators.validateGithubName('userName')).to.be.true;
  });

  it('validates CI provider', function() {
    expect(validators.validateCIProvider(-1)).to.be.false;
    expect(validators.validateCIProvider(0)).to.be.true;
  });
});
