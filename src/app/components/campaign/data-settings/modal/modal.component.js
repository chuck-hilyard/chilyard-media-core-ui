import Template from './modal.html';

const tabNumber = {
  cycles: 0,
  months: 1,
  days: 2
};


class Controller {
  constructor($scope, $log, DataSettingsService) {
    'ngInject';
    this.$log = $log;
    this.dataSettingsService = DataSettingsService;
    this.monthsEnabled = true;
    this.daysEnabled = true;
  }

  $onInit() {
    this.workingSettings = angular.copy(this.resolve.settings);
    this.activeTab = tabNumber[this.workingSettings.breakdownType];
    this.ranges = angular.copy(this.resolve.ranges);
    this.cycles = angular.copy(this.resolve.cycles);
    this.dateLimits = this.dataSettingsService.getDateLimits(this.cycles);
    this.options = this.getOptions(this.workingSettings.breakdownType);
  }

  getOptions(mode) {
    if (mode === 'cycles') {
      return this.getCycleSelectOptions();
    }
    return this.getDatepickerOptions(mode);
  }

  getCycleSelectOptions() {
    let cycles = this.cycles.cycles;
    let options = {
      start: {
        selected: this.workingSettings.start,
        list: cycles.filter((cycle) => {
          return cycle.cycleNumber <= this.workingSettings.end.cycleNumber;
        }),
        showFields: getShowFields()
      },
      end: {
        selected: this.workingSettings.end,
        list: cycles.filter((cycle) => {
          return cycle.cycleNumber >= this.workingSettings.start.cycleNumber;
        }),
        showFields: getShowFields()
      }
    };
    return options;
  }

  getDatepickerOptions(breakdown) {
    let dateLimits = this.dateLimits;
    let options = {
      start: {
        maxDate: this.workingSettings.end,
        showWeeks: false
      },
      end: {
        minDate: this.workingSettings.start,
        maxDate: dateLimits.maxDate,
        showWeeks: false
      }
    };
    if (dateLimits.minDate) {
      options.start.minDate = dateLimits.minDate;
    }
    if (breakdown === 'months') {
      options.start.minMode = 'month';
      options.end.minMode = 'month';
    }
    if (breakdown === 'days') {
      options.start.customClass = (data) => this.customClass(data);
      options.end.customClass = (data) => this.customClass(data);
    }

    return options;
  }

  cancel() {
    this.dismiss();
  }

  selectTab(tabName) {
    if (this.workingSettings.breakdownType !== tabName) {
      this.workingSettings = this.dataSettingsService.getDefault(tabName);
      this.options = this.getOptions(this.workingSettings.breakdownType);
    }
  }

  customClass(data) {
    let cycles = this.cycles.cycles;
    if (angular.isDefined(cycles) && data.mode === 'day') {
      let dayToCheck = new Date(data.date).setHours(0, 0, 0, 0);
      let match = cycles
        .find((cycle) => {
          let start = new Date(cycle.startDate).setHours(0, 0, 0, 0) === dayToCheck;
          let end = new Date(cycle.endDate).setHours(0, 0, 0, 0) === dayToCheck;
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
    this.workingSettings.name = angular.isDefined(match) ? match.name : null;
  }

  setRange(workingSettings) {
    this.workingSettings = angular.copy(workingSettings);
    this.onWorkingSettingsChange();
  }

  onWorkingSettingsChange() {
    let breakdownType = this.workingSettings.breakdownType;
    this.getRangeName();
    if (breakdownType === 'days' || breakdownType === 'months') {
      this.options.start.maxDate = this.workingSettings.end;
      this.options.end.minDate = this.workingSettings.start;
    }
    if (breakdownType === 'cycles') {
      this.options = this.getCycleSelectOptions();
    }
    this.workingSettings = angular.copy(this.workingSettings);
  }

  handleCycleStartSelect(item) {
    this.workingSettings.start = angular.copy(item);
    this.onWorkingSettingsChange();
  }

  handleCycleEndSelect(item) {
    this.workingSettings.end = angular.copy(item);
    this.onWorkingSettingsChange();
  }

  update() {
    this.close({
      $value: {
        settings: this.workingSettings
      }
    });
  }

}

function getShowFields() {
  return ['cycleNumber', 'cycleId', 'dateRange'];
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
