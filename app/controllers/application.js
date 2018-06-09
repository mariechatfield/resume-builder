import Controller from '@ember/controller';
import { PREFILLED_RESUME, BLANK_RESUME } from 'resume-builder/models/resume';
import yaml from 'js-yaml';
import { computed } from '@ember/object';

export default Controller.extend({
  resumeJSON: computed('resumeYAML', function() {
    return yaml.safeLoad(this.get('resumeYAML'));
  }),

  resumeYAML: computed(function() {
    return PREFILLED_RESUME;
  }),

  actions: {
    clear() {
      this.set('resumeYAML', BLANK_RESUME);
    }
  }
});
