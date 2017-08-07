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
    error: angular.noop,
    warn: angular.noop,
    info: angular.noop,
    debug: angular.noop
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

  describe('setLogLevel()', () => {
    describe('given a valid level, setLogLevel(\'trace\')', () => {
      it('should not log a warning', () => {
        spyOn(mockLog, 'warn');
        rlLoggerService.setLogLevel('trace');
        expect(mockLog.warn).not.toHaveBeenCalled();
      });
    });
    describe('given an invalid level, setLogLevel(\'pumpkin\')', () => {
      it('should log a warning', () => {
        spyOn(mockLog, 'warn');
        rlLoggerService.setLogLevel('pumpkin');
        expect(mockLog.warn).toHaveBeenCalled();
      });
    });
    describe('given an invalid level, setLogLevel([2, 3, 4])', () => {
      it('should log a warning', () => {
        spyOn(mockLog, 'warn');
        rlLoggerService.setLogLevel([2, 3, 4]);
        expect(mockLog.warn).toHaveBeenCalled();
      });
    });
  });

  describe('error()', () => {
    describe('given the log level is info', () => {
      it('should call $log error', () => {
        rlLoggerService.setLogLevel('info');
        spyOn(mockLog, 'error');
        rlLoggerService.error('error message', {test: 'test'}, 'test');
        expect(mockLog.error).toHaveBeenCalledWith('Error: error message', {test: 'test'}, '[testCurrentState | test]');
      });
    });
    describe('given the log level is off', () => {
      it('should NOT call $log error', () => {
        rlLoggerService.setLogLevel('off');
        spyOn(mockLog, 'error');
        rlLoggerService.error('error message', {test: 'test'}, 'test');
        expect(mockLog.error).not.toHaveBeenCalled();
      });
    });
  });

  describe('warning()', () => {
    describe('given the log level is info', () => {
      it('should call $log warn', () => {
        rlLoggerService.setLogLevel('info');
        spyOn(mockLog, 'warn');
        rlLoggerService.warning('warning message', {test: 'test'}, 'test');
        expect(mockLog.warn).toHaveBeenCalledWith('Warning: warning message', {test: 'test'}, '[testCurrentState | test]');
      });
    });
    describe('given the log level is error', () => {
      it('should NOT call $log warn', () => {
        rlLoggerService.setLogLevel('error');
        spyOn(mockLog, 'warn');
        rlLoggerService.warning('warning message', {test: 'test'}, 'test');
        expect(mockLog.warn).not.toHaveBeenCalled();
      });
    });
  });

  describe('warn()', () => {
    describe('given the log level is info', () => {
      it('should call $log warn', () => {
        rlLoggerService.setLogLevel('info');
        spyOn(mockLog, 'warn');
        rlLoggerService.warn('warn message', {test: 'test'}, 'test');
        expect(mockLog.warn).toHaveBeenCalledWith('Warning: warn message', {test: 'test'}, '[testCurrentState | test]');
      });
    });
    describe('given the log level is error', () => {
      it('should NOT call $log warn', () => {
        rlLoggerService.setLogLevel('error');
        spyOn(mockLog, 'warn');
        rlLoggerService.warn('warning message', {test: 'test'}, 'test');
        expect(mockLog.warn).not.toHaveBeenCalled();
      });
    });
  });

  describe('info()', () => {
    describe('given the log level is info', () => {
      it('should call $log info', () => {
        rlLoggerService.setLogLevel('info');
        spyOn(mockLog, 'info');
        rlLoggerService.info('info message', {
          test: 'test'
        }, 'test');
        expect(mockLog.info).toHaveBeenCalledWith('Info: info message', {test: 'test'}, '[testCurrentState | test]');
      });
    });
    describe('given the log level is warning', () => {
      it('should NOT call $log info', () => {
        rlLoggerService.setLogLevel('warning');
        spyOn(mockLog, 'info');
        rlLoggerService.info('info message', {test: 'test'}, 'test');
        expect(mockLog.info).not.toHaveBeenCalled();
      });
    });
  });

  describe('debug()', () => {
    describe('given the log level is trace', () => {
      it('should call $log info', () => {
        rlLoggerService.setLogLevel('trace');
        spyOn(mockLog, 'info');
        rlLoggerService.debug('debug message', {
          test: 'test'
        }, 'test');
        expect(mockLog.info).toHaveBeenCalledWith('Debug: debug message', {test: 'test'}, '[testCurrentState | test]');
      });
    });
    describe('given the log level is info', () => {
      it('should NOT call $log info', () => {
        rlLoggerService.setLogLevel('info');
        spyOn(mockLog, 'info');
        rlLoggerService.debug('debug message', {test: 'test'}, 'test');
        expect(mockLog.info).not.toHaveBeenCalled();
      });
    });
  });

  describe('trace()', () => {
    describe('given the log level is trace', () => {
      it('should call $log info', () => {
        rlLoggerService.setLogLevel('trace');
        spyOn(mockLog, 'info');
        rlLoggerService.trace('trace message', {test: 'test'}, 'test');
        expect(mockLog.info).toHaveBeenCalledWith('Trace: trace message', {test: 'test'}, '[testCurrentState | test]');
      });
    });
    describe('given the log level is info', () => {
      it('should NOT call $log info', () => {
        rlLoggerService.setLogLevel('info');
        spyOn(mockLog, 'info');
        rlLoggerService.trace('trace message', {test: 'test'}, 'test');
        expect(mockLog.info).not.toHaveBeenCalled();
      });
    });
  });
});
