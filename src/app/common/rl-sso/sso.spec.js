describe('rl.sso', () => {
  let service, rootScope, myWindow;

  let mockAuthService = {
    loginConfirmed: angular.noop(),
    loginCancelled: angular.noop()
  };

  let decodedToken = {
    email: 'email',
    exp: 'expires'
  };

  let mockJwtHelper = {
    decodeToken: () => decodedToken
  };

  let mockResponse = {
    data: {
      realm: 'myRealm'
    }
  };

  beforeEach(() => {
    angular.mock.module('rl.sso', ($provide) => {
      $provide.value('authService', mockAuthService);
      $provide.value('jwtHelper', mockJwtHelper);
    });

    angular.mock.inject(($injector) => {
      myWindow = $injector.get('$window');
      rootScope = $injector.get('$rootScope');
      service = $injector.get('rlSsoService');
    });
  });

  afterEach(() => {
    service = undefined;
  });

  it('exists', () => {
    expect(service).toBeDefined();
  });

  describe('setUpListeners()', () => {
    it('should set up a listener for the auth-loginRequired event from the authService', () => {
      spyOn(rootScope, '$on');
      service.setUpListeners();
      expect(rootScope.$on).toHaveBeenCalled();
      expect(rootScope.$on.calls.mostRecent().args[0]).toEqual('event:auth-loginRequired');
    });

    it('should set up a listener for the "message" event from the iframe', () => {
      spyOn(window, 'addEventListener');
      service.setUpListeners();
      expect(window.addEventListener).toHaveBeenCalled();
      expect(window.addEventListener.calls.mostRecent().args[0]).toEqual('message');
    });
  });

  describe('Respond to event:auth-loginRequired', () => {
    let body;

    beforeEach(() => {
      service.setUpListeners();
      rootScope.$broadcast('event:auth-loginRequired', mockResponse);
      body = myWindow.document.querySelector('body');
    });

    it('when the data has a valid realm, then it should add the iframe to the body', () => {
      let iframe = body.querySelector('.rl-login-container');
      expect(iframe).not.toBeNull();
    });

    // TODO respond to message token and remove the iframe
    xdescribe('iframe responds with auth token', () => {
      it('should add token to window session and remove iframe', () => {
        let event = new CustomEvent('message', {
          data: {
            type: 'token'
          }
        });
        myWindow.dispatchEvent(event);
      });
    });

    // TODO respond to message reject and remove the iframe

  });

});
