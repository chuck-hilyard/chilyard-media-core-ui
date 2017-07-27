import Template from './date-range.html';


class Controller {
  constructor(DateRangeService, Session, $uibModal) {
    'ngInject';
    this.service = DateRangeService;
    this.session = Session;
    this.$uibModal = $uibModal;
  }

  $onInit() {
    this.dateRanges = angular.copy(this.service.ranges);
    if (angular.isDefined(this.cycles)) {
      let thisCycle = angular.copy(this.cycles[0]);
      thisCycle.name = 'This Cycle';
      let lastCycle = angular.copy(this.cycles[1]);
      lastCycle.name = 'Last Cycle';
      this.dateRanges.unshift(thisCycle, lastCycle);
      this.session.dateRange = angular.copy(this.dateRanges[1]);
    }
    else {
      this.session.dateRange = angular.copy(this.dateRanges[2]);
    }
  }

  dateModal() {
    let instance = this.$uibModal.open({
      component: 'rlDateRangeModal',
      size: 'lg',
      resolve: {
        cycles: () => this.cycles,
        range: () => this.session.dateRange,
        ranges: () => this.dateRanges
      }
    });

    instance.result
      .then((response) => {
        this.session.dateRange = angular.copy(response.range);
      })
      .catch(() => {
        // Prevent unhandled rejection error
        angular.noop();
      });
  }
}

export default {
  template: Template,
  controller: Controller,
  bindings: {
    cycles: '<'
  }
};
