const me = 'Campaign Service';

export default class Service {
  constructor(rlApi, rlConfig) {
    'ngInject';
    this.api = rlApi;
    this.Config = rlConfig;
  }

  getCampaignCycles(mcid) {
    return this.api.request('GET', `/campaigns/${mcid}/cycles`, me)
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

  getCampaignOverview(mcid) {
    return this.api.request('GET', `/campaigns/${mcid}/campaign-overview`, me)
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

  getGlobalMcid(mcid) {
    let params = {
      platform: this.Config.platform,
      q: mcid
    };
    return this.api.mediaGatewayGet('/campaigns', me, params)
      .then((success) => {
        return success.data[0]; //TODO fix
      })
      .catch((error) => {
        return new Error(error);
      });
  }

}
