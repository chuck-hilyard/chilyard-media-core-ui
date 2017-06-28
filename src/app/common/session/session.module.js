class Session {
  constructor() {
    'ngInject';
    this.dateRange = {};
    this.dataSettings = {};
  }
}

export default angular
  .module('common.session', [])
  .service('Session', Session)
  .name;
