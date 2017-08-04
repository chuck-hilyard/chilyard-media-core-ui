import uiRouter from 'angular-ui-router';
import colorThemePicker from '../../../common/rl-color-theme-picker/rl-color-theme-picker.module';
import component from './search-dashboard.component';
import './search-dashboard.scss';

export default angular
  .module('searchDashboard', [
    uiRouter,
    colorThemePicker
  ])
  .config(() => {
    'ngInject';
  })
  .component('searchDashboard', component)
  .name;
