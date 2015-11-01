'use strict';

var expect = require('chai').expect;
var validators = require('./validators');

describe('validators', function() {
  it('validates a project name', function() {
    expect(validators.validateProjectName('')).to.be.false;
    expect(validators.validateProjectName('validName')).to.be.true;
  });
});
