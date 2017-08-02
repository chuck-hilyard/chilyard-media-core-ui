const me = 'Campaign Service';

export default class Service {
  constructor(rlApi) {
    'ngInject';
    this.api = rlApi;
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

}
