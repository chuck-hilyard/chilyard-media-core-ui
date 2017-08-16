import component from './dashboard-metric-hover.component.js';
import service from './dashboard-metric-hover.service.js';
import './dashboard-metric-hover.scss';

export default angular
  .module('common.dashboard-metric-hover', [
    service
  ])
  .component('dashboardMetricHover', component)
  .name;
