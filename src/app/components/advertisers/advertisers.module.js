import uiRouter from 'angular-ui-router';
import ngTranslate from 'angular-translate';
import component from './advertisers.component';
import './advertisers.scss';

export default angular
  .module('advertisers', [
    uiRouter,
    ngTranslate
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('advertisers', {
        url: '/advertisers',
        component: 'advertisers'
      });
  })
  .component('advertisers', component)
  .name;
