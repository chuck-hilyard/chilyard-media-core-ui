export default class Service {

  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  getPerformanceData(mcid, params) {
    let config = {
      params: params
    };
    return this.$http.get(`/campaign/${mcid}/cycle`, config);
  }

  getTrendData(mcid, params) {
    let config = {
      params: params
    };
    return this.$http.get(`/campaign/${mcid}/trend-data`, config);
  }

}
