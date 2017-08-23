import uiRouter from 'angular-ui-router';
import component from './search-dashboard.component';
import drilldownService from './dashboard-drilldown.service';
import searchDashboardService from './search-dashboard.service';
import './search-dashboard.scss';

export default angular
  .module('searchDashboard', [
    uiRouter,
    drilldownService,
    searchDashboardService
  ])
  .config(() => {
    'ngInject';
  })
  .component('searchDashboard', component)
  .name;
