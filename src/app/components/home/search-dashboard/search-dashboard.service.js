class SearchDashboardService {

  constructor(rlApi) {
    'ngInject';
    this.api = rlApi;
  }

  getCampaignList() {
    return this.api.mediaGatewayGet('/campaigns/')
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

  getCampaignDrilldown() {
    return this.api.mediaGatewayGet('/campaign/drilldown/')
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

}

export default angular
  .module('home.search-dashboard.service', [])
  .service('SearchDashboardService', SearchDashboardService)
  .name;
