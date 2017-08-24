import template from './multi-filter-toolbar.html';
const me = 'MultiFilter Toolbar';

class Controller {
  constructor(rlLogger) {
    'ngInject';
    this.showSearch = true;
    this.Logger = rlLogger;
  }

  $onInit() {
    this.staged = this.settings.stagedFilters;
    if (angular.isDefined(this.hideSearch) && this.hideSearch === 'true') {
      this.showSearch = false;
    }
  }

  $onChanges(changes) {
    this.Logger.trace('$onChanges', changes, me);
    if (changes.settings) {
      this.settings = changes.settings.currentValue;
    }
  }

  create() {
    if (!this.settings.showFilters) {
      this.settings.showFilters = true;
    }
    else {
      this.settings.addFilter();
    }
    this.updateSettings(this.settings);
  }

  search() {
    if (this.sInput) {
      this.settings.clearFilters();
      this.staged[0].searchTerm = angular.copy(this.sInput);
      this.settings.applyStaged();
      this.sInput = '';
      this.settings.showFilters = true;
      this.updateSettings(this.settings);
    }
  }

}

export default {
  template: template,
  bindings: {
    settings: '<',
    hideSearch: '@',
    updateSettings: '&'
  },
  controller: Controller
};
