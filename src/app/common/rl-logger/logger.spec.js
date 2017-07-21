describe('common.logger', () => {

  let rlLoggerService;

  let mockState = {
    current: {
      name: 'testCurrentState'
    }
  };

  let mockWindow = {
    document: {
      URL: '/test/url'
    }
  };

  let mockLog = {
    error: angular.noop
  };

  beforeEach(() => {
    angular.mock.module('common.logger', ($provide) => {
      $provide.value('$state', mockState);
      $provide.value('$window', mockWindow);
      $provide.value('$log', mockLog);
    });
    angular.mock.inject(function(rlLogger) {
      rlLoggerService = rlLogger;
    });
  });

  it('exists', () => {
    expect(rlLoggerService).toBeDefined();
  });

  describe('error()', () => {
    describe('given the log level is the default of info', () => {
      it('should call $log error', () => {
        spyOn(mockLog, 'error');
        rlLoggerService.error('error message', {
          test: 'test'
        }, 'test');
        expect(mockLog.error).toHaveBeenCalled();
      });
    });
    describe('given the log level is off', () => {
      it('should NOT call $log error', () => {
        rlLoggerService.setLogLevel('off');
        spyOn(mockLog, 'error');
        rlLoggerService.error('error message', {
          test: 'test'
        }, 'test');
        expect(mockLog.error).not.toHaveBeenCalled();
      });
    });
  });
});
