/* eslint-env node */
'use strict';

module.exports = function() {
  return {
    // Copy dist output to current directory (so that it can be served by Jekyll)
    cp: {
      destDir: '.'
    }
  };
};
