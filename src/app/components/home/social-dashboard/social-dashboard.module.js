import uiRouter from 'angular-ui-router';
import component from './social-dashboard.component';
import './social-dashboard.scss';

export default angular
  .module('socialDashboard', [
    uiRouter
  ])
  .config(() => {
    'ngInject';
  })
  .component('socialDashboard', component)
  .name;
