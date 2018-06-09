/* eslint-env node */
'use strict';

module.exports = function() {
  return {
    // Deploy changes to GitHub Pages
    git: {
      commitMessage: 'Deployed %@'
    }
  };
};
