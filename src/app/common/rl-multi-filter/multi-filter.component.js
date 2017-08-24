import template from './multi-filter.html';
const me = 'MultiFilter';

class Controller {
  constructor(rlLogger) {
    'ngInject';
    this.collapsed = false;
    this.readableFilters = '';
    this.filterSettings = {};
    this.Logger = rlLogger;
  }

  $onInit() {
    this.staged = this.settings.stagedFilters;
    this.options = this.settings.filterOptions;
    this.numericOptions = this.settings.numericOptions;
    this.additionalFilters = this.settings.additionalFilters || [];
    this.gatherSettings();
    this.updateFilter(this.staged.length - 1);
  }

  $onChanges(changes) {
    this.Logger.trace('$onChanges', changes, me);
    if (changes.settings) {
      this.settings = changes.settings.currentValue;
    }
  }

  show() {
    return this.settings.showFilters;
  }

  add() {
    this.settings.addFilter();
    this.updateFilter( this.staged.length - 1 );
  }

  updateFilter(idx) {
    let filterType = this.staged[idx].type;
    let filterSettings = this.filterSettings[filterType];
    this.staged[idx].settings = filterSettings.settings;
    if (filterSettings.settings.input == 'select') {
      this.staged[idx].searchTerm = '';
      this.staged[idx].option = filterSettings.options[0];
    }
    else {
      delete this.staged[idx].option;
    }
    if ( this.staged[idx].settings.comparator == 'text' ) {
      this.staged[idx].comparator = this.settings.filterOptions[0];
    }
    else if ( this.staged[idx].settings.comparator == 'number' ) {
      this.staged[idx].comparator = this.settings.numericOptions[0];
    }
  }

  remove(idx) {
    this.staged.splice(idx, 1);
  }

  applyFilters() {
    this.settings.applyStaged();
    this.updateSettings(this.settings);
    this.apply();
  }

  clear() {
    this.settings.clearFilters();
    this.apply();
  }

  gatherSettings() {
    let self = this;
    this.filterSettings.default = {
      type: 'default',
      label: this.label,
      settings: this.settings.filterSettings
    };
    if ( angular.isDefined(this.settings.filterSettings.options) ) {
      this.filterSettings.default.options = this.settings.filterSettings.options;
    }
    if (this.additionalFilters.length > 0) {
      angular.forEach(this.additionalFilters, function (value) {
        self.filterSettings[value.type] = value;
      });
    }
  }

  parseFilters() {
    this.readableFilters = '';
    angular.forEach(this.settings.filters, function(value, index) {
      this.readableFilters += this.filterSettings[value.type].label + ' ';

      if (value.settings.comparator == 'none') {
        this.readableFilters += 'is ';
      }
      else {
        this.readableFilters += value.comparator.label + ' ';
      }

      if (value.settings.input == 'text') {
        this.readableFilters += '<b>' + value.searchTerm + '</b>';
      }

      if (value.option) {
        this.readableFilters += '<b>' + value.option.label + '</b>';
      }

      if ((index + 1) != this.settings.filters.length) {
        this.readableFilters += ', ';
      }
    });
  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    settings: '<',
    label: '@',
    apply: '&',
    updateSettings: '&'
  }
};
