// TODO Remove when api on gateway is working
//import fakePerformanceData from '../../../../../test/mocks/components/campaign/performance-data/performance-data';

export default class Service {

  constructor($http, rlConfig, $q) {
    'ngInject';
    this.$http = $http;
    this.gatewayUrl = rlConfig.gatewayUrl;
    this.$q = $q;
  }

  getPerformanceData(mcid, params) {
    let config = {
      params: params
    };
    // TODO Remove when api on gateway is working
    //return this.$q.when({data: fakePerformanceData});
    return this.$http.get(`${this.gatewayUrl}/campaigns/${mcid}/cycle-performance/cycles`, config);

  }

  getTrendData() {
    return this.$q.when([]);
    // TODO Replace with get data from cycle-performance data..
  }

}
