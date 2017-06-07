import uiRouter from 'angular-ui-router';
import component from './creatives.component';
import './creatives.scss';

export default angular
  .module('campaign.creatives', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('campaign.creatives', {
        url: '/creatives',
        component: 'campaign.creatives'
      });
  })
  .component('campaign.creatives', component)
  .name;
