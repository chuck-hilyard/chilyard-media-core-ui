import uiRouter from 'angular-ui-router';
import component from './search-dashboard.component';
import './search-dashboard.scss';

export default angular
  .module('searchDashboard', [
    uiRouter
  ])
  .config(() => {
    'ngInject';
  })
  .component('searchDashboard', component)
  .name;
