/**
 * A lightweight object for attaching multiple filters on your data. It stores the filter options
 * for use by the rlMultiFilter directive and the multiFilter filter.
 * How to use:
 *
 * 1. Create the FilterSettings object in your controller.
 * 2. Pass the object to the rlMultiFilter directive.
 * 3. Pass the object to the multiFilter filter on the data you're trying to filter.
 *
 * Example:
 * In your controller:
 * $scope.filterSettings = MultiFilterSettings.build();
 *
 * In your view (directive):
 * <rl-multi-filter label="Keyword" settings="filterSettings"></rl-multi-filter>
 *
 * In your view (filter in ng-repeat):
 * <tr ng-repeat="row in table | multiFilter:filterSettings:'searchKey'">
 *
 */
export default class Service {

  constructor() {
    'ngInject';
  }

  build(defaultSettings) {
    return new FilterSettings(defaultSettings);
  }

  parseAdditional(obj) {
    let output = {};
    angular.forEach(obj.additionalFilters, function (filter) {
      let selected = obj.filters.filter((objFilter) => {
        return objFilter.type === filter.type;
      });
      output[filter.type] = [];
      if (selected.length > 0) {
        angular.forEach(selected, function (value) {
          output[filter.type].push(value.option);
        });
      }
    });
    return output;
  }
}

class FilterSettings {
  constructor(defaultSettings) {
    this.filterOptions = [
      new Comparator('contains', function(haystack, needle) {
        return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
      }),
      new Comparator('does not contain', function(haystack, needle) {
        return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) === -1;
      }),
      new Comparator('is', function(haystack, needle) {
        return haystack.toString().toLowerCase() == needle.toLowerCase();
      }),
      new Comparator('starts with', function(haystack, needle) {
        return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) === 0;
      })
    ];

    this.numericOptions = [
      new Comparator('=', null),
      new Comparator('≤', null),
      new Comparator('≥', null)
    ];

    this.filterSettings = {
      'comparator': 'text',
      'input': 'text'
    };
    this.defaultComparator = this.filterOptions[0];
    if (angular.isDefined(defaultSettings)) {
      this.filterSettings = defaultSettings;
      if (defaultSettings.comparator.number) {
        this.defaultComparator = this.numericOptions[0];
      }
    }


    this.showFilters = false;
    this.filters = [];
    this.stagedFilters = [];
    this.addFilter();
    this.applyStaged();
  }

  applyStaged() {
    this.filters = angular.copy(this.stagedFilters);
  }

  addFilter() {
    this.stagedFilters.push(new Filter(this.filterSettings, this.defaultComparator));
  }


  clearFilters() {
    this.stagedFilters.splice(0, this.stagedFilters.length, new Filter(this.filterSettings, this.filterOptions[0]));
    this.applyStaged();
    this.showFilters = false;
  }
}

class Comparator {
  constructor(label, func) {
    this.label = label;
    this.comparatorFunc = func;
  }
}

class Filter {
  constructor(defaultSettings, defaultComparator) {
    this.type = 'default';
    this.settings = defaultSettings;
    this.comparator = defaultComparator;
    this.searchTerm = '';
  }
}
