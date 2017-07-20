const cyclesType = 'cycles';
//const monthsType = 'months';
//const daysType = 'days';
const dateFilter = {
  days: 'MMM d, yyyy',
  months: 'MMM yyyy'
};

const apiDateFilter = {
  days: 'yyyy-MM-dd',
  months: 'yyyy-MM'
};

const sessionKey = 'campaign.data-settings';

export default class DataSettings {

  constructor($filter, $log, rlDateTime, Session) {
    'ngInject';
    this.$filter = $filter;
    this.$log = $log;
    this.DateTime = rlDateTime;
    this.Session = Session;

    this.ranges = {
      cycles: [],
      months: [],
      days: []
    };

    this.dateFilter = dateFilter;

    this.selectedSettings = null;
  }

  initialize(cycles, mcid) {
    this.mcid = mcid;
    this.rangeLimits = this.getDateLimits(cycles);
    this.ranges.cycles = getCycleRanges(cycles);
    this.ranges.months = getMonthRanges(this.DateTime, this.rangeLimits.minDate, this.rangeLimits.maxDate);
    this.ranges.days = getDayRanges(this.DateTime, this.rangeLimits.minDate, this.rangeLimits.maxDate, cycles);

    let savedSettings = this.getSessionSettings();
    if (validSettings(savedSettings, this.$log)) {
      this.selectedSettings = savedSettings;
    } else {
      this.selectedSettings = this.ranges.cycles[0];
      this.saveSessionSettings();
    }

    let settings = {
      selectedSettings: this.selectedSettings,
      mcid: this.mcid,
      ranges: this.ranges,
      rangeLimits: this.rangeLimits,
      dateFilter: this.dateFilter,
      breakdown: this.getSelectedBreakdownType(),
      apiParams: this.getSelectedRangeParams()
    };

    return settings;

  }

  showField(settings, fieldName) {
    if (settings.breakdownType === cyclesType) {
      return settings[fieldName].cycleNumberStr;
    }
    return this.DateTime.dateToString(settings[fieldName], dateFilter[settings.breakdownType]);
  }

  selectRange(settings) {
    this.selectedSettings = angular.copy(settings);
    this.saveSessionSettings();
  }

  getSessionSettings() {
    let savedSettings = this.Session.restore(sessionKey);
    if (savedSettings && savedSettings.mcid && savedSettings.mcid === this.mcid && savedSettings.settings) {
      return this.recoverDateObjects(savedSettings.settings);
    }
    return null;
  }

  recoverDateObjects(settings) {
    let convertedSettings = angular.copy(settings);
    // JSON.stringify saves dates as utc string so new Date makes them back into the proper date object
    if (convertedSettings.breakdownType !== 'cycles') {
      convertedSettings.start = new Date(settings.start);
      convertedSettings.end = new Date(settings.end);
    } else {
      // Just rederive these dates from their input strings (handles null better)
      convertedSettings.start.startDateObj = this.DateTime.newDate(settings.start.startDate);
      convertedSettings.start.endDateObj = this.DateTime.newDate(settings.start.endDate);
      convertedSettings.end.startDateObj = this.DateTime.newDate(settings.end.startDate);
      convertedSettings.end.endDateObj = this.DateTime.newDate(settings.end.endDate);
    }
    return convertedSettings;
  }

  saveSessionSettings() {
    if (validSettings(this.selectedSettings, this.$log)) {
      this.Session.save(sessionKey, {
        mcid: this.mcid,
        settings: this.selectedSettings
      });
    }
  }

  getDefault(breakdownType) {
    if (this.ranges[breakdownType] && this.ranges[breakdownType].length) {
      return angular.copy(this.ranges[breakdownType][0]);
    } else {
      this.$log.error('getDefault empty ranges for breakdownType is ' + breakdownType);
    }
  }

  getSelectedSettings() {
    let settings = {
      selectedSettings: this.selectedSettings,
      mcid: this.mcid,
      ranges: this.ranges,
      rangeLimits: this.rangeLimits,
      dateFilter: this.dateFilter,
      breakdown: this.getSelectedBreakdownType(),
      apiParams: this.getSelectedRangeParams(this.dateFilter.apiDateFilter)
    };
    return settings;
  }

  getSelectedBreakdownType() {
    if (this.selectedSettings) {
      return this.selectedSettings.breakdownType;
    }
    return '';
  }

  getSelectedRangeParams(dateFilters) {
    let filters = dateFilters || apiDateFilter;
    let dateFilter = filters[this.selectedSettings.breakdownType];
    let rangeParams = {};
    if (this.selectedSettings) {
      if (this.selectedSettings.breakdownType === cyclesType) {
        rangeParams.start = this.selectedSettings.start.cycleNumber;
        rangeParams.end = this.selectedSettings.end.cycleNumber;
      } else {
        rangeParams.start = this.DateTime.dateToString(this.selectedSettings.start, dateFilter);
        rangeParams.end = this.DateTime.dateToString(this.selectedSettings.end, dateFilter);
      }
    }
    return rangeParams;
  }

  getDateLimits(cycles) {
    let dateLimits = {
      maxDate: getMaxDate(this.DateTime, cycles),
      minDate: getMinDate(this.DateTime, cycles)
    };
    return dateLimits;
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
function validSettings(settings, $log) {
  if (settings && typeof(settings) === 'object') {
    if (settings.hasOwnProperty('breakdownType') &&
      settings.hasOwnProperty('name') &&
      settings.hasOwnProperty('start') &&
      settings.hasOwnProperty('end')) {
      return true;
    }
  }
  $log.warn('invalidSettings', {
    settings: settings
  });
  return false;
}

function getMaxDate(DateTime, cycles) {
  let maxDate = DateTime.dayOnly(new Date());
  if (cycles.cycles[0].endDate) {
    let endDate = DateTime.newDate(cycles.cycles[0].endDate);
    if (endDate < maxDate) {
      maxDate = endDate;
    }
  }
  return maxDate;
}

function getMinDate(DateTime, cycles) {
  let startDateString = cycles.cycles[cycles.cycles.length - 1].startDate;

  if (startDateString) {
    return DateTime.dayOnly(DateTime.newDate(startDateString));
  }
  return null;
}

function getThisCycle(cyclesObject) {
  if (cyclesObject.currentCycleIndex !== null) {
    return cyclesObject.cycles[cyclesObject.currentCycleIndex];
  }
  return null;
}

function getLastCycle(cyclesObject, num) {
  if (cyclesObject.currentCycleIndex !== null && cyclesObject.currentCycleIndex + num < cyclesObject.cycles.length) {
    return cyclesObject.cycles[cyclesObject.currentCycleIndex + num];
  }
  return null;
}

function getCycleRanges(cyclesObject) {
  let currentCycleIndex = cyclesObject.currentCycleIndex || 0;
  let cycles = cyclesObject.cycles;
  let lastCycle = cycles.length - 1;
  let cycleRanges = [];
  if (cycles && cycles.length) {
    if (currentCycleIndex >= 0 && currentCycleIndex < cycles.length - 2) {
      cycleRanges.push(newCycleRange('Last 3 Cycles', cycles[currentCycleIndex + 2], cycles[currentCycleIndex]));
    }

    if (currentCycleIndex >= 0 && currentCycleIndex < cycles.length - 5) {
      cycleRanges.push(newCycleRange('Last 6 Cycles', cycles[currentCycleIndex + 5], cycles[currentCycleIndex]));
    }

    if (currentCycleIndex >= 0 && currentCycleIndex < cycles.length - 11) {
      cycleRanges.push(newCycleRange('Last 12 Cycles', cycles[currentCycleIndex + 11], cycles[currentCycleIndex]));
    }

    cycleRanges.push(newCycleRange('All Cycles', cycles[lastCycle], cycles[0]));
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

function getMonthRanges(DateTime, minDate, maxDate) {
  let today = DateTime.dayOnly(new Date());
  let monthRanges = [];

  addMonthRange(DateTime, monthRanges, 'Last 3 months', DateTime.subtractMonths(today, 2), today, minDate, maxDate);
  addMonthRange(DateTime, monthRanges, 'Last 6 months', DateTime.subtractMonths(today, 5), today, minDate, maxDate);
  addMonthRange(DateTime, monthRanges, 'Last 12 months', DateTime.subtractMonths(today, 11), today, minDate, maxDate);
  let yearStart = DateTime.yearStart(today.getFullYear());
  let useStart = (minDate > yearStart) ? minDate : yearStart;
  addMonthRange(DateTime, monthRanges, 'This Year', useStart, today, minDate, maxDate);

  let lastYearEnd = DateTime.yearEnd(today.getFullYear() - 1);
  if (minDate < lastYearEnd) {
    let lastYearStart = DateTime.yearStart(today.getFullYear() - 1);
    let startDate = (minDate > lastYearStart) ? minDate : lastYearStart;
    addMonthRange(DateTime, monthRanges, 'Last Year', startDate, lastYearEnd, minDate, maxDate);
  }

  if (monthRanges.length === 0) {
    addMonthRange(DateTime, monthRanges, 'Custom', minDate, maxDate, minDate, maxDate);
  }

  return monthRanges;
}

function addMonthRange(DateTime, months, name, startMonth, endMonth, minDate, maxDate) {
  let start = DateTime.roundToMonthStart(startMonth);
  let end = DateTime.roundToMonthStart(endMonth);
  if (start >= DateTime.roundToMonthStart(minDate) && end <= maxDate) {
    let newMonth = {
      breakdownType: 'months',
      name: name,
      start: start,
      end: end
    };
    months.push(newMonth);
  }
}

function getDayRanges(DateTime, minDate, maxDate, cyclesObject) {
  let today = DateTime.dayOnly(new Date());
  let lastWeek = DateTime.subtractWeeks(today, 1);
  let lastMonth = DateTime.subtractMonths(today, 1);
  let thisCycle = getThisCycle(cyclesObject);
  let lastCycle = getLastCycle(cyclesObject, 1);
  let dayRanges = [];
  addDayRange(DateTime, dayRanges, 'Last 30 days', DateTime.subtractDays(today, 30), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'Last 14 days', DateTime.subtractDays(today, 14), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'Last 7 days', DateTime.subtractDays(today, 7), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'This week', DateTime.weekStart(today), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'Last week', DateTime.weekStart(lastWeek), DateTime.weekEnd(lastWeek), minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'This month', DateTime.monthStart(today), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'Last month', DateTime.monthStart(lastMonth), DateTime.monthEnd(lastMonth), minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'Last 3 months', DateTime.monthStart(DateTime.subtractMonths(today, 2)), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'Last 6 months', DateTime.monthStart(DateTime.subtractMonths(today, 5)), today, minDate, maxDate);
  if (thisCycle !== null) {
    let thisCycleEnd = (thisCycle.endDate) ? DateTime.newDate(thisCycle.endDate) : today;
    addDayRange(DateTime, dayRanges, 'This Cycle', DateTime.newDate(thisCycle.startDate), thisCycleEnd, minDate, maxDate);
    if (lastCycle && lastCycle.startDate && lastCycle.endDate) {
      addDayRange(DateTime, dayRanges, 'Last Cycle', DateTime.newDate(lastCycle.startDate), DateTime.newDate(lastCycle.endDate), minDate, maxDate);
    }
    let last3cycle = getLastCycle(cyclesObject, 2);
    if (last3cycle && last3cycle.startDate) {
      addDayRange(DateTime, dayRanges, 'Last 3 Cycles', DateTime.newDate(last3cycle.startDate), thisCycleEnd, minDate, maxDate);
    }
    let last6cycle = getLastCycle(cyclesObject, 5);
    if (last6cycle && last6cycle.startDate) {
      addDayRange(DateTime, dayRanges, 'Last 6 Cycles', DateTime.newDate(last6cycle.startDate), thisCycleEnd, minDate, maxDate);
    }
  }

  if (dayRanges.length === 0) {
    let monthBeforeMax = DateTime.subtractDays(maxDate, 30);
    let useMin = (minDate > monthBeforeMax) ? minDate : monthBeforeMax;
    addDayRange(DateTime, dayRanges, 'Custom', useMin, maxDate, minDate, maxDate);
  }
  return dayRanges;
}

function addDayRange(DateTime, days, name, startDay, endDay, minDate, maxDate) {
  let start = DateTime.dayOnly(startDay);
  let end = DateTime.dayOnly(endDay);
  if (start >= minDate && end <= maxDate) {
    let newDay = {
      breakdownType: 'days',
      name: name,
      start: start,
      end: end
    };
    days.push(newDay);
  }
}
