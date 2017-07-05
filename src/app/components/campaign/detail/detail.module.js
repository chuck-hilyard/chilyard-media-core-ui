import uiRouter from 'angular-ui-router';
import ngTranslate from 'angular-translate';
import component from './detail.component';
import service from './detail.service';
import overviewPanels from './overview-panels/overview-panels.module';
import trendChart from './trend-chart/trend-chart.module';
import ageGenderChart from './age-gender-chart/age-gender-chart.module';
import deviceChart from './device-chart/device-chart.module';
import performance from './performance/performance.module';
import './detail.scss';

export default angular
  .module('campaign.detail', [
    uiRouter,
    ngTranslate,
    overviewPanels,
    trendChart,
    ageGenderChart,
    deviceChart,
    performance
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
