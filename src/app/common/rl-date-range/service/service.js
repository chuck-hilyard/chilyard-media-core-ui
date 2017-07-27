export default class Daterange {

  constructor() {
    this.ranges = [];
    this.setRanges();
  }

  setRanges() {
    let today = new Date();
    this.ranges = [{
      name: 'Last 7 days',
      start: this.subtract(7),
      end: today
    }, {
      name: 'Last 14 days',
      start: this.subtract(14),
      end: today
    }, {
      name: 'Last 30 days',
      start: this.subtract(30),
      end: today
    }, {
      name: 'This week',
      start: this.weekStart(),
      end: today
    }, {
      name: 'Last week',
      start: this.lastWeekStart(),
      end: this.lastWeekEnd()
    }, {
      name: 'This month',
      start: this.monthStart(),
      end: today
    }, {
      name: 'Last month',
      start: this.lastMonthStart(),
      end: this.lastMonthEnd()
    }];
  }

  // Utlity Functions
  lastMonthEnd() {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 0);
  }

  lastMonthStart() {
    let date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    return new Date(date);
  }

  lastWeekEnd() {
    let date = this.weekStart();
    date.setDate(date.getDate() - 1);
    return new Date(date);
  }

  lastWeekStart() {
    let date = this.weekStart();
    date.setDate(date.getDate() - 7);
    return new Date(date);
  }

  monthStart() {
    let date = new Date();
    date.setDate(1);
    return new Date(date);
  }

  subtract(amount) {
    let date = new Date();
    date.setDate(date.getDate() - amount);
    return new Date(date);
  }

  weekStart() {
    let date = new Date();
    date.setDate(date.getDate() - date.getDay());
    return new Date(date);
  }

}
