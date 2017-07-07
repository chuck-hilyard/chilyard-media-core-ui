
export default class Daterange {

  constructor($filter) {
    'ngInject';
    this.$filter = $filter;
    this.ranges = {
      cycles: [],
      months: [],
      days: []
    };
    this.selectedRange = {}; // TODO get from session store? would need to know it matches campaignid...
  }

  setRanges(cycles) {
    this.ranges.cycles = getCycleRanges(cycles);
    this.ranges.months = getMonthRanges();
    this.ranges.days = getDayRanges();
    this.selectedRange = this.ranges.cycles[0];
  }

  findRange(ranges, findRange) {
    let match = ranges[findRange.breakdownType].find((range) => {
      let start = angular.equals(findRange.start, range.start);
      let end = angular.equals(findRange.end, range.end);
      return start && end;
    });
    return match;
  }
}

////////////////////////////
// Private Functions

function getCycleRanges(cycles) {
  return [{
    breakdownType: 'cycles',
    name: 'All Cycles',
    start: angular.copy(cycles.cycles[cycles.cycles.length - 1]),
    end: angular.copy(cycles.cycles[0])
  }, {
    breakdownType: 'cycles',
    name: 'This Cycle',
    start: angular.copy(cycles.cycles[cycles.currentCycleIndex]),
    end: angular.copy(cycles.cycles[cycles.currentCycleIndex])
  }, {
    breakdownType: 'cycles',
    name: 'Last Cycle',
    start: {
      cycleNumber: 2,
      cycleId: 325344
    },
    end: {
      cycleNumber: 2,
      cycleId: 325344
    }
  }];
}

function getMonthRanges() {
  let today = new Date();
  return [{
    breakdownType: 'months',
    name: 'All Months',
    start: monthStart(),
    end: today
  }, {
    breakdownType: 'months',
    name: 'This Month',
    start: monthStart(),
    end: today
  }];
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
