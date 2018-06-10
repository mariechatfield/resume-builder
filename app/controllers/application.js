import Controller from '@ember/controller';
import PREFILLED_RESUME from 'resume-builder/models/resumes/marie';
import BLANK_RESUME from 'resume-builder/models/resumes/blank';
import storageAvailable from 'resume-builder/utils/storage-available';
import yaml from 'js-yaml';
import { computed } from '@ember/object';

const RESUME_KEY = 'resume-yaml';

export default Controller.extend({
  resumeJSON: computed('resumeYAML', function() {
    return yaml.safeLoad(this.get('resumeYAML'));
  }),

  resumeYAML: computed('hasLocalStorage', function() {
    if (this.get('hasLocalStorage')) {
      const savedResume = localStorage.getItem(RESUME_KEY);

      if (savedResume) {
        return savedResume;
      }
    }

    return PREFILLED_RESUME;
  }),

  hasLocalStorage: computed(function() {
    return storageAvailable('localStorage');
  }),

  actions: {
    updateResume(newResume) {
      this.set('resumeYAML', newResume);
      if (this.get('hasLocalStorage')) {
        localStorage.setItem(RESUME_KEY, newResume);
      }
    },

    loadSample() {
      this.set('resumeYAML', PREFILLED_RESUME);
      if (this.get('hasLocalStorage')) {
        localStorage.removeItem(RESUME_KEY);
      }
    },

    clear() {
      this.set('resumeYAML', BLANK_RESUME);
      if (this.get('hasLocalStorage')) {
        localStorage.removeItem(RESUME_KEY);
      }
    }
  }
});
