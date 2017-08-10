import template from './multi-filter.html';

class Controller {
  constructor($scope, $log) {
    'ngInject';
    this.collapsed = false;
    this.readableFilters = '';
    this.$scope = $scope;
    // $scope.settings = MultiFilterSettings;
    this.filterSettings = {};
    this.$log = $log;
  }

  $onInit() {
    this.staged = this.settings.stagedFilters;
    this.options = this.settings.filterOptions;
    this.numericOptions = this.settings.numericOptions;
    this.additionalFilters = this.settings.additionalFilters || [];
    this.gatherSettings();
    let self = this;
    this.$scope.$watch('settings.filters', function(newValue) {
      self.$log.log('settings.filter', newValue);
      if (newValue && newValue.length > 0) {
        this.parseFilters();
      }
    }, true);
    this.update( this.staged.length - 1 );
  }

  show() {
    return this.settings.showFilters;
  }

  add() {
    this.settings.addFilter();
    this.update( this.staged.length - 1 );
  }

  update(idx) {
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

  apply() {
    this.settings.applyStaged();
  }

  clear() {
    this.settings.clearFilters();
  }

  gatherSettings() {
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
        this.filterSettings[value.type] = value;
      });
    }
  }

  tarseFilters() {
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
    settings: '=',
    label: '@'
  }
};
