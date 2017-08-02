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

  describe('request', () => {
    it('makes the http request', () => {
      let expectedConfig = {
        method: 'GET',
        url: '/test',
        params: undefined,
        responseType: 'json'
      };
      spyOn(commonMocks.logger, 'trace');
      spyOn(commonMocks.logger, 'error');
      $httpBackend.expectGET('/test')
        .respond(200);
      service.request('GET', '/test', me);
      expect(commonMocks.logger.trace).toHaveBeenCalledWith('apiRequest', expectedConfig, me);
      $httpBackend.flush();
      expect(commonMocks.logger.error).not.toHaveBeenCalled();
    });

    describe('request fails', () => {
      it('call logger error', () => {
        spyOn(commonMocks.logger, 'error');
        $httpBackend.expectGET('/test')
          .respond(500);
        service.request('GET', '/test', me);
        $httpBackend.flush();
        expect(commonMocks.logger.error).toHaveBeenCalled();
      });
    });
  });

});
