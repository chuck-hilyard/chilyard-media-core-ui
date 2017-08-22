import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngTranslate from 'angular-translate';
import common from './common/common.module';
import filters from './filters/filters.module';
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
    filters,
    components
  ])
  .component('root', rootComponent)
  .config(($translateProvider) => {
    'ngInject';

    $translateProvider
      .useSanitizeValueStrategy(null)
      .translations('en', en)
      .preferredLanguage('en')
      .fallbackLanguage('en');
  })
  .run(($cookies, $translate, $urlService, rlConfig) => {
    'ngInject';

    $urlService.rules.otherwise(`/${rlConfig.defaultUrl}`);

    let language = $cookies.get('language');
    if (language) {
      $translate.use(language);
    }
  })
  .name;
