import ngMockE2E from 'angular-mocks/ngMockE2E';
import data from './overview';
import data1000020 from './overview1000020';

export default angular
  .module('mocks.campaign.overview', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/1000040\/campaign-overview$/)
      .respond(500);

    $httpBackend
      .when('GET', /\/campaigns\/1000020\/campaign-overview$/)
      .respond(200, data1000020);

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/campaign-overview$/)
      .respond(200, data);

  })
  .name;
