const me = 'Search Dashboard Service';

class SearchDashboardService {

  constructor($q, rlApi) {
    'ngInject';
    this.api = rlApi;
    this.$q = $q;
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

  getCPList(platform) {
    return this.api.mediaGatewayGet('/userdashboard/campaign-professional', me, {platform: platform})
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

  getDMCList(platform, businessUserId) {
    return this.api.mediaGatewayGet('/userdashboard/campaign-professional', me, {businessUserId: businessUserId, platform: platform})
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
