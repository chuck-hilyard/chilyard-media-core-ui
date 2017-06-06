import uiRouter from 'angular-ui-router';
import component from './campaign.component';
import sidebar from './campaign.sidebar';
import detail from './detail/detail.module';
import creatives from './creatives/creatives.module';

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
          campaignRequest: ($http, $stateParams) => $http.get(`/campaign/${$stateParams.mcid}`)
        }
      });
  })
  .component('campaign', component)
  .service('CampaignSidebar', sidebar)
  .name;
