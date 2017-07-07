const cyclesType = 'cycles';
//const monthsType = 'months';
//const daysType = 'days';
const dateFilter = {
  days: 'MMM d, yyyy',
  months: 'MMM yyyy'
};

export default class DataSettings {

  constructor($filter) {
    'ngInject';
    this.$filter = $filter;

    this.ranges = {
      cycles: [],
      months: [],
      days: []
    };

    this.selectedSettings = null; // TODO get from session store? would need to know it matches campaignid...

    this.customRangeName = 'Custom';
  }

  showField(settings, fieldName) {
    if (settings.breakdownType === 'cycles') {
      return 'Cycle ' + settings[fieldName].cycleNumber;
    }
    return this.dateToString(settings[fieldName], dateFilter[settings.breakdownType]);
  }

  selectRange(settings) {
    this.selectedSettings = angular.copy(settings);
  }

  setRanges(cycles) {
    this.ranges.cycles = getCycleRanges(cycles);
    this.ranges.months = getMonthRanges();
    this.ranges.days = getDayRanges();
    // New cycles so set selected to default if needed
    if (this.selectedSettings === null || this.selectedSettings.breakdownType === cyclesType) {
      this.selectedSettings = this.ranges.cycles[0];
    }
  }

  getDefault(breakdownType) {
    return this.ranges[breakdownType][0];
  }

  getSelectedSettings() {
    return angular.copy(this.selectedSettings);
  }

  getSelectedBreakdownType() {
    if (this.selectedSettings) {
      return this.selectedSettings.breakdownType;
    }
    return '';
  }

  getSelectedRangeParams(dateFilter) {
    let rangeParams = {};
    if (this.selectedSettings) {
      if (this.selectedSettings.breakdownType === 'cycles') {
        rangeParams.start = this.selectedSettings.start.cycleNumber;
        rangeParams.end = this.selectedSettings.end.cycleNumber;
      } else {
        rangeParams.start = this.dateToString(this.selectedSettings.start, dateFilter);
        rangeParams.end = this.dateToString(this.selectedSettings.start, dateFilter);
      }
    }
    return rangeParams;
  }

  getDateLimits(cycles) {
    return {
      maxDate: getMaxDate(cycles),
      minDate: getMinDate(cycles)
    };
  }

  findRange(ranges, findRange) {
    let match = ranges[findRange.breakdownType].find((range) => {
      let start = angular.equals(findRange.start, range.start);
      let end = angular.equals(findRange.end, range.end);
      return start && end;
    });
    return match;
  }

  dateToString(date, filterString) {
    return this.$filter('date')(date, filterString);
  }
}

////////////////////////////
// Private Functions

function getMaxDate(cycles) {
  let maxDate = new Date();
  if (cycles.cycles[0].endDate) {
    let endDate = new Date(cycles.cycles[0].endDate);
    if (endDate < maxDate) {
      maxDate = endDate;
    }
  }
  return undefined;
}

function getMinDate(cycles) {
  let startDateString = cycles.cycles[cycles.cycles.length - 1].startDate;
  if (startDateString) {
    return new Date(startDateString);
  }
  return null;
}

function getCycleRanges(cyclesObject) {
  let currentCycleIndex = cyclesObject.currentCycleIndex;
  let cycles = cyclesObject.cycles;
  let lastCycle = cycles.length - 1;
  let cycleRanges = [];
  if (cycles && cycles.length) {
    cycleRanges.push(newCycleRange('All Cycles', cycles[lastCycle], cycles[0]));

    if (currentCycleIndex >= 0 && currentCycleIndex < cycles.length) {
      cycleRanges.push(newCycleRange('This Cycle', cycles[currentCycleIndex], cycles[currentCycleIndex]));
    }
    if (currentCycleIndex >= 0 && currentCycleIndex < cycles.length - 1) {
      cycleRanges.push(newCycleRange('Previous Cycle', cycles[currentCycleIndex + 1], cycles[currentCycleIndex + 1]));
    }

    if (currentCycleIndex >= 0 && currentCycleIndex < cycles.length - 2) {
      cycleRanges.push(newCycleRange('Last 3 Cycles', cycles[currentCycleIndex + 2], cycles[currentCycleIndex]));
    }

    if (currentCycleIndex >= 0 && currentCycleIndex < cycles.length - 5) {
      cycleRanges.push(newCycleRange('Last 6 Cycles', cycles[currentCycleIndex + 5], cycles[currentCycleIndex]));
    }

    if (currentCycleIndex >= 0 && currentCycleIndex < cycles.length - 11) {
      cycleRanges.push(newCycleRange('Last 12 Cycles', cycles[currentCycleIndex + 11], cycles[currentCycleIndex]));
    }
  }
  return cycleRanges;
}

function newCycleRange(name, startCycle, endCycle) {
  return {
    breakdownType: 'cycles',
    name: name,
    start: startCycle,
    end: endCycle,
  };
}

function getMonthRanges() {
  let today = new Date();
  let monthRanges = [];
  monthRanges.push(newMonthRange('All Months', monthStart(), today));
  monthRanges.push(newMonthRange('This Month', monthStart(), today));
  return monthRanges;
}

function newMonthRange(name, startMonth, endMonth) {
  return {
    breakdownType: 'months',
    name: name,
    start: startMonth,
    end: endMonth
  };
}

function getDayRanges() {
  let today = new Date();
  return [{
    breakdownType: 'days',
    name: 'Last 7 days',
    start: subtract(7),
    end: today
  }, {
    breakdownType: 'days',
    name: 'Last 14 days',
    start: subtract(14),
    end: today
  }, {
    breakdownType: 'days',
    name: 'Last 30 days',
    start: subtract(30),
    end: today
  }, {
    breakdownType: 'days',
    name: 'This week',
    start: weekStart(),
    end: today
  }, {
    breakdownType: 'days',
    name: 'Last week',
    start: lastWeekStart(),
    end: lastWeekEnd()
  }, {
    breakdownType: 'days',
    name: 'This month',
    start: monthStart(),
    end: today
  }, {
    breakdownType: 'days',
    name: 'Last month',
    start: lastMonthStart(),
    end: lastMonthEnd()
  }];
}

function lastMonthEnd() {
  let date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 0);
}

function lastMonthStart() {
  let date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  return new Date(date);
}

function lastWeekEnd() {
  let date = weekStart();
  date.setDate(date.getDate() - 1);
  return new Date(date);
}

function lastWeekStart() {
  let date = weekStart();
  date.setDate(date.getDate() - 7);
  return new Date(date);
}

function monthStart() {
  let date = new Date();
  date.setDate(1);
  return new Date(date);
}

function subtract(amount) {
  let date = new Date();
  date.setDate(date.getDate() - amount);
  return new Date(date);
}

function weekStart() {
  let date = new Date();
  date.setDate(date.getDate() - date.getDay());
  return new Date(date);
}
