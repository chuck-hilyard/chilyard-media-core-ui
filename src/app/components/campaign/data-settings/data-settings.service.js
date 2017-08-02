const me = 'DataSettings Service';

const cyclesType = 'cycles';
const monthsType = 'months';
const daysType = 'days';

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

  constructor($filter, rlLogger, rlDateTime, Session) {
    'ngInject';
    this.$filter = $filter;
    this.Logger = rlLogger;
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
    this.Logger.trace('initialize', {
      cycles: cycles,
      mcid: mcid
    }, me);
    this.mcid = mcid;
    this.rangeLimits = this.getDateLimits(cycles);
    this.ranges.cycles = getCycleRanges(cycles);
    this.ranges.months = getMonthRanges(this.DateTime, this.rangeLimits.minDate, this.rangeLimits.maxDate);
    this.ranges.days = getDayRanges(this.DateTime, this.rangeLimits.minDate, this.rangeLimits.maxDate, cycles);

    let savedSettings = this.getSessionSettings();
    if (validSettings(savedSettings, this.Logger)) {
      this.selectedSettings = savedSettings;
    }
    else {
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
    if (convertedSettings.breakdownType !== cyclesType) {
      convertedSettings.start = new Date(settings.start);
      convertedSettings.end = new Date(settings.end);
    }
    else {
      // Just rederive these dates from their input strings (handles null better)
      convertedSettings.start.startDateObj = this.DateTime.newDate(settings.start.startDate);
      convertedSettings.start.endDateObj = this.DateTime.newDate(settings.start.endDate);
      convertedSettings.end.startDateObj = this.DateTime.newDate(settings.end.startDate);
      convertedSettings.end.endDateObj = this.DateTime.newDate(settings.end.endDate);
    }
    return convertedSettings;
  }

  saveSessionSettings() {
    if (validSettings(this.selectedSettings, this.Logger)) {
      this.Session.save(sessionKey, {
        mcid: this.mcid,
        settings: this.selectedSettings
      });
    }
  }

  getDefault(breakdownType) {
    try {
      if (this.ranges[breakdownType] && this.ranges[breakdownType].length) {
        return angular.copy(this.ranges[breakdownType][0]);
      }
    }
    catch (err) {
      this.Logger.error('getDefault error', {
        breakdownType: breakdownType,
        err: err
      }, me);
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
      }
      else {
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
function validSettings(settings, Logger) {
  if (settings && typeof(settings) === 'object') {
    if (settings.hasOwnProperty('breakdownType') &&
      settings.hasOwnProperty('name') &&
      settings.hasOwnProperty('start') &&
      settings.hasOwnProperty('end')) {
      return true;
    }
  }
  if (settings !== null) {
    Logger.warning('invalid settings', {
      settings: settings
    }, me);
  }
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
      cycleRanges.push(newCycleRange('campaignDataSettings.last3Cycles', cycles[currentCycleIndex + 2], cycles[currentCycleIndex]));
    }

    if (currentCycleIndex >= 0 && currentCycleIndex < cycles.length - 5) {
      cycleRanges.push(newCycleRange('campaignDataSettings.last6Cycles', cycles[currentCycleIndex + 5], cycles[currentCycleIndex]));
    }

    if (currentCycleIndex >= 0 && currentCycleIndex < cycles.length - 11) {
      cycleRanges.push(newCycleRange('campaignDataSettings.last12Cycles', cycles[currentCycleIndex + 11], cycles[currentCycleIndex]));
    }

    if (cycles.length < 25) {
      cycleRanges.push(newCycleRange('campaignDataSettings.allCycles', cycles[lastCycle], cycles[0]));
    }
  }
  return cycleRanges;
}

function newCycleRange(name, startCycle, endCycle) {
  return {
    breakdownType: cyclesType,
    name: name,
    start: startCycle,
    end: endCycle
  };
}

function getMonthRanges(DateTime, minDate, maxDate) {
  let today = DateTime.dayOnly(new Date());
  let monthRanges = [];

  addMonthRange(DateTime, monthRanges, 'campaignDataSettings.last3Months', DateTime.subtractMonths(today, 2), today, minDate, maxDate);
  addMonthRange(DateTime, monthRanges, 'campaignDataSettings.last6Months', DateTime.subtractMonths(today, 5), today, minDate, maxDate);
  addMonthRange(DateTime, monthRanges, 'campaignDataSettings.last12Months', DateTime.subtractMonths(today, 11), today, minDate, maxDate);
  let yearStart = DateTime.yearStart(today.getFullYear());
  let useStart = (minDate > yearStart) ? minDate : yearStart;
  addMonthRange(DateTime, monthRanges, 'campaignDataSettings.thisYear', useStart, today, minDate, maxDate);

  let lastYearEnd = DateTime.yearEnd(today.getFullYear() - 1);
  if (minDate < lastYearEnd) {
    let lastYearStart = DateTime.yearStart(today.getFullYear() - 1);
    let startDate = (minDate > lastYearStart) ? minDate : lastYearStart;
    addMonthRange(DateTime, monthRanges, 'campaignDataSettings.lastYear', startDate, lastYearEnd, minDate, maxDate);
  }

  if (monthRanges.length === 0) {
    addMonthRange(DateTime, monthRanges, 'campaignDataSettings.allMonths', minDate, maxDate, minDate, maxDate);
  }

  return monthRanges;
}

function addMonthRange(DateTime, months, name, startMonth, endMonth, minDate, maxDate) {
  let start = DateTime.roundToMonthStart(startMonth);
  let end = DateTime.roundToMonthStart(endMonth);
  if (start >= DateTime.roundToMonthStart(minDate) && end <= maxDate) {
    let newMonth = {
      breakdownType: monthsType,
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
  addDayRange(DateTime, dayRanges, 'campaignDataSettings.last30Days', DateTime.subtractDays(today, 30), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'campaignDataSettings.last14Days', DateTime.subtractDays(today, 14), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'campaignDataSettings.last7Days', DateTime.subtractDays(today, 7), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'campaignDataSettings.thisWeek', DateTime.weekStart(today), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'campaignDataSettings.lastWeek', DateTime.weekStart(lastWeek), DateTime.weekEnd(lastWeek), minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'campaignDataSettings.thisMonth', DateTime.monthStart(today), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'campaignDataSettings.lastMonth', DateTime.monthStart(lastMonth), DateTime.monthEnd(lastMonth), minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'campaignDataSettings.last3Months', DateTime.monthStart(DateTime.subtractMonths(today, 2)), today, minDate, maxDate);
  addDayRange(DateTime, dayRanges, 'campaignDataSettings.last6Months', DateTime.monthStart(DateTime.subtractMonths(today, 5)), today, minDate, maxDate);
  if (thisCycle !== null) {
    let thisCycleEnd = (thisCycle.endDate) ? DateTime.newDate(thisCycle.endDate) : today;
    addDayRange(DateTime, dayRanges, 'campaignDataSettings.thisCycle', DateTime.newDate(thisCycle.startDate), thisCycleEnd, minDate, maxDate);
    if (lastCycle && lastCycle.startDate && lastCycle.endDate) {
      addDayRange(DateTime, dayRanges, 'campaignDataSettings.lastCycle', DateTime.newDate(lastCycle.startDate), DateTime.newDate(lastCycle.endDate), minDate, maxDate);
    }
    let last3cycle = getLastCycle(cyclesObject, 2);
    if (last3cycle && last3cycle.startDate) {
      addDayRange(DateTime, dayRanges, 'campaignDataSettings.last3Cycles', DateTime.newDate(last3cycle.startDate), thisCycleEnd, minDate, maxDate);
    }
    let last6cycle = getLastCycle(cyclesObject, 5);
    if (last6cycle && last6cycle.startDate) {
      addDayRange(DateTime, dayRanges, 'campaignDataSettings.last6Cycles', DateTime.newDate(last6cycle.startDate), thisCycleEnd, minDate, maxDate);
    }
  }

  if (dayRanges.length === 0) {
    let monthBeforeMax = DateTime.subtractDays(maxDate, 30);
    let useMin = (minDate > monthBeforeMax) ? minDate : monthBeforeMax;
    addDayRange(DateTime, dayRanges, 'campaignDataSettings.custom', useMin, maxDate, minDate, maxDate);
  }
  return dayRanges;
}

function addDayRange(DateTime, days, name, startDay, endDay, minDate, maxDate) {
  let start = DateTime.dayOnly(startDay);
  let end = DateTime.dayOnly(endDay);
  if (start >= minDate && end <= maxDate) {
    let newDay = {
      breakdownType: daysType,
      name: name,
      start: start,
      end: end
    };
    days.push(newDay);
  }
}
