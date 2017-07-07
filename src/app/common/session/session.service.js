export default class Session {
  constructor($window) {
    'ngInject';
    this.sessionStorage = $window.sessionStorage;
    this.dateRange = {};
  }

  save(key, obj) {
    this.sessionStorage.setItem(key, angular.toJson(obj));
  }

  restore(key) {
    return angular.fromJson(this.sessionStorage.getItem(key));
  }

  remove(key) {
    this.sessionStorage.removeItem(key);
  }
}
