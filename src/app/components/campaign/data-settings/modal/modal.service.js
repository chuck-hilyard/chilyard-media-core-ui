const showFields = ['cycleNumberStr', 'cycleId', 'dateRange'];

export default class modalService {
  constructor($log, rlDateTime, DataSettings) {
    'ngInject';
    this.$log = $log;
    this.rlDateTime = rlDateTime;
    this.DataSettings = DataSettings;
  }

  initialize(resolve) {
    this.ranges = angular.copy(resolve.ranges);
    this.cycles = angular.copy(resolve.cycles);
    this.dateLimits = this.DataSettings.getDateLimits(this.cycles);
  }

  customClass(data) {
    let cycles = this.cycles.cycles;
    if (angular.isDefined(cycles) && data.mode === 'day') {
      let match = cycles
        .find((cycle) => {
          let startMatch = this.rlDateTime.sameDay(data.date, cycle.startDateObj);
          let endMatch = this.rlDateTime.sameDay(data.date, cycle.endDateObj);
          return startMatch || endMatch;
        });
      if (angular.isDefined(match)) {
        return 'bookend';
      }
    }
    return '';
  }

  setRangeName(settings) {
    let match = this.DataSettings.findRange(this.ranges, settings);
    settings.name = angular.isDefined(match) ? match.name : null;
  }

  getDefaultSettings(mode) {
    return this.DataSettings.getDefault(mode);
  }

  getOptions(settings) {
    if (settings.breakdownType === 'cycles') {
      this.options = this.getCycleSelectOptions(settings);
    } else {
      this.options = this.getDatepickerOptions(settings);
    }
    return this.options;
  }

  updateOptions(settings) {
    let breakdownType = settings.breakdownType;
    if (breakdownType === 'days' || breakdownType === 'months') {
      this.options.start.maxDate = settings.end;
      this.options.end.minDate = settings.start;
    }
    if (breakdownType === 'cycles') {
      this.options = this.getCycleSelectOptions(settings);
    }
    return this.options;
  }

  getCycleSelectOptions(settings) {
    let cycles = this.cycles.cycles;
    let options = {
      start: {
        selected: settings.start,
        list: cycles.filter((cycle) => {
          return cycle.cycleNumber <= settings.end.cycleNumber;
        }),
        showFields: showFields
      },
      end: {
        selected: settings.end,
        list: cycles.filter((cycle) => {
          return cycle.cycleNumber >= settings.start.cycleNumber;
        }),
        showFields: showFields
      }
    };
    return options;
  }

  getDatepickerOptions(settings) {
    let dateLimits = this.dateLimits;
    let options = {
      start: {
        maxDate: settings.end,
        showWeeks: false
      },
      end: {
        minDate: settings.start,
        maxDate: dateLimits.maxDate,
        showWeeks: false
      }
    };
    if (dateLimits.minDate) {
      options.start.minDate = dateLimits.minDate;
    }
    if (settings.breakdownType === 'months') {
      options.start.minMode = 'month';
      options.end.minMode = 'month';
    }
    if (settings.breakdownType === 'days') {
      options.start.customClass = (data) => this.customClass(data);
      options.end.customClass = (data) => this.customClass(data);
    }

    return options;
  }
}
