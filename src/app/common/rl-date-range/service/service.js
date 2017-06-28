export default class Daterange {

  constructor() {
    this.ranges = [];
    this.setRanges();
  }

  setRanges() {
    let today = new Date();
    this.ranges = {
      cycles: [{
        breakdownType: 'cycles',
        name: 'This Cycle',
        start: 4,
        end: undefined
      }, {
        breakdownType: 'cycles',
        name: 'Last Cycle',
        start: 3,
        end: undefined
      }],
      months: [{
        breakdownType: 'months',
        name: 'This Month',
        start: 4,
        end: undefined
      }, {
        breakdownType: 'months',
        name: 'Last Cycle',
        start: 3,
        end: undefined
      }],
      days: [{
        breakdownType: 'days',
        name: 'Last 7 days',
        start: this.subtract(7),
        end: today
      }, {
        breakdownType: 'days',
        name: 'Last 14 days',
        start: this.subtract(14),
        end: today
      }, {
        breakdownType: 'days',
        name: 'Last 30 days',
        start: this.subtract(30),
        end: today
      }, {
        breakdownType: 'days',
        name: 'This week',
        start: this.weekStart(),
        end: today
      }, {
        breakdownType: 'days',
        name: 'Last week',
        start: this.lastWeekStart(),
        end: this.lastWeekEnd()
      }, {
        breakdownType: 'days',
        name: 'This month',
        start: this.monthStart(),
        end: today
      }, {
        breakdownType: 'days',
        name: 'Last month',
        start: this.lastMonthStart(),
        end: this.lastMonthEnd()
      }]
    };
  }

  // Utlity Functions
  lastMonthEnd() {
    var date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 0);
  }

  lastMonthStart() {
    var date = new Date();
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
