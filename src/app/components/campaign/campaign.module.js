import uiRouter from 'angular-ui-router';
import component from './campaign.component';
import sidebar from './campaign.sidebar';
import detail from './detail/detail.module';
import creatives from './creatives/creatives.module';

// TODO Remove when api on gateway is working
import fakeCycleData from '../../../../test/mocks/components/campaign/cycles/cycles';


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
          //campaignCycles: ($http, $stateParams, rlConfig) => $http.get(`${rlConfig.gatewayUrl}/campaigns/${$stateParams.mcid}/cycles`)
          // TODO Remove when api on gateway is working
          campaignCycles: ($q, $stateParams, rlConfig) => $q.when({data: fakeCycleData})
        }
      });
  })
  .component('campaign', component)
  .service('CampaignSidebar', sidebar)
  .name;
