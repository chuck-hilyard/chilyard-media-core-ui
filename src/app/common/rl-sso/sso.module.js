import ngHttpAuth from 'angular-http-auth';
import ngJwt from 'angular-jwt';
import service from './sso.service.js';
import './sso.scss';

/**
 * This module will attach to the body of your page.
 * It listens for 401 responses from the REST server.
 * Upon a 401 response, the login page is shown.
 *
 * To use this module, simply include it as a dependancy
 * in your app and implement the server-side component
 * that will catch the SSO redirect and pass the token
 * back to Angular.
 **/

let sso = angular
  .module('rl.sso', [
    ngHttpAuth,
    ngJwt
  ])

  .service('rlSsoService', service)

  // Add the auth token to the Authorization head of every REST request
  .factory('authTokenInterceptor', ($window) => {
    'ngInject';
    return {
      request: (config) => {
        config.headers = config.headers || {};
        config.headers.Authorization = $window.sessionStorage.token;
        return config;
      }
    };
  })

  .config(($sceDelegateProvider, $httpProvider) => {
    'ngInject';
    // Allow angular to open an iFrame to any reachlocal domain
    $sceDelegateProvider.resourceUrlWhitelist(['https://*.reachlocal.com/**', 'self']);
    $httpProvider.interceptors.push('authTokenInterceptor');
  })

  .run((rlSsoService) => {
    'ngInject';
    rlSsoService.setUpListeners();
  })

  .name;

export default sso;
