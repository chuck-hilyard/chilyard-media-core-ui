import uiRouter from 'angular-ui-router';
import component from './campaign.component';
import service from './campaign.service';
import sidebar from './campaign.sidebar';
import DetailModule from './detail/detail.module';
import DataSettingsModule from './data-settings/data-settings.module';
import CreativesModule from './creatives/creatives.module';
import DataSettingsService from './data-settings/data-settings.service';

export default angular
  .module('campaign', [
    uiRouter,
    DetailModule,
    CreativesModule,
    DataSettingsModule
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
            return CampaignService.getCampaignCycles($stateParams.mcid);
          },
          campaignOverview: (CampaignService, $stateParams) => {
            return CampaignService.getCampaignOverview($stateParams.mcid);
          }
        }
      });
  })
  .component('campaign', component)
  .service('CampaignService', service)
  .service('CampaignSidebar', sidebar)
  .service('DataSettings', DataSettingsService)
  .name;
