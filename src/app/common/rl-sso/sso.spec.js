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

  // TODO figure out how to test adding and removing the iframe (Vacation calls...)
  xdescribe('Respond to event:auth-loginRequired', () => {
    it('when the data has a valid realm, then it should add the iframe to the body', () => {
      service.setUpListeners();
      rootScope.$broadcast('event:auth-loginRequired', mockResponse);
      expect(myWindow.document.getElementsByTagName('body')[0].html()).toContain('<div class="rl-login-container">');
    });
  });

  // TODO respond to message token

  // TODO respond to message reject

});
