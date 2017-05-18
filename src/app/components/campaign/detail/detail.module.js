import uiRouter from 'angular-ui-router';
import component from './detail.component';
import service from './detail.service';
import charts from './charts/charts.module';
import './detail.scss';

export default angular
  .module('campaign.detail', [
    uiRouter,
    charts
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('campaign.detail', {
        url: '',
        component: 'campaign.detail'
      });
  })
  .component('campaign.detail', component)
  .service('CampaignDetailService', service)
  .name;
