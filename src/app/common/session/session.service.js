/**
 * @ngdoc service
 * @module common.rl-session
 * @name common.rl-session
 * @description provides interface to the session storage.
 * Please use nameing convention of module path name key so we don't
 * have collisions: campaign.data-settings
 * NOTE: toJson will convert dates into utc string but fromJson will not
 * convert them back into date objects you need to do that on your own.
 */
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
