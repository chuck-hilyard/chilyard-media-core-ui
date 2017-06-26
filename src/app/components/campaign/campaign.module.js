import uiRouter from 'angular-ui-router';
import component from './campaign.component';
import sidebar from './campaign.sidebar';
import detail from './detail/detail.module';
import creatives from './creatives/creatives.module';

// Hard coded mock for demo
import campaignRequest from './mock-data/campaign-request';

export default angular
  .module('campaign', [
    uiRouter,
    detail,
    creatives
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('campaign', {
        redirectTo: 'campaign.detail',
        url: '/campaign/:mcid',
        component: 'campaign',
        resolve: {
          campaignOverview: ($http, $stateParams, rlConfig) => $http.get(`${rlConfig.gatewayUrl}/campaigns/${$stateParams.mcid}/campaign-overview`),
          campaignRequest: () => campaignRequest
        }
      });
  })
  .component('campaign', component)
  .service('CampaignSidebar', sidebar)
  .name;
