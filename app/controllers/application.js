import Controller from '@ember/controller';
import PREFILLED_RESUME from 'resume-builder/models/resumes/marie';
import BLANK_RESUME from 'resume-builder/models/resumes/blank';
import storageAvailable from 'resume-builder/utils/storage-available';
import yaml from 'js-yaml';
import { computed } from '@ember/object';

const RESUME_STORAGE_KEY = 'resume-yaml';
const FONT_SIZE_STORAGE_KEY = 'font-size';
const MARGIN_SIZE_STORAGE_KEY = 'margin-size';

const FONT_SIZE_CSS_PROPERTY = '--font-size';
const MARGIN_SIZE_CSS_PROPERTY = '--print-margin';

function getDefaultStyle(property) {
  return getComputedStyle(document.body).getPropertyValue(property);
}

function overrideStyle(property, value) {
  document.body.style.setProperty(property, value);
}

export default Controller.extend({
  resumeJSON: computed('resumeYAML', function() {
    try {
      return yaml.safeLoad(this.get('resumeYAML'));
    } catch (e) {
      return null;
    }
  }),

  resumeYAML: computed('hasLocalStorage', function() {
    if (this.get('hasLocalStorage')) {
      const savedResume = localStorage.getItem(RESUME_STORAGE_KEY);

      if (savedResume) {
        return savedResume;
      }
    }

    return PREFILLED_RESUME;
  }),

  hasLocalStorage: computed(function() {
    return storageAvailable('localStorage');
  }),

  defaultFontSize: computed(function() {
    return Number(getDefaultStyle(FONT_SIZE_CSS_PROPERTY));
  }),

  defaultMarginSize: computed(function() {
    return Number(getDefaultStyle(MARGIN_SIZE_CSS_PROPERTY));
  }),

  fontSize: computed('defaultFontSize', {
    get() {
      if (this.get('hasLocalStorage')) {
        const savedFontSize = localStorage.getItem(FONT_SIZE_STORAGE_KEY);

        if (savedFontSize) {
          return Number(savedFontSize);
        }
      }

      return this.get('defaultFontSize');
    },

    set(key, value) {
      overrideStyle(FONT_SIZE_CSS_PROPERTY, value);
      return value;
    }
  }),

  marginSize: computed('defaultMarginSize', {
    get() {
      if (this.get('hasLocalStorage')) {
        const savedMarginSize = localStorage.getItem(MARGIN_SIZE_STORAGE_KEY);

        if (savedMarginSize) {
          return Number(savedMarginSize);
        }
      }

      return this.get('defaultMarginSize');
    },

    set(key, value) {
      overrideStyle(MARGIN_SIZE_CSS_PROPERTY, value);
      return value;
    }
  }),

  _reset() {
    this.setProperties({
      fontSize: this.get('defaultFontSize'),
      marginSize: this.get('defaultMarginSize')
    });

    if (this.get('hasLocalStorage')) {
      localStorage.removeItem(RESUME_STORAGE_KEY);
      localStorage.removeItem(FONT_SIZE_STORAGE_KEY);
      localStorage.removeItem(MARGIN_SIZE_STORAGE_KEY);
    }
  },

  actions: {
    updateResume(newResume) {
      this.set('resumeYAML', newResume);
      if (this.get('hasLocalStorage')  && newResume !== BLANK_RESUME) {
        localStorage.setItem(RESUME_STORAGE_KEY, newResume);
      }
    },

    loadSample() {
      this.set('resumeYAML', PREFILLED_RESUME);
      this._reset();
    },

    clear() {
      this.set('resumeYAML', BLANK_RESUME);
      this._reset();
    },

    modifyFontSize(fontSize) {
      this.set('fontSize', fontSize);

      if (this.get('hasLocalStorage')) {
        localStorage.setItem(FONT_SIZE_STORAGE_KEY, fontSize);
      }
    },

    modifyMarginSize(marginSize) {
      this.set('marginSize', marginSize);

      if (this.get('hasLocalStorage')) {
        localStorage.setItem(MARGIN_SIZE_STORAGE_KEY, marginSize);
      }
    }
  }
});
