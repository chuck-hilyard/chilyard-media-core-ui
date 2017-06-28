import Template from './modal.html';


class Controller {
  constructor($scope) {
    'ngInject';
    $scope.$watchCollection(() => this.range, (newValue) => {
      this.getRangeName();
      this.options.start.maxDate = newValue.end;
      this.options.end.minDate = newValue.start;
    });
  }

  $onInit() {
    this.range = angular.copy(this.resolve.range);
    this.ranges = angular.copy(this.resolve.ranges);
    this.options = {
      start: {
        customClass: (data) => this.customClass(data),
        maxDate: this.range.end,
        showWeeks: false
      },
      end: {
        customClass: (data) => this.customClass(data),
        minDate: this.range.start,
        maxDate: new Date(),
        showWeeks: false
      }
    };
  }

  cancel() {
    this.dismiss();
  }

  customClass(data) {
    let cycles = this.resolve.cycles;
    if(angular.isDefined(cycles) && data.mode === 'day') {
      let dayToCheck = new Date(data.date).setHours(0,0,0,0);
      let match = cycles.find((cycle) => {
        let start = new Date(cycle.start).setHours(0,0,0,0) === dayToCheck;
        let end = new Date(cycle.end).setHours(0,0,0,0) === dayToCheck;
        return start || end;
      });
      if (angular.isDefined(match)) {
        return 'bookend';
      }
    }
    return '';

  }

  getRangeName() {
    let match = this.ranges.cycles.find((range) => {
      let start = this.range.start.getTime() === range.start.getTime();
      let end = this.range.end.getTime() === range.end.getTime();
      return start && end;
    });
    this.range.name = angular.isDefined(match) ? match.name : null;
  }

  setRange(range) {
    this.range = angular.copy(range);
  }

  update() {
    this.close({
      $value: {
        range: this.range
      }
    });
  }

}

export default {
  template: Template,
  controller: Controller,
  bindings: {
    close: '&',
    dismiss: '&',
    resolve: '<'
  }
};
