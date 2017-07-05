import uiRouter from 'angular-ui-router';
import component from './campaign.component';
import service from './campaign.service';
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
          campaignCycles: (CampaignService, $stateParams) => {
            return CampaignService.getCampaignCycles($stateParams.mcid)
              .then((success) => success.data)
              .catch((error) => error);
          },
          campaignOverview: (CampaignService, $stateParams) => {
            return CampaignService.getCampaignOverview($stateParams.mcid)
              .then((success) => success.data)
              .catch((error) => error);
          }
        }
      });
  })
  .component('campaign', component)
  .service('CampaignService', service)
  .service('CampaignSidebar', sidebar)
  .name;
