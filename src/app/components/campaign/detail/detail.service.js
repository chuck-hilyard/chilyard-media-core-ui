
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
    }
    //return this.$http.get(`${this.gatewayUrl}/campaigns/${mcid}/cycle`);
    return this.$q.when({data: this.getFakePerformanceData()});
  }

  getTrendData(mcid, params) {
    let config = {
      params: params
    };
    return this.$q.when([]);
    //return this.$http.get(`${this.rlConfig.gatewayUrl}/campaigns/${mcid}/trend-data`, config);
  }

  getFakePerformanceData() {
    return [{
      "campaignId": 2263494,
      "startDate": "2017-05-16",
      "endDate": null,
      "status": null,
      "budget": null,
      "spend": null,
      "utilization": null,
      "impressions": 89,
      "cpm": null,
      "ctr": 0.0225,
      "allClicks": 2,
      "frequency": 2.0227,
      "reach": 44,
      "socialReach": 4,
      "socialImpressions": 6,
      "websiteClicks": 1,
      "buttonClicks": 1,
      "linkClicks": 2,
      "socialClicks": 0,
      "leadForms": 0,
      "checkIns": 0,
      "postComments": 0,
      "postReactions": 0,
      "postShares": 0,
      "postEngagements": 2,
      "pageLikes": 0,
      "pageEngagements": 2
    }, {
      "campaignId": 2243452,
      "startDate": "2017-04-15",
      "endDate": "2017-05-16",
      "status": "RUNNING",
      "budget": 500,
      "spend": 430.49,
      "utilization": 0.9934,
      "impressions": 5,
      "cpm": 86098,
      "ctr": 0,
      "allClicks": 0,
      "frequency": 1,
      "reach": 5,
      "socialReach": 0,
      "socialImpressions": 0,
      "websiteClicks": 0,
      "buttonClicks": 0,
      "linkClicks": 0,
      "socialClicks": 0,
      "leadForms": 0,
      "checkIns": 0,
      "postComments": 0,
      "postReactions": 0,
      "postShares": 0,
      "postEngagements": 0,
      "pageLikes": 0,
      "pageEngagements": 0
    }];
  }

}
