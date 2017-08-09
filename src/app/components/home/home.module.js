import uiRouter from 'angular-ui-router';
import tooltip from 'angular-ui-bootstrap/src/tooltip';
import popover from 'angular-ui-bootstrap/src/popover';
import component from './home.component';
import socialModule from './social-dashboard/social-dashboard.module';
import searchModule from './search-dashboard/search-dashboard.module';
import './home.scss';


export default angular
  .module('home', [
    uiRouter,
    tooltip,
    popover,
    socialModule,
    searchModule
  ])
  .config(($stateProvider, $urlRouterProvider, $uibTooltipProvider) => {
    'ngInject';
    $stateProvider
      .state('home', {
        url: '/home',
        abstract: true,
        component: 'home'
      })
      .state('home.searchdashboard', {
        url: '/search',
        views: {
          'searchView': {component: 'searchDashboard'}
        }
      })
      .state('home.socialdashboard', {
        url: '/social',
        views: {
          'socialView': {component: 'socialDashboard'}
        }
      });
    $urlRouterProvider.when('/home', '/home/search');
    $uibTooltipProvider.options({
      appendToBody: true,
      placement: 'auto bottom',
      trigger: 'mouseenter',
      delay: 500
    });
  })
  .component('home', component)
  .name;
