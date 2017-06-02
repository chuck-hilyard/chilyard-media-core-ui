import uiRouter from 'angular-ui-router';
import tooltip from 'angular-ui-bootstrap/src/tooltip';
import component from './detail.component';
import service from './detail.service';
import charts from './charts/charts.module';
import './detail.scss';

export default angular
  .module('campaign.detail', [
    uiRouter,
    tooltip,
    charts
  ])
  .config(($stateProvider, $uibTooltipProvider) => {
    'ngInject';
    $stateProvider
      .state('campaign.detail', {
        url: '',
        component: 'campaign.detail'
      });

    $uibTooltipProvider.options({
      appendToBody: true,
      placement: "auto bottom"
    });
  })
  .component('campaign.detail', component)
  .service('CampaignDetailService', service)
  .name;
