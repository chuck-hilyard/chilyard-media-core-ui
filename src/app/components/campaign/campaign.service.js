const me = 'Campaign Service';

export default class Service {
  constructor($http, rlConfig, rlLogger) {
    'ngInject';
    this.$http = $http;
    this.Logger = rlLogger;
    this.gatewayUrl = rlConfig.gatewayUrl;
  }

  getCampaignCycles(mcid) {
    this.Logger.trace('apiGetCampaignCycles', mcid, me);
    return this.$http.get(`${this.gatewayUrl}/campaigns/${mcid}/cycles`)
      .then((success) => success.data)
      .catch((error) => {
        this.Logger.error(`Error getting campaignCycles data for ${mcid}`, {
          error: error
        }, me);
        return new Error(error);
      });
  }

  getCampaignOverview(mcid) {
    this.Logger.trace('apiGetCampaignOverview', mcid, me);
    return this.$http.get(`${this.gatewayUrl}/campaigns/${mcid}/campaign-overview`)
      .then((success) => success.data)
      .catch((error) => {
        this.Logger.error(`Error getting campaignOverview data for ${mcid}`, {
          error: error
        }, me);
        return new Error(error);
      });
  }

}
