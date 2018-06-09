'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    codemirror: {
      modes: ['yaml'],
      themes: ['solarized']
    },

    fingerprint: {
      enabled: false
    }
  });

  app.import('node_modules/js-yaml/dist/js-yaml.js', {
    using: [{ transformation: 'amd', as: 'js-yaml' }]
  });

  return app.toTree();
};
