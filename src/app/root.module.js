import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngTranslate from 'angular-translate';
import common from './common/common.module';
import components from './components/components.module';
import rootComponent from './root.component';
import en from './lang-en.js';
import './root.scss';


export default angular
  .module('root', [
    uiRouter,
    ngAnimate,
    ngCookies,
    ngTranslate,
    common,
    components
  ])
  .component('root', rootComponent)
  .config(($urlRouterProvider, $translateProvider) => {
    'ngInject';
    /* Default path is to /components/home/home.module.js */
    $urlRouterProvider.otherwise('/404');

    $translateProvider
      .useSanitizeValueStrategy(null)
      .translations('en', en)
      .preferredLanguage('en')
      .fallbackLanguage('en');
  })
  .run(($cookies, $translate) => {
    'ngInject';
    let language = $cookies.get('language');
    if (language) {
      $translate.use(language);
    }
  })
  .name;
