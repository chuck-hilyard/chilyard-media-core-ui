import commonMocks from '../../../../test/mocks/common/common.mocks';

describe('common.api', () => {
  let $httpBackend, service;
  let me = 'api service';

  beforeEach(() => {
    angular.mock.module('common.api', ($provide) => {
      $provide.value('rlConfig', commonMocks.config);
      $provide.value('rlLogger', commonMocks.logger);
    });

    angular.mock.inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      service = $injector.get('rlApi');
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    service = undefined;
  });

  describe('request', () => {
    let gateway = commonMocks.config.gatewayUrl;
    let expectedConfig = {};
    beforeEach(() => {
      expectedConfig = {
        method: 'GET',
        url: gateway + '/test',
        params: undefined,
        responseType: 'json'
      };
    });
    it('makes the http request', () => {
      $httpBackend.expectGET(gateway + '/test')
        .respond(200);
      service.request('GET', '/test', me);
      $httpBackend.flush();
    });

    it('logs the successful request at trace level', () => {
      spyOn(commonMocks.logger, 'trace');
      spyOn(commonMocks.logger, 'error');
      $httpBackend.expectGET(gateway + '/test')
        .respond(200);
      service.request('GET', '/test', me);
      expect(commonMocks.logger.trace).toHaveBeenCalledWith('apiRequest', expectedConfig, me);
      $httpBackend.flush();
      expect(commonMocks.logger.error).not.toHaveBeenCalled();
    });

    it('logs the unsuccessful request at error level', () => {
      spyOn(commonMocks.logger, 'error');
      $httpBackend.expectGET(gateway + '/test')
        .respond(500);
      service.request('GET', '/test', me);
      $httpBackend.flush();
      expect(commonMocks.logger.error).toHaveBeenCalled();
    });
  });

  describe('mediaGatewayGet(url, source, params)', () => {
    let mediaGateway = commonMocks.config.mediaGatewayUrl;
    let expectedConfig = {};
    let params = {
      silly: 'silly'
    };
    beforeEach(() => {
      expectedConfig = {
        method: 'GET',
        url: mediaGateway + '/test',
        params: params,
        responseType: 'json'
      };
    });

    it('should be defined', () => {
      expect(service.mediaGatewayGet).toBeDefined();
    });

    it('makes the http request', () => {
      $httpBackend.expectGET(mediaGateway + '/test?silly=silly')
        .respond(200);
      let ret = service.mediaGatewayGet('/test', me, params);
      expect(ret.then).toBeDefined();
      $httpBackend.flush();
    });

    it('logs the call at trace level', () => {
      spyOn(commonMocks.logger, 'trace');
      spyOn(commonMocks.logger, 'error');
      $httpBackend.expectGET(mediaGateway + '/test?silly=silly')
        .respond(200);
      service.mediaGatewayGet('/test', me, params);
      expect(commonMocks.logger.trace).toHaveBeenCalledWith('apiRequest', expectedConfig, me);
      $httpBackend.flush();
      expect(commonMocks.logger.error).not.toHaveBeenCalled();
    });

    it('logs the successful request at debug level', () => {
      spyOn(commonMocks.logger, 'debug');
      spyOn(commonMocks.logger, 'trace');
      spyOn(commonMocks.logger, 'error');
      $httpBackend.expectGET(mediaGateway + '/test?silly=silly')
        .respond(200);
      service.mediaGatewayGet('/test', me, params);
      expect(commonMocks.logger.trace).toHaveBeenCalledWith('apiRequest', expectedConfig, me);
      $httpBackend.flush();
      expect(commonMocks.logger.error).not.toHaveBeenCalled();
      expect(commonMocks.logger.debug).toHaveBeenCalled();
    });

    it('logs the unsuccessful request at error level', () => {
      spyOn(commonMocks.logger, 'error');
      $httpBackend.expectGET(mediaGateway + '/test?silly=silly')
        .respond(500);
      service.mediaGatewayGet('/test', me, params);
      $httpBackend.flush();
      expect(commonMocks.logger.error).toHaveBeenCalled();
    });
  });

});
