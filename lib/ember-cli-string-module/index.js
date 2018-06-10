/* eslint-env node */
'use strict';

const Filter = require('broccoli-filter');

FileAsStringModule.prototype = Object.create(Filter.prototype);
FileAsStringModule.prototype.constructor = FileAsStringModule;
FileAsStringModule.prototype.extensions = ['yaml'];
FileAsStringModule.prototype.targetExtension = 'js';

function FileAsStringModule(inputTree, options = {}) {
  Filter.call(this, inputTree, {
    annotation: options.annotation
  });
}

FileAsStringModule.prototype.processString = function (content) {
  return `export default \`${content.replace(/`/g, '\\`')}\`;`;
}

module.exports = {
  name: 'ember-cli-string-module',

  treeForApp: function() {
    return new FileAsStringModule(this.app.trees.app);
  }
};
