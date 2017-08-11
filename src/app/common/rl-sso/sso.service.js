export default function ssoService($rootScope, $window, authService, jwtHelper, $log) {
  'ngInject';

  let iframe = null;
  let response = null;

  let service = {
    setUpListeners: setUpListeners
  };

  return service;

  /////////////////

  /**
   * Start listening to
   * - events from the authService and
   * - messages from the iframe
   */
  function setUpListeners() {
    $log.debug('setUpListeners');

    /**
     * Setup event listener to catch messages from the authService
     */
    $rootScope.$on('event:auth-loginRequired', (event, responseIn) => {
      response = responseIn;
      if (!iframe && response.data.hasOwnProperty('realm')) {
        findParent().append(createIframe(response.data.realm));
      }
    });

    /**
     * Setup the listener to catch messages from our iframe and pass them to the right handler
     */
    $window.addEventListener('message', (event) => {
      let messageType = event.data.type;
      if (messageType === 'token') {
        handleTokenMessage(event);
        removeIframe();
      }
      else if (messageType === 'reject') {
        handleRejectMessage(event);
        removeIframe();
      }
    }, false);
  }

  /**
   * Extract the "session" data from the JWT token
   */
  function dataFrom(token) { // Spec: http://goo.gl/i3eTMS
    return JSON.parse($window.atob(token.split('.')[1]));
  }

  function findParent() {
    return angular.element($window.document.getElementsByTagName('body')[0]);
  }

  function createIframe(realm) {
    // hold it so we can remove it from the dom later
    iframe = angular.element('<div class="rl-login-container"><iframe id="authFrame" src="' + realm + '" scrolling="no"></iframe></div>');
    return iframe;
  }

  function removeIframe() {
    if (iframe !== null) {
      iframe.remove();
    }
    iframe = null;
  }

  /**
   * Handle a token message from the iframe
   * Login successful
   */
  function handleTokenMessage(event) {
    let token = event.data.value;
    let decodedToken = jwtHelper.decodeToken(token);
    $window.sessionStorage.setItem('user', decodedToken.email);
    $window.sessionStorage.setItem('exp', decodedToken.exp);
    $window.sessionStorage.setItem('token', token);
    authService.loginConfirmed(dataFrom(token));
  }

  /**
   * Handle a reject message from the iframe
   * Login failed
   */
  function handleRejectMessage(event) {
    response.message = event.data.value;
    authService.loginCancelled(response.message, response);
  }
}
