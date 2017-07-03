export default class Service {

  constructor($http, rlConfig) {
    'ngInject';
    this.$http = $http;
    this.gatewayUrl = rlConfig.gatewayUrl;
  }

  getAgeGenderData(mcid, breakdown, params) {
    let config = {
      params: params
    };
    return this.$http.get(`${this.gatewayUrl}/campaigns/${mcid}/age-gender-stats-summary/${breakdown}`, config);
  }

  getPerformanceData(mcid, breakdown, params) {
    let config = {
      params: params
    };
    return this.$http.get(`${this.gatewayUrl}/campaigns/${mcid}/cycle-performance/${breakdown}`, config);
  }

}
