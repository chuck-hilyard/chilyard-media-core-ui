export default class Service {

  constructor($http, rlConfig) {
    'ngInject';
    this.$http = $http;
    this.gatewayUrl = rlConfig.gatewayUrl;
  }

  getCampaignCycles(mcid) {
    return this.$http.get(`${this.gatewayUrl}/campaigns/${mcid}/cycles`);
  }

  getCampaignOverview(mcid) {
    return this.$http.get(`${this.gatewayUrl}/campaigns/${mcid}/campaign-overview`);
  }

}
