import uiRouter from 'angular-ui-router';
import tooltip from 'angular-ui-bootstrap/src/tooltip';
import component from './home.component';
import socialModule from './social-dashboard/social-dashboard.module';
import searchModule from './search-dashboard/search-dashboard.module';
import './home.scss';


export default angular
  .module('home', [
    uiRouter,
    tooltip,
    socialModule,
    searchModule
  ])
  .config(($stateProvider, $urlRouterProvider) => {
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
  })
  .component('home', component)
  .name;
