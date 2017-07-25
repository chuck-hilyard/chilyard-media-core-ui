import Template from './date-range.html';


class Controller {
  constructor(DateRangeService, Session, $uibModal) {
    'ngInject';
    this.service = DateRangeService;
    this.session = Session;
    this.$uibModal = $uibModal;
  }

  showField(field) {
    return field; //this.service.showField();
  }

  $onInit() {
    this.service.setRanges(this.cycles);
    this.dateRanges = angular.copy(this.service.ranges);
    if (angular.isDefined(this.cycles)) {
      this.session.dateRange = angular.copy(this.dateRanges.cycles[0]);
    }
    else {
      this.session.dateRange = angular.copy(this.dateRanges.days[2]);
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
