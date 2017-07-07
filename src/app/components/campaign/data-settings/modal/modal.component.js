import Template from './modal.html';


class Controller {
  constructor($scope, DataSettingsService) {
    'ngInject';
    this.dataSettingsService = DataSettingsService;
    this.monthsEnabled = true;
    this.daysEnabled = false;
    this.customRangeName = DataSettingsService.customRangeName;
    $scope.$watchCollection(() => this.workingSettings, (newValue) => {
      this.getRangeName();
      this.options.start.maxDate = newValue.end;
      this.options.end.minDate = newValue.start;
    });
  }

  $onInit() {
    this.workingSettings = angular.copy(this.resolve.settings);
    this.ranges = angular.copy(this.resolve.ranges);
    this.dateLimits = this.dataSettingsService.getDateLimits(this.resolve.cycles);
    this.options = this.getDatepickerOptions();
  }

  getDatepickerOptions(){
    return {
      start: {
        customClass: (data) => this.customClass(data),
        minDate: this.dateLimits.minDate,
        maxDate: this.workingSettings.end,
        showWeeks: false
      },
      end: {
        customClass: (data) => this.customClass(data),
        minDate: this.workingSettings.start,
        maxDate: this.dateLimits.maxDate,
        showWeeks: false
      }
    };
  }

  cancel() {
    this.dismiss();
  }

  selectTab(tabName){
    if (this.workingSettings.breakdownType !== tabName){
      this.workingSettings = this.dataSettingsService.getDefault(tabName);
    }
  }

  customClass(data) {
    let cycles = this.resolve.cycles.cycles;
    if (angular.isDefined(cycles) && data.mode === 'day') {
      let dayToCheck = new Date(data.date).setHours(0, 0, 0, 0);
      let match = cycles
        .find((cycle) => {
          let start = new Date(cycle.start).setHours(0, 0, 0, 0) === dayToCheck;
          let end = new Date(cycle.end).setHours(0, 0, 0, 0) === dayToCheck;
          return start || end;
        });
      if (angular.isDefined(match)) {
        return 'bookend';
      }
    }
    return '';
  }

  getRangeName() {
    let match = this.dataSettingsService.findRange(this.ranges, this.workingSettings);
    /*
    let match = this.ranges.cycles.find((range) => {
      let start = this.range.start.getTime() === range.start.getTime();
      let end = this.range.end.getTime() === range.end.getTime();
      return start && end;
    });
    */
    this.workingSettings.name = angular.isDefined(match) ? match.name : null;
  }

  setRange(workingSettings) {
    this.workingSettings = angular.copy(workingSettings);
  }

  update() {
    this.close({
      $value: {
        settings: this.workingSettings
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
