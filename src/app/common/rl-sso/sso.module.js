import ngHttpAuth from 'angular-http-auth';
import ngJwt from 'angular-jwt';
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

  // Add the auth token to the Authorization head of every REST request
  .factory('authTokenInterceptor', ['$window', function ($window) {
    return {
      'request': function (config) {
        config.headers = config.headers || {};
        config.headers.Authorization = $window.sessionStorage.token;
        return config;
      }
    };
  }])

  .config(['$sceDelegateProvider', '$httpProvider', function ($sceDelegateProvider, $httpProvider) {
    // Allow angular to open an iFrame to any reachlocal domain
    $sceDelegateProvider.resourceUrlWhitelist(['https://*.reachlocal.com/**', 'self']);
    $httpProvider.interceptors.push('authTokenInterceptor');
  }])

  .run(['$rootScope', '$document', '$window', 'authService', 'jwtHelper', function ($rootScope, $document, $window, authService, jwtHelper) {
    let iframe, response,
      findParent = function () {
        return angular.element(document.getElementsByTagName('body')[0]);
      },
      createIframe = function (realm) {
        // hold it so we can remove it from the dom later
        iframe = angular.element('<iframe id="authFrame" src="' + realm + '" scrolling="no"></iframe>');
        return iframe;
      },
      removeIframe = function () {
        iframe.remove();
        iframe = null;
      };

    $rootScope.$on('event:auth-loginRequired', function (event, responseIn) {
      response = responseIn;
      if (!iframe && response.data.hasOwnProperty('realm')) {
        findParent().append(createIframe(response.data.realm));
      }
    });

    // Extract the "session" data from the JWT token
    function dataFrom(token) { // Spec: http://goo.gl/i3eTMS
      return JSON.parse($window.atob(token.split('.')[1]));
    }

    /**
     * These message handlers catch messages coming from the gateway via the iframe
     * These messages will typically be:
     *   1.  A token (login successful)
     *   2.  A rejection message (login failed)
     */
    let messageHandlers = {};
    messageHandlers.token = function (event) {
      let token = event.data.value;
      let decodedToken = jwtHelper.decodeToken(token);
      $window.sessionStorage.setItem('user', decodedToken.email);
      $window.sessionStorage.setItem('exp', decodedToken.exp);
      $window.sessionStorage.setItem('token', token);
      authService.loginConfirmed(dataFrom(token));
    };
    messageHandlers.reject = function (event) {
      response.message = event.data.value;
      authService.loginCancelled(response.message, response);
    };

    /**
     * Setup the routing to catch messages from our iframe and pass them to the right handler
     */
    $window.addEventListener('message', function (event) {
      let messageType = event.data.type;
      if (messageHandlers.hasOwnProperty(messageType)) {
        messageHandlers[messageType](event);
        removeIframe();
      }
    }, false);
  }])

  .name;

export default sso;
