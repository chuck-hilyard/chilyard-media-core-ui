import template from 'common/rl.multi-filter/multi-filter-toolbar.html';

class Controller {
  constructor($scope) {
    this.$scope = $scope;
    this.staged = $scope.settings.stagedFilters;
    this.showSearch = true;
  }

  $onInit() {
    if (angular.isDefined(this.$scope.hideSearch) && this.$scope.hideSearch === 'true') {
      this.showSearch = false;
    }
  }

  create() {
    if (!this.$scope.settings.showFilters) {
      this.$scope.settings.showFilters = true;
    } else {
      this.$scope.settings.addFilter();
    }
  }

  search() {
    if (this.sInput) {
      this.$scope.settings.clearFilters();
      this.staged[0].searchTerm = angular.copy(this.sInput);
      this.$scope.settings.applyStaged();
      this.sInput = '';
      this.$scope.settings.showFilters = true;
    }
  }

}

export default {
  templateUrl: template,
  bindings: {
    settings: '=',
    hideSearch: '@'
  },
  controller: Controller
};
