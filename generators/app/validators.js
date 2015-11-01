'use strict';

module.exports = {
  validateProjectName: function validateProjectName(projectName) {
    return projectName.length > 0;
  },

  validateFullName: function validateFullName(fullName) {
    return fullName.length > 0;
  },

  validateEmail: function validateEmail(email) {
    return email.length > 0;
  },

  validateGithubName: function validateGithubName(githubName) {
    return githubName.length > 0;
  },

  validateCIProvider: function validateCIProvider(ciProvider) {
    return ciProvider >= 0;
  },
};
