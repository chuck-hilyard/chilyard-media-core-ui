import uiRouter from 'angular-ui-router';
import component from './404.component';


export default angular
  .module('404', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('404', {
        url: '/404',
        component: 'notFound'
      });
  })
  .component('notFound', component)
  .name;
