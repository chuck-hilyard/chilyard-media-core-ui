const apiDateRegEx = /^\d{4}-\d{2}-\d{2}$/;
const defaultDateFilter = 'MMM d, yyyy';

export default class DateTime {
  constructor($log, $filter) {
    'ngInject';
    this.$log = $log;
    this.$filter = $filter;
    this.apiDateFilter = 'yyyy-MM-dd';
  }

  dateToString(date, filterString) {
    let filter = filterString || defaultDateFilter;
    return this.$filter('date')(date, filter);
  }

  dayOnly(date) {
    if (date === null) {
      return null;
    }
    let d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  equals(date1, date2) {
    return (date1 <= date2 && date1 >= date2);
  }

  monthEnd(date) {
    let inDate = (date) ? new Date(date) : new Date();
    let d = new Date(inDate.getFullYear(), inDate.getMonth() + 1, 0);
    return d;
  }

  monthStart(date) {
    let d = (date) ? new Date(date) : new Date();
    d.setDate(1);
    return d;
  }

  newDate(dateStr) {
    let date = null;
    if (dateStr === null || typeof(dateStr) !== 'string' || !dateStr.match(apiDateRegEx)) {
      if (dateStr !== null) {
        this.$log.error('Invalid date string ' + dateStr);
      }
    } else {
      let parts = dateStr.split('-');
      date = new Date(parts[0], parts[1] - 1, parts[2]);
      date.setHours(0, 0, 0, 0);
    }
    return date;
  }

  roundToMonthStart(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  sameDay(date1, date2) {
    return this.equals(this.dayOnly(date1), this.dayOnly(date2));
  }

  subtractDays(date, amount) {
    let d = new Date(date);
    d.setDate(d.getDate() - amount);
    return d;
  }

  subtractMonths(date, amount) {
    let d = new Date(date);
    return new Date(d.setMonth(d.getMonth() - amount));
  }

  subtractWeeks(date, amount) {
    let d = new Date(date);
    d.setDate(d.getDate() - 7 * (amount));
    return d;
  }

  weekEnd(date) {
    let d = (date) ? new Date(date) : new Date();
    d.setDate(d.getDate() - d.getDay() + 6);
    return d;
  }

  weekStart(date) {
    let d = (date) ? new Date(date) : new Date();
    d.setDate(d.getDate() - d.getDay());
    return d;
  }

  yearEnd(year) {
    return new Date(year, 11, 31);
  }

  yearStart(year) {
    return new Date(year, 0, 1);
  }

}
