const me = 'Campaign Detail Service';
export default class Service {

  constructor($http, rlConfig, rlLogger) {
    'ngInject';
    this.$http = $http;
    this.gatewayUrl = rlConfig.gatewayUrl;
    this.Logger = rlLogger;
  }

  getAgeGenderData(mcid, breakdown, params) {
    this.Logger.trace('getAgeGenderData', {mcid: mcid, breakdown: breakdown, params: params}, me);
    let config = {
      params: params
    };
    return this.$http.get(`${this.gatewayUrl}/campaigns/${mcid}/age-gender-stats-summary/${breakdown}`, config);
  }

  getDeviceData(mcid, breakdown, params) {
    this.Logger.trace('getDeviceData', {mcid: mcid, breakdown: breakdown, params: params}, me);
    let config = {
      params: params
    };
    return this.$http.get(`${this.gatewayUrl}/campaigns/${mcid}/device-stats-summary/${breakdown}`, config);
  }

  getPerformanceData(mcid, breakdown, params) {
    this.Logger.trace('getPerformanceData', {mcid: mcid, breakdown: breakdown, params: params}, me);
    let config = {
      params: params
    };
    return this.$http.get(`${this.gatewayUrl}/campaigns/${mcid}/performance-stats/${breakdown}`, config);
  }

}
